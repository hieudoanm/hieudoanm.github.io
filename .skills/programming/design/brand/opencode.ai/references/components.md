# OpenCode components

Rules marked (v) come from the site's source; (p) are proposed where the source was silent. Tokens live in `tokens.css`.

## Section shell (v)

`padding: var(--vertical-padding) var(--padding); border-top: 1px solid var(--color-border-weak);` with content in a `.container` capped at 67.5rem. Used by: what, growth, privacy, zen-cta, email, faq, testimonials.

## Header (p)

Row with logo (image or text wordmark) left, text links right: GitHub, Docs, Data, Zen, Go, Enterprise, Download. Color `--color-text`, hover `--color-text-strong`. Mobile: hide links, show an "Open menu" text button.

## Hero (v)

- Flex column, `padding: calc(var(--vertical-padding) * 1.5) var(--padding)`.
- `h1`: 38px (22px under 60rem), `--color-text-strong`.
- Subhead: one sentence, `--color-text`.
- Video: `width:100%; height:auto; aspect-ratio:16/9; object-fit:cover; display:block; border-top:1px solid var(--color-border-weak)`; `autoplay muted loop playsinline`.

## Install box with tabs (v/p)

- Tabs: `curl`, `npm`, `bun`, `brew`, `paru`, `yay`. Tab `line-height:1` (v); active tab uses `--color-background-interactive` (p).
- Panel: 6px radius, 1px `--color-border` border, `--color-background-weak` fill (p). Command at 16px; the highlighted token weight 500 (v).
- Optional copy affordance: text button "Copy" (no icon).

## Buttons (v)

- Primary: `--color-background-strong` fill, `--color-text-inverted` text, radius 4px, padding `8px 12px 8px 20px`, hover to `-strong-hover`. Put a trailing `→` in the 12px side.
- Secondary (Zen CTA): transparent, 1px border, same radius and padding.

## Feature list (p)

Seven short items in a simple list or two-column grid: LSP enabled, Multi-session, Share links, GitHub Copilot, ChatGPT Plus/Pro, Any model, Any editor. Item title 16px bold; one-line description in `--color-text`.

## Stats with figures (v/p)

Three columns: large number (stars, contributors, monthly developers), label beneath, caption `Fig 1`..`Fig 3` in `--color-text-weak`. Numbers sized well above body; no chart graphics required.

## Privacy / promo block (v)

Title 16px bold, two sentences at 200% line height, one text link. Zen promo ends with the outline button.

## Email dock (v)

Rounded container, radius 14px, 1px border, input + primary "Subscribe" button; input radius 4px. Single line on desktop, stacks on mobile.

## FAQ (p)

Eight literal questions as headings in an accordion, each separated by a hairline. Answer text 200% line height.

## Footer (v)

Flex row; each cell separated by a 1px divider; cell links `padding: 2rem 0` (cells fill the width). Below 25rem each cell wraps to its own row. Then a legal line: `©2026 Company`, Brand, Privacy, Terms, language.

## Accessibility

- Verify contrast: `--color-text-weak` is for captions only; body uses `--color-text`.
- Tabs and accordion need keyboard support and visible focus (rule in `tokens.css`).
- The hero video is decorative: muted, no controls, surrounding copy carries meaning.
