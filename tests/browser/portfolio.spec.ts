import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile, stat, mkdir } from "node:fs/promises";
import { resolve, extname } from "node:path";
const base = (process.env.TEST_BASE_PATH ?? "/").replace(/\/$/, "");
const root = `https://portfolio.test${base}/`;
const mime: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
async function mount(page: Page) {
  await page.route("https://portfolio.test/**", async (route) => {
    const url = new URL(route.request().url());
    const path = decodeURIComponent(url.pathname.slice(base.length));
    let file = resolve("dist", "." + path);
    if (!file.startsWith(resolve("dist")))
      return route.fulfill({ status: 403, body: "" });
    try {
      if ((await stat(file)).isDirectory()) file = resolve(file, "index.html");
      await route.fulfill({
        status: 200,
        body: await readFile(file),
        contentType: mime[extname(file)] || "application/octet-stream",
      });
    } catch {
      await route.fulfill({
        status: 404,
        contentType: "text/html",
        body: await readFile("dist/404.html"),
      });
    }
  });
}
for (const width of [320, 390, 768, 1440]) {
  test(`homepage at ${width}px: no overflow, readable imagery, accessible structure`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: width >= 1000 ? 1000 : 844 });
    await mount(page);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const failures: string[] = [];
    page.on("response", (response) => {
      if (response.status() >= 400) failures.push(response.url());
    });
    await page.goto(root);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("h1")).toHaveText(
      "Thoughtfulsoftware.Built to hold up.",
    );
    await expect(page.locator(".project")).toHaveCount(3);
    await expect(page.locator("#experience h3")).toHaveText([
      "HMI Medical Group",
      "Formulatrix Indonesia",
      "MIM System",
    ]);
    const overflow = await page.evaluate(() => ({
      document: document.documentElement.scrollWidth,
      viewport: innerWidth,
    }));
    expect(overflow.document).toBeLessThanOrEqual(overflow.viewport);
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.evaluate(() => scrollTo(0, 0));
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect(image).toHaveJSProperty("complete", true);
      expect(
        await image.evaluate((img: HTMLImageElement) => img.naturalWidth),
      ).toBeGreaterThan(0);
    }
    const heroGeometry = await page.evaluate(() => {
      const front = document.querySelector('.hero-front')!.getBoundingClientRect();
      const caption = document.querySelector('.hero-caption')!.getBoundingClientRect();
      const rail = document.querySelector('.hero-bottom')!.getBoundingClientRect();
      return { frontBottom: front.bottom, captionTop: caption.top, railTop: rail.top };
    });
    expect(heroGeometry.frontBottom).toBeLessThan(heroGeometry.captionTop);
    expect(heroGeometry.frontBottom).toBeLessThan(heroGeometry.railTop);
    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    expect(errors).toEqual([]);
    expect(failures).toEqual([]);
    await page.evaluate(() => scrollTo(0, 0));
    await mkdir("test-results/review", { recursive: true });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.screenshot({
      path: `test-results/review/home-${width}.png`,
      fullPage: true,
      animations: "disabled",
    });
  });
}
test("keyboard navigation, contact links, and project routes", async ({
  page,
}) => {
  await mount(page);
  await page.goto(root);
  await page.keyboard.press("Tab");
  await expect(page.getByText("Skip to content")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(`${root}#main`);
  await page
    .getByRole("link", { name: "Explore my work", exact: true })
    .click();
  await expect(page).toHaveURL(`${root}#work`);
  await page
    .getByRole("link", { name: "Explore JagoASN project", exact: true })
    .click();
  await expect(page.locator("h1")).toHaveText("JagoASN");
  await expect(page.getByRole("link", { name: "Visit site" })).toHaveAttribute(
    "href",
    "https://jagoasn.com",
  );
  await expect(
    page.getByRole("link", { name: /dedisuhaimiacc/ }),
  ).toHaveAttribute("href", "mailto:dedisuhaimiacc@gmail.com");
  await expect(
    page.getByRole("link", { name: "Résumé", exact: true }),
  ).toHaveAttribute("download", "");
});
for (const slug of ["jagoasn", "chrommandr", "simrs"])
  test(`${slug}: detail page is accessible`, async ({ page }) => {
    await mount(page);
    await page.goto(`${root}projects/${slug}/`);
    await expect(page.locator("h1")).toBeVisible();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  });
test("all content and navigation work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await mount(page);
  await page.goto(root);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator(".project")).toHaveCount(3);
  await page.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(`${root}#about`);
  await page.goto(`${root}about/`);
  await expect(page).toHaveURL(`${root}#about`);
  await page.goto(`${root}projects/simrs/`);
  await expect(page.locator("h1")).toHaveText("SimRS");
  await expect(page.locator(".detail-gallery figure")).toHaveCount(2);
  await context.close();
});
test("reduced motion disables authored animations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await mount(page);
  await page.goto(root);
  const motion = await page.locator(".hero h1").evaluate((element) => ({
    animation: getComputedStyle(element).animationName,
    scroll: getComputedStyle(document.documentElement).scrollBehavior,
  }));
  expect(motion).toEqual({ animation: "none", scroll: "auto" });
});
