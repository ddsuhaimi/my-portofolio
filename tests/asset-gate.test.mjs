import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { verifyAssets } from '../scripts/verify-assets.mjs';
test('privacy gate verifies reviewed hashes and rejects an original in public', async () => {
  assert.equal(await verifyAssets(), 10);
  const fixture='public/privacy-gate-negative-test.jpg';
  try {
    await writeFile(fixture, await readFile('provenance/originals/simrs-1.jpg'),{flag:'wx'});
    await assert.rejects(verifyAssets(), /Original screenshot in shipping source/);
  } finally { await unlink(fixture); }
});
