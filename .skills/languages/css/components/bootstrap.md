---
name: bootstrap
description: Bootstrap — the most widely used CSS framework with responsive grid, utilities, components, and Sass-based theming.
---

Bootstrap is the **most widely used open-source CSS framework**, providing a **responsive grid system, ready-made components, JavaScript plugins, and a utility API**, themable through Sass variables and maps.

## 1. Installation and Setup

- CDN (quick start): `<link>` CSS + `<script>` bundle for components needing JS.
- npm: `npm i bootstrap` — import `bootstrap/dist/css/bootstrap.min.css` and the JS bundle.
- Sass theming: import `bootstrap/scss/_functions.scss`, `_variables.scss`, then override variables before importing the rest.
- For React: use `react-bootstrap` components; for Angular, `ng-bootstrap`.

## 2. Grid System and Layout

- 12-column flexbox-based grid: `.container`, `.container-fluid`, `.row`, `.col`, `.col-md-6` etc.
- Breakpoints: `xs`, `sm`, `md`, `lg`, `xl`, `xxl` (576/768/992/1200/1400px).
- Utility classes for layout: `d-flex`, `justify-content-*`, `align-items-*`, `gap-*`, `order-*`.
- CSS Grid option: Bootstrap 5 provides `g-*` gutter and `row-cols-*` for equal-width auto columns.

## 3. Components

- Buttons, alerts, badges, cards, navs/navbar, forms, dropdowns, modals, toasts, tooltips, popovers, carousel.
- Interaction components require JS: initialize with `data-bs-*` attributes for simplicity.
- Accessibility: many components ship with ARIA roles; verify contrast and keyboard support.

## 4. Utilities and Theming

- Rich utility classes: spacing (`m-*`, `p-*`), text (`text-*`), color (`text-primary`, `bg-*`), borders, shadows, opacity.
- Customize via Sass variables (colors, spacing scale, border-radius) and `$utilities` map.
- `--bs-*` CSS custom properties power runtime theming (e.g., `--bs-primary`).
- Dark mode: `.text-bg-dark`, `data-bs-theme="dark"` (Bootstrap 5.3+).

## 5. Common Pitfalls

- Importing JS but missing Popper for tooltips/popovers.
- Overriding components by hacky class overrides instead of Sass variables.
- Neglecting responsiveness on custom content (fixed widths outside grid).
- Conflict between Bootstrap and existing CSS (order/layer management).

## General Rules of Thumb

- Theme via Sass variables/maps; avoid late CSS overrides.
- Use the utility API before writing bespoke component CSS.
- Choose `react-bootstrap`/`ng-bootstrap` for framework-native experiences.
- Keep JS interactions dependency-aware (Popper for popovers).

## Quick-Start Checklist

- [ ] Install via npm or CDN; import CSS + JS bundle.
- [ ] Set up responsive container/row/col structure per layout.
- [ ] Theme via Sass variables (primary color, spacing, radii).
- [ ] Use components with proper `data-bs-*` and accessibility attributes.
- [ ] Verify dark-mode and contrast via `data-bs-theme`.
- [ ] Test breakpoints: xs→xxl on real widths.
