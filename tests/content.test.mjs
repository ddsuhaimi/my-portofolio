import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { projects } from "../src/data/projects.ts";
import { profile, experience } from "../src/data/portfolio.ts";
const sha = (data) => createHash("sha256").update(data).digest("hex");
test("project routes are unique and grounded in the original three projects", () => {
  assert.deepEqual(
    projects.map((project) => project.slug),
    ["jagoasn", "chrommandr", "simrs"],
  );
  assert.equal(
    new Set(projects.map((project) => project.slug)).size,
    projects.length,
  );
  for (const project of projects) {
    assert.ok(project.summary);
    assert.ok(project.intro);
    assert.ok(project.tags.length);
    assert.ok(project.highlights.length);
  }
});
test("career content uses the supplied résumé", () => {
  assert.equal(profile.email, "dedisuhaimiacc@gmail.com");
  assert.equal(profile.location, "Indonesia");
  assert.deepEqual(
    experience.map((job) => job.company),
    ["HMI Medical Group", "Formulatrix Indonesia", "MIM System"],
  );
  assert.equal(profile.education.institution, "Syiah Kuala University");
  assert.match(profile.sourceNote, /résumé/);
});
test("all ten originals are preserved and reviewed derivatives match provenance hashes", async () => {
  const manifest = JSON.parse(await readFile("provenance/assets.json", "utf8"));
  assert.equal(manifest.assets.length, 10);
  for (const entry of manifest.assets) {
    assert.equal(sha(await readFile(entry.source)), entry.sourceSha256);
    assert.equal(
      sha(await readFile(entry.publishedSource)),
      entry.publishedSha256,
    );
    assert.ok(entry.privacyReview);
    if (entry.name === "simrs-1.jpg")
      assert.ok(entry.transform.crop.height <= 553);
    if (entry.name === "simrs-2.jpg")
      assert.ok(entry.transform.crop.height <= 1200);
  }
  assert.ok(!(await readdir("public")).some((name) => name.endsWith(".jpg")));
});
test("download is the supplied PDF, not a placeholder", async () => {
  const pdf = await readFile("public/Dedi-Suhaimi-Resume.pdf");
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.ok(pdf.length > 10000);
});
