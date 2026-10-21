# Dedi Suhaimi — software engineering portfolio

A static Astro portfolio built around three real projects: JagoASN, Chrommandr, and SimRS. Geist typography, large editorial project compositions, responsive original screenshots, and CSS motion. No client framework or runtime JavaScript is required.

## Setup and local preview

Use Node **22.23.4+** (Node 24 recommended) and npm.

```sh
npm ci
npm run check
npm run build
npm test
npm run preview -- --host 127.0.0.1 --port 8100
```

Open `http://127.0.0.1:8100/`. Preview is an explicit foreground command; no server is automatically started by builds or tests.

Development follows this workspace's background-server convention:

```sh
npm run dev
npm run dev:status
npm run dev:logs
npm run dev:stop
```

## Site and base path

Local builds default to `/`. The existing GitHub Actions deployment defaults to `/my-portofolio` and `https://ddsuhaimi.github.io`. Configure either explicitly:

```sh
SITE_URL=https://ddsuhaimi.github.io BASE_PATH=/my-portofolio npm run build
TEST_BASE_PATH=/my-portofolio npm test
npm run preview -- --host 127.0.0.1 --port 8100
```

For that build, open `http://127.0.0.1:8100/my-portofolio/`. For a custom domain, set `SITE_URL=https://your-domain.example BASE_PATH=/`. Site and base apply to routes, assets, redirects, canonical URLs, social images, sitemap, and robots. Rebuild after changing them. Only the generated `dist/` directory is intended for publishing. This task does not deploy or alter the existing service.

## Verification

- `npm run check`: Astro and TypeScript diagnostics.
- `npm run build`: static routes, Sharp image optimization, and a hash-based provenance manifest for every shipping raster.
- `npm test`: 18 tests covering the mandatory privacy gate (including rejection of original screenshots), real content, résumé, retained source hashes, privacy crops, root/nested URL handling, every generated internal link, anchors, SEO, and published assets. Run after building.
- `npm run test:browser`: Chromium tests at 320, 390, 768, and 1440px, axe accessibility checks, all project pages, keyboard navigation, reduced motion, and JavaScript-disabled use. Tests serve built files through Playwright request interception, so no dev server is started. Set `CHROMIUM_PATH` if Chromium is not `/usr/bin/chromium`; run `npx playwright install chromium` and adjust that path on machines without system Chromium. Screenshots are saved to `test-results/review/`.
- `npm audit`: full dependency vulnerability audit; requires registry network access.

## Content and assets

- `src/data/portfolio.ts`: identity, contact details, education, résumé-sourced employment, and grouped expertise.
- `src/data/projects.ts`: original project facts and feature descriptions, with typed roles.
- `src/data/images.ts`: typed screenshot imports, descriptive alt text, and gallery captions.
- `src/components/`: navigation, contact close, framed software windows, and Lucide icons.
- `src/styles/`: shared design tokens, responsive compositions, self-hosted Geist Latin variable fonts, and reduced-motion rules.
- `src/pages/projects/[slug].astro`: static project detail pages. `/about/`, `/contact/`, and `/projects/` redirect to the relevant homepage sections without requiring JavaScript.
- `public/Dedi-Suhaimi-Resume.pdf`: the actual supplied PDF. Career dates reflect the supplied résumé, including its wording “Present”; no independent current employment or availability claim is made.

Original images are retained in `provenance/originals/`, **outside published assets**. The hospital screenshots contain patient-level information; never copy originals to `public/`. `npm run assets` rebuilds reviewed source images in `src/assets/projects/`, stripping metadata and hard-cropping the hospital registration table and activity feed. It also crops browser chrome from Chrommandr and renders the authored Open Graph SVG to PNG. `provenance/assets.json` records original and derivative hashes, transformations, and review notes. The build writes `dist/raster-provenance.json` for optimized derivatives and the social PNG. No source data is asserted to be fictitious.

See [DESIGN.md](DESIGN.md) for the implemented design and finish review, and [IMPLEMENTATION-NOTES.md](IMPLEMENTATION-NOTES.md) for verification details and limitations.

Official Astro references consulted: [components](https://docs.astro.build/en/basics/astro-components/), [routing](https://docs.astro.build/en/guides/routing/), [styles](https://docs.astro.build/en/guides/styling/), and [images](https://docs.astro.build/en/guides/images/).
