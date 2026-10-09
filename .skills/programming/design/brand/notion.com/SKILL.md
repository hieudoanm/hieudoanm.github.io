---
name: notion-design
description: Design system for Notion, covering both the notion.com marketing site (white canvas, strong blue CTA, pastel tint cards, dark campaign bands, big bold Inter-style headlines, product mockups) and the Notion app UI (warm-ink text on white or near-black, translucent hover fills, hairline alpha borders, tiny radii, emoji page icons, sidebar tree, block editor, callouts, toggles, to-dos, database tables, slash menu, popovers). Use whenever the user asks to build, mock up or restyle a landing page, docs/wiki page, knowledge base, notes app, workspace, database table view, sidebar layout or components "like Notion", "in the Notion style", "notion-like editor", or "clean minimal workspace app", even if they never name Notion.
---

# Notion design system

Two related but different surfaces. Pick the one that matches the request:

- **Marketing** (notion.com): a light, confident product site. Start from `assets/marketing-template.html`.
- **App** (the workspace UI): a calm, document-first interface. Start from `assets/app-template.html`.

They share the ink color family, the hairline philosophy and the Inter-based type, so mixed work (a marketing page that embeds an app mockup) should reuse the app tokens inside the mockup.

## Provenance: what is verified and what is not

No Notion stylesheet could be retrieved directly, and notion.com's own CSS was not accessible. Be explicit with the user about this.

- **Verified from the rendered notion.com page text:** section order, headlines, copy, nav groups, stats, footer groups.
- **Cross-checked, third-party (two independent design catalogs for the marketing site, and an unofficial design-system package plus the react-notion-x stylesheet for the app):** most colors and sizes below. Where the sources agree, values are treated as likely; where they disagree it is flagged.
- **Known conflict:** one catalog lists a purple CTA (`#5645d4`); the other, and the link color in both, is blue `#0075de`. This skill uses blue. Tell the user if brand accuracy matters and ask for a screenshot or computed styles.
- **Proposed (from general knowledge of the app, not measured here):** sidebar width, topbar height, page content width, popover shadows, dark-mode surface values, hover alpha, icon sizes. Marked `proposed` in `references/tokens.css`.
- Fonts: Notion's marketing font is described as a custom Inter cut ("NotionInter"), with a serif (Lyon Text) for pull quotes and a mono (iA Writer Mono) for labels. These are proprietary or licensed; the skill uses Inter-first stacks with system fallbacks and Georgia for quotes.

## Marketing site: the look

White canvas, near-black ink, a single saturated blue (`#0075de`) for the main action and links, and hairline borders at 10% black. Headlines are very large, bold and tightly tracked (hero ~80px, -0.04em). Depth comes from big product mockup cards (soft, diffuse shadow, 12px radius) placed on tinted or white bands. Pastel tint cards (peach, rose, mint, lavender, sky, yellow) categorize use cases. One dark navy or charcoal "campaign" band and a stats band break the page. A pull quote in serif closes the argument.

### Marketing page anatomy (order)

1. Nav: Product and Resources menus, Pricing, "Request a demo", "Log in", primary "Get Notion free".
2. Hero: H1 "Where teams and agents think together", one-sentence subhead, two buttons, looping video plus a pile of product images.
3. Logo strip: "The most ambitious companies run on Notion", monochrome customer logos.
4. Three feature blocks (Capture knowledge / Find answers / Automate busywork): label, heading, short copy, screenshot card.
5. Use-case cards on tinted backgrounds ("See what Notion can do").
6. Testimonials ("Trusted by teams that ship").
7. Stats band (users, countries, YC share, community, Fortune 100 share).
8. Quote block (serif).
9. Footer: Product, Resources, Company, "Notion for" columns, language selector, cookie settings, copyright.

## App: the look

The app disappears behind the content. Text is a warm dark ink (`#37352f`), not black. Borders and hovers are the same ink at low alpha (`rgba(55,53,47,.09)` hairlines, `.08` hover fill), so everything stays tonally consistent in any context and on any tinted block. Radii are tiny (3-6px). Controls and affordances appear on hover (block drag handle and plus, row actions). Emoji serve as page, callout and database icons, which is why icons need no custom assets. Dark mode is near-black `#191919` with a slightly lighter sidebar.

### App anatomy

- **Sidebar** (left, ~240px, `--sidebar` bg): workspace switcher, search/home/inbox rows, then sections (Favorites, Private, Shared) as a collapsible tree with `▸` toggles and emoji icons. Row height ~28px, 4px radius, hover fill.
- **Topbar** (~45px): breadcrumb (`🏠 Page / Sub page`), share, star, more. Translucent over content.
- **Page**: optional full-width cover, a large emoji icon overlapping it, a 40px bold title, a properties strip, then blocks in a ~708px column with ~96px side padding (narrow on mobile).
- **Blocks**: text, H1-H3, bulleted/numbered/to-do lists, toggle, quote, callout, divider, code, table/database, columns, image. Each has a hover-only handle `⋮⋮` and `+`.
- **Slash menu / popovers**: white card, 6px radius, 3-layer shadow, grouped rows with icon, title, description.
- **Database table view**: borderless cells with hairline row separators, property-type glyph in header, colored select pills using the block palette, "+ New" row.

## Design rules

- **Ink, not black.** Body `#37352f`; secondary at 60% alpha; hairlines at 9-16% alpha. Same family everywhere.
- **Hover is a translucent wash**, not a color change: `rgba(55,53,47,.08)`. In dark mode use white at ~5.5%.
- **One blue.** App link/selection blue `#2383e2`; marketing CTA blue `#0075de`. Never add a second brand accent; color comes from the block palette (gray, brown, orange, yellow, teal, blue, purple, pink, red), as text and as tinted backgrounds.
- **Tiny radii in the app (3-6px); 8-12px on marketing buttons and cards.**
- **Content width is a feature.** Keep prose to ~700px in the app; marketing text blocks to ~60ch.
- **Emoji as icons.** Use text glyphs (`▸ ⋮⋮ + ☐ ✓ ↗`) and emoji. Do not inline SVG in generated code.
- **Reveal on hover, reserve space.** Handles and row actions occupy their space always (opacity 0 to 1) so nothing shifts.
- **Marketing headlines are bold and large; app headings are modest** (30/24/20px, weight 600). Do not scale app headings to marketing size.
- **Follow `prefers-color-scheme`** for the app; the marketing site is light with dark bands.

## Voice

Marketing: confident, benefit-led, short declaratives with action verbs and social proof ("Get Notion free", "Find answers", "Trusted by teams that ship."). Sentence case. App microcopy: terse and literal ("Untitled", "Add a page", "Type '/' for commands", "Press Enter to continue with an empty page"). No exclamation marks.

## How to use this skill

1. Copy `references/tokens.css`; use the marketing `--m-*` variables for the site and the `--app-*` variables (scoped to `[data-app]`) for app UI.
2. Start from the matching template in `assets/` and replace content.
3. Read `references/marketing-components.md` or `references/app-components.md` for component recipes.
4. Before finishing, run the Design rules checklist and tell the user which values were proposed rather than verified, and that fonts were substituted.

## Files

- `references/tokens.css`: marketing and app tokens (light/dark), block color palette, base styles.
- `references/marketing-components.md`, `references/app-components.md`: component recipes.
- `assets/marketing-template.html`: landing page template.
- `assets/app-template.html`: sidebar + page + blocks + database + slash menu template.
