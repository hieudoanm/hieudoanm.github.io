# Overview

Focused reference for **opencode-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
