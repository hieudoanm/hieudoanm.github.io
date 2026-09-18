---
name: uikit
description: UIkit — lightweight, modular front-end framework with components, layout primitives, and customizable Sass/JavaScript modules.
---

UIkit is a **lightweight modular front-end framework** with **modern layout primitives (flex/grid), a rich component library, and per-module Sass and JavaScript** you can theme and include selectively.

## 1. Installation and Setup

- CDN: `uikit` CSS/JS from CDN (unbundled builds for production).
- npm: `npm i uikit` — import `uikit/dist/css/uikit.css`, `uikit/dist/js/uikit.min.js` (+ `.uikit-icons.min.js` if using icons).
- Modular: `uikit/dist/js/uikit.js` and `uikit/dist/js/uikit-icons.js` allow selective `import { Icon } from 'uikit'`.

## 2. Layout Primitives

- Flexbox utilities: `uk-flex`, `uk-flex-center`, `uk-flex-between`, `uk-flex-wrap`.
- Grid: `uk-grid`, `uk-grid-small/large`, `uk-child-width-*`, `uk-grid-divider`.
- Containers: `uk-container`, `uk-container-expand`; section modifiers (`uk-section`).

## 3. Components

- Elements: buttons (`uk-button-*`), badges, icons, labels, progress, cards, tables, forms.
- Complex: navbar, dropdown, modal, off-canvas, slider, tabs, accordion, lightbox, notification (`UIkit.notification`).
- Most components use `uk-*` attributes (`uk-toggle`, `uk-modal`, `uk-accordion`), minimal markup needed.

## 4. JavaScript and Initialization

- Components initialize automatically via data attributes (`uk-modal`, `uk-offcanvas`).
- Programmatic API: `UIkit.modal('.modal').show()`, `UIkit.offcanvas('.oc').toggle()`, etc.
- Options override: `UIkit.dropdown('.el', {pos: 'bottom-right'})`.

## 5. Theming and Customization

- Sass variables (`$global-color`, `$primary-*`, `$card-*`, etc.) to theme without CSS overrides.
- Compile only needed modules with a custom Sass build for a smaller bundle.
- Dark/light via variable sets and custom class overrides.

## 6. Common Pitfalls

- Missing `uikit-icons` → icon glyphs don't render.
- Not importing required companion (e.g., `uikit.js` for interactions) → components stay inert.
- Treating UIkit as pure-CSS: most composites need JS initialized.

## General Rules of Thumb

- Use data attributes for declarative components; call JS API for dynamic/multiple instances.
- Theme from Sass; cherry-pick modules into custom builds when bundle size matters.
- Test interactivity at multiple viewports.

## Quick-Start Checklist

- [ ] Add CSS + JS (+ icons JS) assets.
- [ ] Build layout: containers, flex/grid utilities, sections.
- [ ] Use components via `uk-*` attributes.
- [ ] Initialize via `UIkit.*` API where custom behavior is needed.
- [ ] Theme with Sass variables; keep bundle lean.
- [ ] Verify modal/offcanvas/slider on mobile.
