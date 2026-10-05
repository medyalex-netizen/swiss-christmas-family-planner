import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chooseWeatherLocation } from '../lib/weather.ts';

test('chosen base takes priority over lodging and scenic train', () => {
  const sample = { baseArea: 'לוזאן / מונטרה / אזור אגם ז׳נבה', lodgingType: 'אירוח בלוזאן', scenicOption: 'GoldenPass Express אינטרלאקן' };
  assert.equal(chooseWeatherLocation(sample).name, 'Lausanne');
  assert.equal(chooseWeatherLocation({ ...sample, baseArea: 'ציריך' }).name, 'Zurich');
});
test('each base city is identified independently of other preferences', () => {
  for (const [baseArea, name] of [['מונטרה', 'Montreux'], ['באזל', 'Basel'], ['לוצרן', 'Lucerne'], ['אינטרלאקן / גרינדלוולד', 'Interlaken']]) {
    assert.equal(chooseWeatherLocation({ baseArea, lodgingType: 'אירוח בלוזאן' }).name, name);
  }
});
test('undecided base falls back safely to available lodging or Lausanne', () => {
  assert.equal(chooseWeatherLocation({ baseArea: 'עדיין פתוחים להצעות', lodgingType: 'אירוח בלוזאן' }).name, 'Lausanne');
  assert.equal(chooseWeatherLocation({ baseArea: '', lodgingType: '' }).name, 'Lausanne');
});
