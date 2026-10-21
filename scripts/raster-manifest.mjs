import { readdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { verifyAssets } from './verify-assets.mjs';
await verifyAssets();
const sourceManifest = JSON.parse(
  await readFile("provenance/assets.json", "utf8"),
);
const rasterPattern = /\.(jpg|jpeg|png|webp|avif)$/i;
async function walk(dir) {
  const paths = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      paths.map((entry) =>
        entry.isDirectory()
          ? walk(`${dir}/${entry.name}`)
          : `${dir}/${entry.name}`,
      ),
    )
  ).flat();
}
const assets = [];
for (const path of (await walk("dist"))
  .filter((path) => rasterPattern.test(path))
  .sort()) {
  const name = path.split("/").at(-1);
  const original = sourceManifest.assets.find(
    (asset) =>
      name.startsWith(asset.name.replace(".jpg", ".")) || name === asset.name,
  );
  if (!original && name !== "og.png")
    throw new Error(`Raster has no provenance: ${path}`);
  const bytes = await readFile(path);
  const digest = createHash('sha256').update(bytes).digest('hex');
  if (sourceManifest.assets.some(asset => asset.sourceSha256 === digest))
    throw new Error(`Original screenshot must not ship: ${path}`);
  assets.push({
    path: path.replace("dist/", ""),
    sha256: createHash("sha256")
      .update(await readFile(path))
      .digest("hex"),
    source: original?.publishedSource ?? "provenance/og.svg",
    originalSha256: original?.sourceSha256,
    processing: original
      ? "Astro / Sharp responsive image build; privacy crop applied before import"
      : "Authored SVG rendered to PNG using Sharp",
  });
}
await writeFile(
  "dist/raster-provenance.json",
  JSON.stringify({ version: 1, assets }, null, 2) + "\n",
);
console.log(
  `Provenance recorded for all ${assets.length} shipping raster files.`,
);
