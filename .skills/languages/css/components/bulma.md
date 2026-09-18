---
name: bulma
description: Bulma — free, open-source CSS framework based on flexbox with minimal setup and a simple, modern aesthetic.
---

Bulma is a **free, modern CSS framework built on flexbox** — an **output-ready styling layer** providing layout primitives (columns), components (cards, forms, modals), and utilities without JavaScript.

## 1. Installation and Setup

- CDN: include `bulma` CSS from CDN in HTML.
- npm: `npm i bulma` — import `bulma.min.css` in your JS/CSS entry.
- Load only what you need with the Sass modules (`bulma/sass/...`) if you build with Sass.

## 2. Layout Primitives

- Columns: `.columns` / `.column` flexbox grid; size via `.is-1`…`.is-12`, offsets `.is-offset-*`.
- Next: containers `.container`, sections `.section`, and spacing helpers.
- Multi-line auto-fit: `.columns.is-multiline` + per-column widths.

## 3. Components

- Elements: buttons (`.button.is-primary`), forms, icons, boxes, tables, `notification`, `tag`.
- Components: `card`, `navbar` (with burger toggle), `tabs`, `modal`, `message`, `dropdown`, `breadcrumb`, `pagination`.
- Most components are pure CSS: JavaScript needed only for interactive behaviors (navbar burger, dropdowns).

## 4. Helpers/Utilities

- Spacing: `m-*`, `p-*`, `mb-*`, `mt-*` scale.
- Text/color helpers, `is-flex`, `is-hidden-*` responsive toggles.
- Modifiers: `is-*` style variants (colors, sizes, states).

## 5. Customization

- Theme from variables by compiling the Sass (`$primary`, `$link`, `$family-sans-serif`, etc.).
- Use modular Sass (`@use "bulma/sass"`) to import only needed components.
- Consider `bulma-prefers-dark` or custom dark variable sets for dark themes.

## 6. Common Pitfalls

- Assuming all components are interactive without adding the needed JS (modals/burger).
- Over-relying on the default look for strong brand identity.
- Importing the full CSS when you only need parts.

## General Rules of Thumb

- Bulma = flexbox-first styling layer; pair with custom JS interactions explicitly.
- Use the modular Sass imports when bundles matter.
- Override via Sass variables, not late CSS patches.

## Quick-Start Checklist

- [ ] Add Bulma via CDN or npm; import CSS.
- [ ] Build layout with `.columns`/`.column` and containers.
- [ ] Use components with proper modifier classes (`is-*`).
- [ ] Add JS for interactive components (navbar burger, modal, dropdown).
- [ ] Theme key variables via Sass if compiling yourself.
- [ ] Test responsive toggles and mobile layouts.
