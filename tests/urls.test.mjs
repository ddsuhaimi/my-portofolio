import test from "node:test";
import assert from "node:assert/strict";
import { withBase, absoluteUrl } from "../src/lib/urls.ts";
for (const [base, path, expected] of [
  ["/", "/", "/"],
  ["/", "/#work", "/#work"],
  ["", "/og.png", "/og.png"],
  ["/my-portofolio/", "/", "/my-portofolio/"],
  ["/my-portofolio", "/#contact", "/my-portofolio/#contact"],
  ["/my-portofolio/", "/projects/jagoasn/", "/my-portofolio/projects/jagoasn/"],
  [
    "/nested/path/",
    "Dedi-Suhaimi-Resume.pdf",
    "/nested/path/Dedi-Suhaimi-Resume.pdf",
  ],
])
  test(`base ${base || "(empty)"} + ${path}`, () =>
    assert.equal(withBase(path, base), expected));
test("absolute URLs preserve a nested deployment base", () => {
  assert.equal(
    absoluteUrl("/sitemap.xml", "https://example.com", "/my-portofolio/"),
    "https://example.com/my-portofolio/sitemap.xml",
  );
  assert.equal(
    absoluteUrl("/og.png", "https://example.com", "/"),
    "https://example.com/og.png",
  );
});
