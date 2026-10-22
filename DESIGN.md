---
name: Dedi Suhaimi — Precision studio
description: Considered engineering made tangible through real software.
colors:
  paper: "#f7f7f5"
  ink: "#252724"
  muted: "#656862"
  line: "#dcded8"
  blue: "#345f97"
typography:
  display:
    fontFamily: '"Geist Variable", sans-serif'
    fontSize: "clamp(56px, 6.5vw, 92px)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"Geist Variable", sans-serif'
    fontSize: "clamp(35px, 4vw, 52px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  body:
    fontFamily: '"Geist Variable", sans-serif'
    fontSize: "14px"
    lineHeight: 1.7
  label:
    fontFamily: '"Geist Mono Variable", monospace'
    fontSize: "9px"
    letterSpacing: "0.015em"
rounded:
  control: "8px"
  stage: "12px"
  navigation: "14px"
components:
  button-primary:
    backgroundColor: "#292c28"
    textColor: "#fff"
    rounded: "{rounded.control}"
    padding: "14px 20px"
  button-primary-hover:
    backgroundColor: "#3b4038"
  navigation-contact:
    backgroundColor: "#fff"
    rounded: "{rounded.control}"
    padding: "11px 15px"
  software-window:
    backgroundColor: "#fff"
    rounded: "{rounded.control}"
---

# Design System: Dedi Suhaimi — Precision studio

## Overview

**Creative North Star: "Precision studio"** (seed `d1b3fa24`).

Software is presented as the product of considered engineering. The opening balances a deliberately oversized, left-aligned statement with overlapping windows drawn from the actual JagoASN and SimRS interfaces. The front window has a fine graphite edge, an inset toolbar, and a directional shadow. The second window establishes depth and makes the breadth of the work visible before scrolling. The page progresses from tangible work to engineering approach, capabilities, résumé-sourced experience, and a graphite contact close.

The neutral light direction and Geist typography are explicit brief requirements. They take precedence over generic style-detector objections to neutral palettes or popular fonts. The specificity comes from the actual software, the window treatments, and the alternating scale and rhythm of the work.

**Key Characteristics:**
- Real software imagery supplies the visual proof.
- Neutral light surfaces, precise Geist typography, and restrained blue accents.
- Tangible framed windows and distinct editorial project arrangements.
- Static-first content with progressive, reduced-motion-aware enhancement.

### Finish review and verdict

Recorded verification: Astro check reported zero errors, warnings, or hints. Production builds and all 17 static tests passed at both root and `/my-portofolio`. The parent environment ran all 10 Chromium browser stories successfully, including project routes, keyboard, reduced motion, no-JavaScript rendering, responsive imagery, and axe checks. Separate live-server checks covered 320, 390, 768, 1440, and 1920px with no horizontal overflow, broken images, runtime errors, or axe violations. Full npm audit reported zero vulnerabilities. These are existing results, not checks rerun during this documentation-only handoff.

Initial localhost mobile Lighthouse returned 100 in all four categories. The final HTTP Tailscale preview returned 100 Performance / 100 Accessibility / 78 Best Practices / 100 SEO; the two failed Best Practices audits concerned only missing HTTPS and the HTTP-to-HTTPS redirect on that private preview. These synthetic lab results are not field measurements or comprehensive accessibility certification. The private preview is not a public production deployment; production transport still needs assessment on HTTPS hosting.

The initial independent reviewer accepted the direction, captures, and other reviewed widths, confirmed the privacy and slug-selection fixes, and requested a tablet hero spacing correction. The final independent pass confirmed the three targeted fixes resolved: tablet hero collision, overlapping captions, and stale documentation. Reserved hero stage space keeps the transformed window clear of its caption and bottom rail; the overlapping SimRS overlay caption is removed.

**Verdict:** SHIP — reviewer scored tablet hero collision, overlapping captions, and stale documentation resolved; targeted verdict scope only.

