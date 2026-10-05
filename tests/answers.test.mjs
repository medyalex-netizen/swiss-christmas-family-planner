import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emptyAnswers, normalizeAnswers, readAnswers, writeAnswers, removeAnswers, STORAGE_KEY, tripLengths } from '../lib/answers.ts';

function storage(initial) {
  const values = new Map(initial ? [[STORAGE_KEY, initial]] : []);
  return {
    values, getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key),
  };
}
test('loading existing answers does not overwrite them', () => {
  const raw = JSON.stringify({ tripLength: '7–8 ימים', teenPriority: 'קניות, שוקולד' });
  const s = storage(raw);
  const result = readAnswers(s);
  assert.equal(result.error, false);
  assert.equal(s.getItem(STORAGE_KEY), raw);
  assert.equal(result.answers.tripLength, tripLengths[1]);
  assert.deepEqual(result.answers.teenPriorities, ['קניות', 'שוקולד']);
});
test('old duration spellings normalize to questionnaire values', () => {
  for (const [index, label] of ['5–6 ימים', '7-8 ימים', '9—10 ימים'].entries()) {
    assert.equal(normalizeAnswers({ tripLength: label }).tripLength, tripLengths[index]);
  }
});
test('corrupt or nonobject JSON recovers safely', () => {
  for (const raw of ['{broken', 'null', '[]', '42']) {
    assert.equal(readAnswers(storage(raw)).error, true);
    assert.deepEqual(readAnswers(storage(raw)).answers, emptyAnswers());
  }
});
test('wrong field types and teen duplicates cannot crash downstream pages', () => {
  const result = normalizeAnswers({ tripLength: 7, baseArea: {}, teenPriorities: ['קניות', null, 12, 'קניות', ''] });
  assert.equal(result.tripLength, '');
  assert.equal(result.baseArea, '');
  assert.deepEqual(result.teenPriorities, ['קניות']);
  assert.equal(result.teenPriority, 'קניות');
});
test('write and clear round trip, without recreating cleared data', () => {
  const s = storage();
  assert.equal(writeAnswers(s, { ...emptyAnswers(), tripLength: tripLengths[0], teenPriorities: ['קניות'] }), true);
  assert.equal(readAnswers(s).answers.teenPriority, 'קניות');
  assert.equal(removeAnswers(s), true);
  assert.equal(s.getItem(STORAGE_KEY), null);
});
test('blocked storage is reported for reading, writing and deletion', () => {
  const blocked = { getItem() { throw Error('blocked'); }, setItem() { throw Error('quota'); }, removeItem() { throw Error('blocked'); } };
  assert.equal(readAnswers(blocked).error, true);
  assert.equal(writeAnswers(blocked, emptyAnswers()), false);
  assert.equal(removeAnswers(blocked), false);
});
