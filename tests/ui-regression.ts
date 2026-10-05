// Run with tsx and jsdom available in SWISS_TEST_RUNTIME; not needed to run the app.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const runtime = process.env.SWISS_TEST_RUNTIME;
if (!runtime) throw Error('Set SWISS_TEST_RUNTIME to the test dependencies directory.');
const { JSDOM } = require(runtime + '/node_modules/jsdom');
const dom = new JSDOM('<div id="root"></div>', { url: 'http://localhost:3078/search', pretendToBeVisual: true });
for (const key of ['self', 'window', 'document', 'navigator', 'HTMLElement', 'Element', 'location', 'requestAnimationFrame']) {
  Object.defineProperty(globalThis, key, { configurable: true, value: dom.window[key] });
}
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

async function run() {
  const { act, createElement } = await import('react');
  const { createRoot } = await import('react-dom/client');
  const { default: Search } = await import('../app/search/page');
  const { default: Results } = await import('../app/results/page');
  const { default: Prompt } = await import('../app/prompt/page');
  const { default: Weather } = await import('../app/weather/page');
  const { default: Itinerary } = await import('../app/itinerary/page');
  const { tripLengths } = await import('../lib/answers');
  const root = createRoot(document.getElementById('root')!);
  const render = async (Component: typeof Search) => {
    await act(async () => { root.render(null); });
    await act(async () => { root.render(createElement(Component)); });
  };
  const button = (label: string) => Array.from(document.querySelectorAll('button')).find(b => b.textContent?.replace('✓ ', '').trim() === label)!;
  const click = async (label: string) => { assert.ok(button(label), label); await act(async () => { button(label).click(); }); };
  const text = () => document.body.textContent ?? '';
  let checks = 0;
  await render(Search);
  assert.ok(document.querySelector('a[href="/results"]'));
  assert.equal(window.localStorage.getItem('swissChristmasAnswers'), null);
  assert.equal(button('מחיקת תשובות').disabled, false); checks++;
  for (const [index, duration] of tripLengths.entries()) {
    await click(duration);
    await render(Results);
    const card = Array.from(document.querySelectorAll('a')).find(a => a.textContent?.includes('לחצו לצפייה במסלול מתאים'))!;
    let cancelled = true;
    document.addEventListener('click', (event) => { cancelled = event.defaultPrevented; event.preventDefault(); }, { once: true });
    await act(async () => { card.click(); });
    assert.equal(cancelled, false);
    const raw = window.localStorage.getItem('swissChristmasAnswers');
    assert.equal(JSON.parse(raw!).tripLength, duration);
    await render(Search);
    assert.equal(button(duration).getAttribute('aria-pressed'), 'true');
    assert.equal(window.localStorage.getItem('swissChristmasAnswers'), raw);
    await render(Itinerary);
    assert.ok(text().includes(index === 0 ? 'יום 6' : index === 1 ? 'יום 8' : 'יום 10'));
    assert.ok(text().includes('סדר היעדים אינו מותאם לכל הבחירות שלכם'));
    await render(Search); checks++;
  }
  await click('לוזאן / מונטרה / אזור אגם ז׳נבה');
  await click('עדיין לא החלטנו');
  await click('קניות ורחובות יפים');
  await click('אווירת חג מולד, אורות ושווקים');
  await render(Search);
  assert.equal(button('קניות ורחובות יפים').getAttribute('aria-pressed'), 'true');
  assert.equal(button('אווירת חג מולד, אורות ושווקים').getAttribute('aria-pressed'), 'true');
  assert.ok(document.querySelector('a[href="/results"]')); checks++;
  let clipboard = '';
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (s: string) => { clipboard = s; } } });
  await render(Prompt); await click('העתקת ההנחיה');
  assert.ok(clipboard.includes('עדיין לא החלטנו') && clipboard.includes('קניות ורחובות יפים, אווירת חג מולד, אורות ושווקים'));
  assert.ok(text().includes('ההנחיה הועתקה'));
  assert.ok(!text().includes('המשך למסלול לדוגמה')); checks++;
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw Error('unavailable'); } } });
  await click('העתקת ההנחיה'); assert.ok(text().includes('סמנו את הטקסט')); checks++;
  const urls: string[] = [];
  const goodFetch = async (url: string) => {
    urls.push(url);
    return { ok: true, json: async () => ({ daily: { time: ['2026-12-15'], temperature_2m_max: [2], temperature_2m_min: [-2], precipitation_probability_max: [20], snowfall_sum: [1.5] } }) };
  };
  globalThis.fetch = goodFetch as typeof fetch;
  await render(Weather);
  assert.ok(text().includes('תחזית עבור לוזאן') && text().includes('1.5 ס״מ'));
  assert.ok(urls.at(-1)?.includes('latitude=46.5197'));
  const city = document.querySelector('select')!;
  await act(async () => { city.value = 'Interlaken'; city.dispatchEvent(new dom.window.Event('change', { bubbles: true })); });
  assert.ok(text().includes('תחזית עבור אינטרלאקן'));
  assert.ok(urls.at(-1)?.includes('latitude=46.6863')); checks++;
  globalThis.fetch = (async () => { throw Error('offline'); }) as typeof fetch;
  await render(Weather); assert.ok(text().includes('לא ניתן לטעון תחזית כרגע')); checks++;
  await render(Search); await click('מחיקת תשובות');
  await render(Search); assert.equal(window.localStorage.getItem('swissChristmasAnswers'), null); checks++;
  window.localStorage.setItem('swissChristmasAnswers', '{broken');
  await render(Search); assert.ok(text().includes('לא ניתן לטעון או לשמור'));
  await click(tripLengths[1]); assert.equal(JSON.parse(window.localStorage.getItem('swissChristmasAnswers')!).tripLength, tripLengths[1]); checks++;
  Object.defineProperty(window, 'localStorage', { configurable: true, value: { getItem() { throw Error('blocked'); }, setItem() { throw Error('blocked'); }, removeItem() { throw Error('blocked'); } } });
  await render(Search); await click(tripLengths[0]);
  assert.ok(document.querySelector('a[href="/results"]'));
  assert.ok(text().includes('עלולות לא להישמר'));
  await render(Results);
  const blockedCard = Array.from(document.querySelectorAll('a')).find(a => a.textContent?.includes('טיול קצר'))!;
  const blockedEvent = new dom.window.MouseEvent('click', { bubbles: true, cancelable: true });
  await act(async () => { blockedCard.dispatchEvent(blockedEvent); }); assert.equal(blockedEvent.defaultPrevented, true); checks++;
  await act(async () => { root.unmount(); }); dom.window.close();
  console.log(`PASS ${checks} UI regression scenarios`);
}
run().catch(error => { console.error(error); process.exitCode = 1; });