This is the independent targeted follow-up disposition, not certification of every surface or every device.

## Colors

The palette is warm-neutral and lightly green-cast, with product imagery supplying the broader color range. Frontmatter records the core CSS custom properties in `src/styles/global.css`.

### Primary
- **Restrained Blue:** focus outlines, link hover, selection, and small interface accents; not a general-purpose brand wash.

### Neutral
- **Paper:** page background and light reading ground.
- **Graphite Ink:** primary type and dark structural emphasis.
- **Secondary Graphite:** supporting copy, dates, and metadata.
- **Hairline:** section dividers and quiet boundaries.

**The Product Color Rule.** Let the original software and its authored showcase stage supply color; do not replace the neutral identity with a general brand gradient.

## Copy and voice

Use direct first-person statements and concrete product descriptions. The hero reads “I build software for exam prep, browser tools and hospitals.” Its introduction explains that Dedi works on both the interface and the code. The projects give concrete examples of those areas; avoid an API-first headline for nontechnical visitors. Keep ordinary factual paragraphs, technical terminology and resume-supported details. Apply the reviewed blader/humanizer skill when editing copy; do not just replace periods with another separator.

This copy pass covers the homepage, project details, footer, metadata and authored social image. Existing colors, layouts, window treatments and motion are unchanged. The updated build passes 18 static tests (including rejected-copy regression coverage) and 10 Chromium stories; live previews were checked at 320, 390, 768, 1440 and 1920px.

## Typography

**Display and Body Font:** self-hosted Geist Latin variable sans, with sans-serif fallback.
**Label/Mono Font:** self-hosted Geist Mono variable, with monospace fallback, reserved for window metadata, dates, and the interface/system annotation.

The character is precise and contemporary, with scale and spacing doing more work than weight. Frontmatter display and headline values describe the default desktop homepage roles, not every responsive override. The hero reaches 92px; project-detail display reaches 96px. Heading tracking is no tighter than −0.04em; the small monogram and initials seal have their own tighter tracking.

Body copy varies by role: hero introduction is 15px with 1.75 line-height; project and about copy use 14px, with selected statements at 20–21px. About and experience descriptions cap at 65ch. Mono metadata stays small and secondary; do not turn prose into terminal copy.

## Layout

The main container is centered, capped at 1280px, with desktop width `min(1280px, calc(100% - 112px))`. Its total horizontal inset changes to 72px at 1100px, 48px at 800px, and 40px at 540px. Homepage adaptations use max-width breakpoints at 1100, 800, 540, and 360px, plus a wide-screen adjustment from 1600px.

The hero starts as a two-column grid (1.08fr / 1fr). At 800px it becomes one column and places the software showcase below the introduction. Its stage explicitly reserves vertical space for the full transformed artwork and the caption: 530px by default, 450px at max-width 1100px, 510px at max-width 800px, 350px at max-width 540px, and 300px at max-width 360px. The 1600px wide-screen rule retains 530px. The caption remains separate from the artwork, and the bottom rail follows the reserved composition. Existing browser assertions require the window to end before both caption and bottom rail.

On mobile, project metadata stacks, the Chrommandr visual precedes its explanation, expertise becomes a list, and timeline dates move above each role. Navigation remains directly available without a hamburger or JavaScript. The fixed header is paired with root scroll padding (110px; 95px at max-width 540px) and a keyboard skip link to the main landmark.

## Elevation & Depth

Depth is tangible rather than ornamental: floating navigation uses a lightly translucent surface and blur; buttons combine inset highlights with offset soft shadows; software windows use fine edges, inset toolbars, layered directional shadows, and controlled perspective. Project surfaces use restrained radial lighting specific to the underlying product. Open ruled rows, rather than elevated cards, organize expertise and experience.

**The Framed Evidence Rule.** Use depth to stage real interfaces and clarify interaction, not as a substitute for content. Exact navigation, button, and window shadows are recorded in `.impeccable/design.json` from the implemented CSS.

