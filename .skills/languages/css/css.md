---
name: css
description: CSS — Cascading Style Sheets for styling web documents with selectors, layout, responsive design, and performance.
---

CSS (Cascading Style Sheets) controls the **presentation layer of the web** — from color and typography to layout, animation, and responsive design.

## 1. Box Model and Units

- Every element is a box: `content` + `padding` + `border` + `margin`.
- `box-sizing: border-box` includes padding/border in width/height — the default for modern resets.
- Units: relative (`rem`, `em`, `%`, `vh`, `vw`, `ch`) over absolute (`px`) for scalable, responsive UI.
- Logical properties (`margin-inline`, `padding-block`, `inset-inline`) adapt to writing direction.

## 2. Layout Systems

- **Flexbox** (`display: flex`) for one-dimensional distribution: alignment, wrapping, ordering.
- **Grid** (`display: grid`) for two-dimensional layout: columns/rows, `grid-template`, `auto-fit`/`auto-fill` for responsiveness.
- **CSS Multi-column**, `positioning` (static/relative/absolute/fixed/sticky), and float-free flow.
- Property selection: Grid for page structure, Flexbox for components and inline elements.

## 3. Selectors and Specificity

- Selector types: type, class, `id`, attribute, pseudo-class (`:hover`, `:focus`, `:nth-child`), pseudo-elements (`::before`, `::after`).
- Specificity: inline styles > IDs > classes/pseudo-classes > types. `!important` escapes the cascade — avoid overuse.
- `cascade` and `inheritance` control which rule wins; `:root`/custom properties and `@layer` structure the cascade (`@layer` in 2022+).
- Use `:where()`/`:is()` with lowest/highest specificity respectively.

## 4. Responsive Design

- Media queries: `@media (min-width: ...)`, `@media (prefers-color-scheme: dark)`, `@media (prefers-reduced-motion: reduce)`.
- Mobile-first: base styles then `min-width` queries; adapt with `clamp()`, `minmax()`, `fr`, and aspect-ratio.
- Container queries (`@container`) let components respond to their own container size, not the viewport.

## 5. Typography, Colors, and Effects

- Typography: `font-family`, `font-size`, `line-height`, `font-weight`; `@font-face`/`font-display: swap` for webfonts.
- Colors: hex, `rgb()/rgba()`, `hsl()`, `lab()/oklch()`; custom properties centralize theming.
- Effects: `gradients`, `shadows`, `filters`, `backdrop-filter`; animation via `transition`/`@keyframes` (GPU-friendly transform/opacity for smoothness).

## 6. Performance and Maintainability

- Use **CSS custom properties** (variables) for tokens: `:root { --color-primary: ... }`.
- `content-visibility: auto`, `will-change` (sparingly), and `contain` reduce paint cost for heavy pages.
- Reduce specificity wars: BEM or utility classes keep the cascade predictable.
- Critical CSS inline; defer full stylesheets for long pages.

## 7. Modern Practices and Tools

- Know the newer syntax: `:has()`, `color-mix()`, `@layer`, logical shorthands.
- Preprocessors (`sass`/`less`) and CSS frameworks (`tailwind`, `bootstrap`) are layer on top — core CSS still matters.
- Linters (`stylelint`) and Autoprefixer/`lightningcss` keep code consistent and cross-browser.
- Test in Chrome/Firefox/Safari; use DevTools for cascade, layout, and paint profiling.

## 8. Common Pitfalls

- `!important`/high-specificity sneak attacks making overrides painful.
- `position: absolute` stacks without room; collapsing margins without `overflow` context.
- Neglecting `prefers-reduced-motion`/color contrast/accessibility.
- Non-performant animations (animating `width`/`height` instead of transforms).

## General Rules of Thumb

- Layout with Grid/Flexbox, spacing with logical properties + custom-property tokens.
- Mobile-first, responsive via `clamp()` where possible; container queries for component context.
- Keep specificity flat and low; rely on the cascade and layers.
- Design for motion, dark, and reduced-motion variants from the start.

## Quick-Start Checklist

- [ ] Reset/base layer: `box-sizing: border-box`, spacing/typography normalization.
- [ ] Define custom properties (colors, spacing, radii, type scale) in `:root`.
- [ ] Build responsive layout (Grid/Flexbox + media/container queries).
- [ ] Add dark theme + reduced-motion support.
- [ ] Verify accessibility: contrast, focus-visible, semantic, hit target sizes.
- [ ] Run `stylelint`; check with lighthouse/sample perf run.
- [ ] Keep specificity flat; avoid `!important` and inline styles.
