---
name: materializecss
description: Materialize — CSS framework implementing Google Material Design with components, grid, and JavaScript behaviors.
---

Materialize is an **open-source CSS framework implementing Google Material Design** for the web — a **12-column grid, ready components, JavaScript widgets, and Sass variables** aligned with the (Material Design 2-era) design language.

## 1. Setup and Installation

- CDN: include CSS + JS (choose the minified build from the official CDN).
- npm: `npm i materialize-css` (import CSS; add JS bundle manually).
- Sass: `@use "materialize-css/sass/materialize"` with variable overrides for theming.

```bash
npm i materialize-css
```

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
```

## 2. Grid and Layout

- 12-column **flexbox `row`/`col` grid** with breakpoints (s/m/l/xl).
- Utilities: `container`, `section`, `divider`, `valign-wrapper`, hide/show via `hide-on-*`.
- Offsets and push/pull for column reordering.

```html
<div class="container">
  <div class="row">
    <div class="col s12 m6 l4">
      <div class="card"><div class="card-content">Columns 1</div></div>
    </div>
    <div class="col s12 m6 l4">
      <div class="card"><div class="card-content">Columns 2</div></div>
    </div>
    <div class="col s12 m6 l4">
      <div class="card"><div class="card-content">Columns 3</div></div>
    </div>
  </div>
</div>
```

## 3. Components

- Typography, buttons (`btn`, `btn-flat`, `btn-floating`), cards, navbars, side nav, tabs.
- Forms: inputs with floating labels (`validate`, `label`), selects, switches, checkboxes/radios, range, datepickers.
- UI: modals, toasts (`M.toast`), tooltips, collapsibles, dropdowns, chips, carousels.

```html
<div class="card">
  <div class="card-image">
    <img src="/hero.jpg" alt="Release cover" />
    <span class="card-title">Release</span>
  </div>
  <div class="card-content"><p>Version 1.0 is out.</p></div>
  <div class="card-action"><a href="/changelog">Changelog</a></div>
</div>

<a class="waves-effect waves-light btn" href="/upload">
  <i class="material-icons left">cloud_upload</i>Upload
</a>
```

```html
<div class="row">
  <div class="input-field col s12 m6">
    <input id="email" type="email" class="validate" />
    <label for="email">Email</label>
  </div>
  <div class="input-field col s12 m6">
    <select>
      <option value="" disabled selected>Choose a plan</option>
      <option value="starter">Starter</option>
      <option value="team">Team</option>
    </select>
    <label>Plan</label>
  </div>
</div>
```

## 4. JavaScript Behaviors

- Initialize via `M.AutoInit()` for `data-*` attributes or call constructors manually.
- Examples: `M.Modal.init(el)`, `M.Sidenav.init(el)`, `M.Dropdown.init(el)`.
- Manual init gives control: options, hooks (e.g., `onOpenStart`, `onCloseEnd`).

```javascript
import M from 'materialize-css';

// Initialise every data-* widget at once
M.AutoInit();

// Or construct a single widget with options and hooks
const confirmModal = M.Modal.init(document.querySelector('#confirm'), {
  dismissible: false,
  onOpenEnd: () => console.log('opened'),
});

document.querySelector('#open').addEventListener('click', () => {
  confirmModal.open();
});
```

## 5. Theming and Icons

- Include Material Icons font (`material-icons` class) for iconography.
- Override variables (`$primary-color`, `$secondary-color`, `$roboto-font-family`) via Sass.
- Utilities provide color backgrounds/text and shadows (`z-depth-*`).

```scss
// Only `!default` variables can be configured
@use "materialize-css/sass/materialize" with (
  $primary-color: #6d28d9,
  $secondary-color: #f59e0b,
  $link-color: #2563eb,
  $font-stack: '"Inter", system-ui, sans-serif',
  $button-radius: 6px
);
```

```html
<!-- Colour helpers and elevation classes -->
<div class="card-panel teal lighten-4 z-depth-3">
  <span class="blue-text text-lighten-3">Highlighted</span>
  <i class="material-icons right amber-text darken-2">star</i>
</div>
```

## 6. Common Pitfalls

- Forgetting JS initialization → tabs/dropdowns don't open.
- Using outdated components (it's based on older Material Design).
- Self-size-dates and pickers needing explicit locale/options.

```html
<!-- Bad: CSS only, so tabs/sidenav/modals stay inert -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />

<!-- Good: load the bundle, then initialise -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => M.AutoInit());
</script>
```

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