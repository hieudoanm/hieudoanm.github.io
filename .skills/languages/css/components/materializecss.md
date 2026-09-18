---
name: materializecss
description: Materialize — CSS framework implementing Google Material Design with components, grid, and JavaScript behaviors.
---

Materialize is an **open-source CSS framework implementing Google Material Design** for the web — a **12-column grid, ready components, JavaScript widgets, and Sass variables** aligned with the (Material Design 2-era) design language.

## 1. Setup and Installation

- CDN: include CSS + JS (choose the minified build from the official CDN).
- npm: `npm i materialize-css` (import CSS; add JS bundle manually).
- Sass: `@use "materialize-css/sass/materialize"` with variable overrides for theming.

## 2. Grid and Layout

- 12-column **flexbox `row`/`col` grid** with breakpoints (s/m/l/xl).
- Utilities: `container`, `section`, `divider`, `valign-wrapper`, hide/show via `hide-on-*`.
- Offsets and push/pull for column reordering.

## 3. Components

- Typography, buttons (`btn`, `btn-flat`, `btn-floating`), cards, navbars, side nav, tabs.
- Forms: inputs with floating labels (`validate`, `label`), selects, switches, checkboxes/radios, range, datepickers.
- UI: modals, toasts (`M.toast`), tooltips, collapsibles, dropdowns, chips, carousels.

## 4. JavaScript Behaviors

- Initialize via `M.AutoInit()` for `data-*` attributes or call constructors manually.
- Examples: `M.Modal.init(el)`, `M.Sidenav.init(el)`, `M.Dropdown.init(el)`.
- Manual init gives control: options, hooks (e.g., `onOpenStart`, `onCloseEnd`).

## 5. Theming and Icons

- Include Material Icons font (`material-icons` class) for iconography.
- Override variables (`$primary-color`, `$secondary-color`, `$roboto-font-family`) via Sass.
- Utilities provide color backgrounds/text and shadows (`z-depth-*`).

## 6. Common Pitfalls

- Forgetting JS initialization → tabs/dropdowns don't open.
- Using outdated components (it's based on older Material Design).
- Self-size-dates and pickers needing explicit locale/options.

## General Rules of Thumb

- Use data attributes or `M.AutoInit()` for auth-free demos; construct manually for control.
- Theme via Sass variables; class RGB helpers cover most needs.
- Keep brand on top of the Material grid for coherence.

## Quick-Start Checklist

- [ ] Add CSS + JS assets; include Material Icons (if used).
- [ ] Build layout using the grid; add components.
- [ ] Initialize widgets `M.AutoInit()` (or constructors).
- [ ] Theme key colors via Sass overrides.
- [ ] Verify modal/sidenav/dropdown/datepickers behave at viewports.