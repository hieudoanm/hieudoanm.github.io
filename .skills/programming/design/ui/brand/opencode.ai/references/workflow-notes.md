# Workflow notes

Focused reference for **opencode-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
