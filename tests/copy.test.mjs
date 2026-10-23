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
  assert.match(html, /I build software, from the screens people use to the code that runs it\./);
  assert.match(html, /I'm Dedi, a software engineer based in Indonesia\./);
  assert.doesNotMatch(html, /exam prep, browser tools and hospitals|I build web apps and APIs/i);
  assert.match(og, /I build software/);
  assert.match(og, /the screens people use/);
  assert.match(og, /the code that runs it/i);
  assert.doesNotMatch(og, /APIs|exam prep|websites and apps/i);
  assert.match(html, /Send me/);
});