## Shapes

Controls and software windows use the control radius; larger project stages use the stage radius; desktop navigation uses its own softer radius. At max-width 540px, software windows reduce to 5px corners, project stages to 8px, and navigation to 12px. Fine borders and overflow clipping define the software frames. Circular action indicators and the initials seal are accents, not the default container language.

## Components

### Buttons and links

The primary action is dark, tactile, and compact: desktop minimum height is 48px, with a fine border, inset highlight, and offset shadow. Hover lifts it 2px and lightens the surface. At max-width 540px it becomes 46px minimum height with 12px 15px padding. Secondary actions are open text links, not competing filled buttons. Navigation contact is a separate white, bordered control. Shared keyboard focus is a 2px blue outline with 6px offset; dark contact links use a lighter focus color.

### Navigation

A fixed, translucent floating bar holds the monogram, Work, About, Experience, and a direct contact action. Desktop navigation is capped at 930px and 62px high. Supporting name text disappears at 800px; the bar and gaps compact further on small screens without removing the primary links. Link hover adds restrained blue and an underline. There is no scroll-spy active-state mechanism.

### Software windows and project stages

The window primitive frames a real responsive screenshot beneath a thin mono toolbar and three decorative controls. Eager/high-priority loading is reserved for hero imagery; other windows are lazy-loaded. Toolbar height reduces from 29px to 23px at max-width 540px.

JagoASN is the broad opening showcase, with an inset practice exam. Chrommandr changes to a compact dark stage beside the description. SimRS returns to a wide composition with registration controls over the hospital overview. These are distinct editorial arrangements, not three identical cards. The redundant SimRS overlay caption was removed to avoid overlap; its top label, actual interface imagery, project description, and action remain.

### About, expertise, experience, and contact

About combines a typographic statement and an initials seal with an engineering approach and actual mathematics education. Expertise uses open ruled rows. Experience uses truthful dates and readable descriptions rather than invented metrics. Contact is a substantial dark close with one direct email action, GitHub, LinkedIn, and the real résumé download. There are no form inputs or interactive tag/filter components to document.

### Motion and resilience

Authored opening motion resolves product windows from slight blur and displacement. Headline, introduction, and actions use restrained sequential timing. Supporting browsers progressively reveal project surfaces through view-timeline clip paths; other browsers retain the fully visible composition. Hover lifts are brief and small. There are no looping animations or scroll hijacking. Reduced motion removes animation, transitions, and smooth scrolling. Content and navigation remain available without JavaScript.

### Image and factual provenance

The source is the existing project repository and its ten original JPEG screenshots. Originals are retained outside `public/` and `src/`. Patient tables and activity feeds were hard-cropped before optimization, so responsive variants cannot reveal them. Chrommandr source crops exclude browser tabs, URLs, and desktop UI. `provenance/assets.json` records hashes and exact transformations; the build's `dist/raster-provenance.json` accounts for published JPEG, WebP, and PNG assets. The social image is an authored SVG rendered by Sharp. No stock or generated imagery is used.

Only HMI Medical Group, Formulatrix Indonesia, and MIM System appear in the timeline. The supplied résumé supports career and education data; a visible source note explains date currency. Indonesia and Software Engineer replace unverified city or availability claims. The old fabricated employers and degree are removed.

## Do's and Don'ts

### Do:
- **Do** preserve the neutral light identity and self-hosted Geist typography.
- **Do** use real, privacy-reviewed project imagery as visual evidence.
- **Do** reserve space for transformed artwork, captions, and the following rail at each breakpoint.
- **Do** keep keyboard focus, reduced-motion behavior, and no-JavaScript navigation intact.

### Don't:
- **Don't** flatten the three project arrangements into identical cards.
- **Don't** restore the overlapping SimRS overlay caption.
- **Don't** invent career claims, availability, metrics, or unreviewed image content.
- **Don't** describe the targeted SHIP verdict or local lab scores as full certification or public production deployment.
