---
name: "opencode-design"
description: "Design system and page-building guide for the OpenCode (opencode.ai) look: an all-monospace, terminal-flavoured marketing site with hairline-divided sections, near-black/near-white themes that follow the OS, a pale yellow-lime accent, tiny radii, and blunt developer copy. Use whenever the user asks to build, mock up, restyle or write copy for a landing page, docs-style page, CLI/dev-tool product page or component \"in the OpenCode style\", \"like opencode.ai\", or \"terminal-style, mono-font, minimal dev tool site\", even if they never name OpenCode."
tags:
  - "programming"
  - "design"
  - "brand"
  - "opencode"
  - "ai"
when_to_use: "Use when creating or reviewing an interface that should follow OpenCode design system design guidance."
prerequisites:
  - "A clear product or design goal."
  - "Familiarity with the target audience and existing interface constraints."
related_skills:
  - "../claude.com/SKILL.md"
  - "../notion.com/SKILL.md"
  - "../getartcraft.com/SKILL.md"
avoid_when:
  - "When the brief does not call for this design system or philosophy; follow the project’s existing design language instead."
status: "active"
---
# OpenCode design system

Reproduces the visual and verbal style of opencode.ai, the marketing site for the open source AI coding agent.

## Provenance: what is verified and what is not

Values below were read from the site's published source (the marketing app's `routes/index.css`, `style/token/font.css`, `style/base.css`) through a text-extraction tool, plus the rendered page text. So:

- **Verified from source:** color tokens (light and dark), font stack, `--padding` and `--vertical-padding`, content max-width, breakpoint, button radius and padding, section divider rule, card/tab/dock radii, hero video rules, heading sizes called out below, body line-height.
- **Verified from page text:** section order, copy, nav and footer contents, stats, FAQ questions.
- **Not verified (proposed):** exact font sizes for things the source did not state (nav, tabs, labels), hover/transition timings, the footer's exact column widths, how the `Fig 1-3` figures are drawn. These are marked `proposed` in `references/tokens.css` and `references/components.md`.
- The extractor summarizes rather than quotes, so treat numeric values as very likely correct but re-check against DevTools if pixel accuracy matters.

## The look in one paragraph

Everything is monospace, including body copy and headings (`--font-sans` is literally an alias of `--font-mono`). Colors are nearly neutral with a faint warm cast; the one accent is a pale yellow-lime used for interactive highlights. Layout is a stack of full-width sections separated by 1px hairlines, with generous vertical rhythm (4rem) and wide side padding (5rem). Body text is set at a very loose 200% line height, which gives the page its calm, document-like feel. Controls are tiny-radius (4px) and flat: a dark filled primary button in light mode that inverts to a pale filled button in dark mode. The tone is a README that happens to be a website.

## Page anatomy (in order)

1. **Header**: logo, then text nav: GitHub, Docs, Data, Zen, Go, Enterprise, Download. Mobile: "Open menu" toggle.
2. **Hero**: `h1` "The open source AI coding agent" (38px, 22px on mobile); one-line subhead (free models included, or connect any provider); an install box with tabs `curl`, `npm`, `bun`, `brew`, `paru`, `yay` showing `curl -fsSL https://opencode.ai/v2/install | bash`; a full-width 16:9 looping product video below, with a 1px top border.
3. **What is X?** Short paragraph (terminal, IDE or desktop) plus a seven-item feature list, then a "Read docs" button.
4. **Growth / stats**: three big numbers (stars, contributors, monthly developers) with a small note, captioned as `Fig 1`, `Fig 2`, `Fig 3`.
5. **Privacy**: "Built for privacy first", two sentences, link to privacy docs.
6. **Zen CTA**: promo for the curated-model product with a bordered (not filled) secondary button.
7. **Email dock**: "Be the first to know when we release new products", input plus Subscribe, in a rounded (14px) dock.
8. **FAQ**: eight question headings as an accordion.
9. **Footer**: a single row of bordered cells (GitHub with star count, Docs, Changelog, Discord, X), then `©2026 Company`, Brand, Privacy, Terms, language.

## Design rules

- **One font family, monospace.** Set `font-family: var(--font-mono)` on the page root. Do not mix in a proportional sans for headings; hierarchy comes from size and weight only.
- **Follow the OS theme** with `prefers-color-scheme`; define every color as a variable on a page-scope selector, light first, dark in the media query. No manual toggle needed.
- **Hairlines, not boxes.** Sections get `border-top: 1px solid var(--color-border-weak)`; cards get a 1px border and 6px radius, nothing heavier. No shadows or glows.
- **Primary button inverts with theme** (`--color-background-strong`). Padding `8px 12px 8px 20px` leaves room for a trailing glyph such as `→`; keep that asymmetry.
- **Loose reading rhythm.** Paragraph line-height 200% desktop, 180% mobile; headings stay tight. `html` itself is `line-height: 1`, so always set line-height on text elements.
- **Small type, big numbers.** Section titles are 16px bold; the page's emphasis comes from the h1 (38px) and the stat figures, not from a ladder of large headings.
- **Accent sparingly.** `--color-background-interactive` (pale yellow-lime) marks active tabs, selected rows and highlighted code, never large fills.
- **Show the real product.** Hero is real footage. If none exists, use a bordered placeholder with a mono caption, never stock art.
- **Icons.** Text glyphs (`→`, `↗`, `▪`) and CSS only; do not inline SVG in generated code. Logos load as external image files or render as a text wordmark.
- **Responsive.** Break at `60rem`: padding drops to 1.5rem, vertical padding to 3rem, h1 to 22px, body line-height to 180%, footer cells wrap onto separate rows below 25rem.

## Voice

Plain, literal, developer-to-developer. Short declarative sentences, concrete numbers and provider names, no marketing adjectives. Say what it does and what it costs. Examples: "The open source AI coding agent." / "Built for privacy first." / "Be the first to know when we release new products." Avoid exclamation marks, emoji and superlatives. FAQ headings are the literal questions people ask ("Do I need extra AI subscriptions to use OpenCode?").

## How to use this skill

1. Copy `references/tokens.css` into the project and reference the variables everywhere.
2. Start from `assets/template.html` (full page with light/dark support) and swap in your copy.
3. For single components read `references/components.md`.
4. Before finishing, check the Design rules list and tell the user which values were proposed rather than verified.

## Files

- `references/tokens.css`: color (light and dark), font, spacing, radius, layout tokens, base styles.
- `references/components.md`: component recipes.
- `assets/template.html`: single-file landing page template, no inline SVG, no external dependencies.
