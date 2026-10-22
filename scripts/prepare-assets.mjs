import sharp from "sharp";
import { tmpdir } from "node:os";
import { join } from "node:path";
process.env.XDG_CACHE_HOME ||= join(tmpdir(), "dedi-portfolio-cache");
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
const originals = new URL("../provenance/originals/", import.meta.url);
const output = new URL("../src/assets/projects/", import.meta.url);
const hash = (data) => createHash("sha256").update(data).digest("hex");
await mkdir(output, { recursive: true });
// Conservative hard crops remove the entire record table/feed, not just names.
const crops = {
  "simrs-1.jpg": { left: 0, top: 0, width: 1400, height: 553 },
  "simrs-2.jpg": { left: 0, top: 0, width: 1400, height: 1200 },
  "chrommandr-screenshot.jpg": { left: 205, top: 74, width: 880, height: 260 },
  "chrommandr-1.jpg": { left: 207, top: 74, width: 850, height: 245 },
};
const entries = [];
for (const name of (await readdir(originals))
  .filter((name) => name.endsWith(".jpg"))
  .sort()) {
  const source = await readFile(new URL(name, originals));
  let image = sharp(source);
  if (crops[name]) image = image.extract(crops[name]);
  const result = await image.jpeg({ quality: 94, mozjpeg: true }).toBuffer();
  await writeFile(new URL(name, output), result);
  entries.push({
    name,
    source: `provenance/originals/${name}`,
    sourceRepository: "https://github.com/ddsuhaimi/my-portofolio",
    sourceSha256: hash(source),
    publishedSource: `src/assets/projects/${name}`,
    publishedSha256: hash(result),
    transform: crops[name]
      ? { crop: crops[name] }
      : "Metadata stripped, JPEG re-encoded",
    privacyReview: name.startsWith("simrs-1")
      ? "Patient table and header excluded."
      : name.startsWith("simrs-2")
        ? "Patient activity feed excluded."
        : name.startsWith("simrs")
          ? "Aggregate dashboard only; no patient names or identifiers visible."
          : name.startsWith("chrommandr")
            ? "Browser chrome, tabs, address bar and desktop UI excluded."
            : "Project UI; no contact, patient, or account identifiers visible. Account display name Dedi belongs to the portfolio owner.",
  });
}
await writeFile(
  new URL("../provenance/assets.json", import.meta.url),
  JSON.stringify(
    {
      version: 1,
      policy:
        "Originals are retained outside public and src. Only privacy-reviewed derivatives are imported. No claim is made that source patient data is fictitious.",
      assets: entries,
    },
    null,
    2,
  ) + "\n",
);
// Authored social composition, exported to PNG with Sharp. No external stock art.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f7f7f5"/><path d="M70 100H1130M70 545H1130" stroke="#dcded8"/><g fill="#252724" font-family="sans-serif"><text x="70" y="72" font-size="23">Dedi Suhaimi</text><text x="1130" y="72" text-anchor="end" font-size="17">Software Engineer · Indonesia</text><text x="65" y="235" font-size="77" letter-spacing="-3">I build software for</text><text x="65" y="325" font-size="77" letter-spacing="-3" fill="#73786c">exam prep, browser tools</text><text x="65" y="415" font-size="77" letter-spacing="-3" fill="#73786c">and hospital software.</text><text x="70" y="465" font-size="22">TypeScript, React, Vue and Node.js</text><text x="70" y="585" font-size="17">JagoASN / Chrommandr / SimRS</text></g><path d="M1080 568h34v-34m0 34-46-46" fill="none" stroke="#345f97" stroke-width="3"/></svg>`;
await writeFile(new URL("../provenance/og.svg", import.meta.url), svg);
await sharp(Buffer.from(svg))
  .png()
  .toFile(new URL("../public/og.png", import.meta.url).pathname);
console.log(
  `Prepared ${entries.length} reviewed screenshots and authored og.png.`,
);
