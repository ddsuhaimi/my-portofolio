import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
test('headlines and social copy use direct language without the rejected paired slogans', async () => {
  const html = await readFile('dist/index.html','utf8');
  const og = await readFile('provenance/og.svg','utf8');
  const generator = await readFile('scripts/prepare-assets.mjs','utf8');
  const copy = `${html}\n${og}\n${generator}`;
  for (const phrase of ['Thoughtful software','Built to hold up','staying power','Different problems','The same attention to detail','One palette.','Your browser, within reach','good questions','worth building','work beautifully'])
    assert.ok(!copy.toLowerCase().includes(phrase.toLowerCase()), `Rejected copy returned: ${phrase}`);
  assert.match(html, /I build/);
  assert.match(html, /and APIs\./);
  assert.match(og, /I build web apps/);
  assert.match(og, /and APIs\./);
  assert.match(html, /Send me/);
});
