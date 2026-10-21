# Implementation and verification

## Application

Static Astro 7.4.2 / TypeScript / Tailwind portfolio with self-hosted Geist, server-rendered Lucide icons, CSS motion, and no client framework runtime. Three editorial showcases link to actual project details. About, expertise, résumé-backed experience, email/social contact, real PDF download, SEO/OG, sitemap, robots, and 404 are implemented. Typed content lives in `src/data/`.

Directory: `/home/projects/personal/my-portofolio`. Old `/var/www` deployment and port 8099 service untouched.

## Verified commands

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: succeeds; 8 pages and 47 accounted-for shipping rasters. Mandatory privacy gate verifies all 10 reviewed derivative hashes; postbuild refuses original hashes.
- `npm test`: 17 tests pass, including negative privacy test, factual content, actual PDF, hashes, built links, and SEO/base URLs. Root and `/my-portofolio` builds both tested; local build restored to root.
- `npm run test:browser`: 10 Chromium tests pass at 320/390/768/1440px, including detail pages, keyboard, reduced motion, JS-disabled use, images and axe. Hero assertions require artwork to end before caption and bottom rail.
- Live HTTP Chromium verification at 320/390/768/1440/1920px: no horizontal overflow, broken images, page errors or axe violations; actual navigation leaves targets below floating nav. Three detail routes return HTTP 200.
- `npm audit`: 0 vulnerabilities.
- `git diff --check`: passes.

Browser evidence: `.impeccable/review/` and `test-results/review/` (gitignored).

## Performance

Local mobile Lighthouse at localhost returned 100 Performance / 100 Accessibility / 100 Best Practices / 100 SEO. Final Tailscale HTTP preview returned 100 Performance / 100 Accessibility / 78 Best Practices / 100 SEO: both failed Best Practices audits concern missing HTTPS/HTTP redirect on this private preview. Synthetic lab results are not field measurements, comprehensive accessibility certification, or a promise of identical scores on all devices. Production transport should be assessed on HTTPS hosting.

## Review corrections

Independent source review found unenforced privacy hashes and positional project selection; fixed with mandatory build gates and slug lookup. Browser tests caught joined mobile heading words and transient animation overflow; both corrected. Independent visual review requested more tablet hero space; corrected across breakpoints and guarded by geometry assertions. Overlapping SimRS caption removed. Final targeted verdict is tracked in DESIGN.md.

## Provenance and limitations

Ten original screenshots retained in `provenance/originals/`, outside published assets. Patient tables/activity feeds are cropped before responsive optimization. The actual supplied résumé is downloadable; dates reflect that source, not independently verified current employment/availability. Project outbound destinations come from the original repository; current external uptime, email delivery, and LinkedIn account ownership are not certified.

## Private preview

Transient systemd unit `dedi-portfolio-preview.service` serves `http://100.112.65.83:8100/`, bound only to Tailscale. It survives this chat, but is not reboot-persistent production hosting. Stop: `systemctl stop dedi-portfolio-preview`.

## Changed files

- Config/CI: Astro/package files, `.gitignore`, Playwright config, `.github/workflows/`.
- Pages: homepage, project detail routes, legacy section redirects, 404, sitemap/robots.
- Components/layout/styles: framed windows, navigation/footer/contact, icons, responsive tokens/typography, fonts, reduced motion.
- Data: portfolio/project facts, image imports, URL helpers.
- Assets: supplied PDF, favicon/OG, 10 reviewed derivatives, 10 retained originals, hash/crop provenance.
- Scripts/tests: asset preparation, privacy verifier, raster manifest, static/browser tests.
- Docs: PRODUCT.md, DESIGN.md, README.md, this file.
