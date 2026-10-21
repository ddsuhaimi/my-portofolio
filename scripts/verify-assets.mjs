import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const manifest = JSON.parse(await readFile(resolve(root, 'provenance/assets.json'), 'utf8'));
export async function verifyAssets() {
  const originals = new Set(manifest.assets.map(entry => entry.sourceSha256));
  for (const entry of manifest.assets) {
    if (sha(await readFile(resolve(root, entry.publishedSource))) !== entry.publishedSha256)
      throw new Error(`Unreviewed derivative: ${entry.publishedSource}`);
    if (sha(await readFile(resolve(root, entry.source))) !== entry.sourceSha256)
      throw new Error(`Original provenance mismatch: ${entry.source}`);
    if (!entry.privacyReview) throw new Error(`Missing privacy review: ${entry.name}`);
  }
  async function walk(dir) {
    for (const item of await readdir(dir, { withFileTypes: true })) {
      const path = resolve(dir, item.name);
      if (item.isDirectory()) { await walk(path); continue; }
      if (/\.(jpe?g|png|webp|avif)$/i.test(path) && originals.has(sha(await readFile(path))))
        throw new Error(`Original screenshot in shipping source: ${relative(root,path)}`);
    }
  }
  await walk(resolve(root, 'public'));
  await walk(resolve(root, 'src/assets'));
  return manifest.assets.length;
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  console.log(`Privacy gate: ${await verifyAssets()} reviewed derivative hashes verified; no originals in shipping sources.`);
