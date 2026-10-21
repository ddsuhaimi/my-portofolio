import test from "node:test";
import assert from "node:assert/strict";
import { readFile, stat, readdir } from "node:fs/promises";
import { join, resolve, extname } from "node:path";
const base = (process.env.TEST_BASE_PATH ?? "/").replace(/\/$/, "");
async function walk(dir) {
  return (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((entry) =>
        entry.isDirectory()
          ? walk(join(dir, entry.name))
          : join(dir, entry.name),
      ),
    )
  ).flat();
}
const files = await walk("dist");
test("all built internal links and images point to existing local assets or anchors", async () => {
  for (const path of files.filter((path) => path.endsWith(".html"))) {
    const html = await readFile(path, "utf8");
    for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      if (/^(https?:|mailto:|data:)/.test(raw)) continue;
      if (raw.startsWith("#")) {
        assert.ok(
          new RegExp(`id="${raw.slice(1)}"`).test(html),
          `${path}: ${raw}`,
        );
        continue;
      }
      const url = new URL(raw, "https://test.invalid/");
      assert.ok(
        url.pathname.startsWith(`${base}/`),
        `${path}: missing base: ${raw}`,
      );
      const relative = decodeURIComponent(url.pathname.slice(base.length));
      const local = resolve(
        "dist",
        "." + relative,
        relative.endsWith("/") ? "index.html" : "",
      );
      assert.ok(local.startsWith(resolve("dist")), "path must stay in dist");
      assert.ok((await stat(local)).isFile(), `${path}: missing ${raw}`);
      if (url.hash && extname(local) === ".html")
        assert.ok(
          (await readFile(local, "utf8")).includes(`id="${url.hash.slice(1)}"`),
          `${raw}: missing anchor`,
        );
    }
  }
});
test("the first body child is the design thesis, and SEO URLs use the configured base", async () => {
  const html = await readFile("dist/index.html", "utf8");
  assert.match(html, /<body[^>]*>\s*<!-- THESIS:/);
  for (const key of [
    "OWN-WORLD:",
    "STORY:",
    "FIRST VIEWPORT:",
    "d1b3fa24",
    "FINISH:",
  ])
    assert.ok(html.includes(key));
  assert.ok(
    html.includes(`content="https://ddsuhaimi.github.io${base}/og.png"`) ||
      html.includes(`content="${process.env.TEST_SITE_URL}${base}/og.png"`),
  );
  assert.match(html, /application\/ld\+json/);
  for (const slug of ["jagoasn", "chrommandr", "simrs"])
    assert.ok(
      (await readFile("dist/sitemap.xml", "utf8")).includes(
        `${base}/projects/${slug}/`,
      ),
    );
  assert.ok(
    (await readFile("dist/robots.txt", "utf8")).includes(`${base}/sitemap.xml`),
  );
});
test("no fabricated employment, availability, or patient identifiers leak into HTML", async () => {
  for (const path of files.filter((path) => path.endsWith(".html"))) {
    assert.doesNotMatch(
      await readFile(path, "utf8"),
      /Nimbus Cloud|Vertex Analytics|Brightline Labs|Institute of Technology|open to work|available for work|Budi Santoso|Siti Rahma|RM00000/i,
    );
  }
});
test("all shipping rasters carry provenance; original screenshots stay outside the build", async () => {
  const manifest = JSON.parse(
    await readFile("dist/raster-provenance.json", "utf8"),
  );
  const rasters = files.filter((path) => /\.(jpg|png|webp|avif)$/.test(path));
  assert.equal(manifest.assets.length, rasters.length);
  assert.ok(manifest.assets.every((entry) => entry.sha256 && entry.source));
  assert.ok(!files.some((path) => /originals/.test(path)));
});
