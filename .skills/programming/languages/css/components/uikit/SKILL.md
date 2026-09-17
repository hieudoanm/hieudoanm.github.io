---
name: "uikit"
description: "UIkit — lightweight, modular front-end framework with components, layout primitives, and customizable Sass/JavaScript modules."
tags:
  - "programming"
  - "language"
  - "css"
  - "components"
  - "uikit"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting UIkit in a project."
prerequisites:
  - "Basic familiarity with CSS and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../bootstrap/SKILL.md"
  - "../materializecss/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
UIkit is a **lightweight modular front-end framework** with **modern layout primitives (flex/grid), a rich component library, and per-module Sass and JavaScript** you can theme and include selectively.

## 1. Installation and Setup

- CDN: `uikit` CSS/JS from CDN (unbundled builds for production).
- npm: `npm i uikit` — import `uikit/dist/css/uikit.css`, `uikit/dist/js/uikit.min.js` (+ `.uikit-icons.min.js` if using icons).
- Modular: `uikit/dist/js/uikit.js` and `uikit/dist/js/uikit-icons.js` allow selective `import { Icon } from 'uikit'`.

```bash
npm i uikit
```

```html
<link rel="stylesheet" href="/node_modules/uikit/dist/css/uikit.min.css" />
<script src="/node_modules/uikit/dist/js/uikit.min.js"></script>
<script src="/node_modules/uikit/dist/js/uikit-icons.min.js"></script>
```

## 2. Layout Primitives

- Flexbox utilities: `uk-flex`, `uk-flex-center`, `uk-flex-between`, `uk-flex-wrap`.
- Grid: `uk-grid`, `uk-grid-small/large`, `uk-child-width-*`, `uk-grid-divider`.
- Containers: `uk-container`, `uk-container-expand`; section modifiers (`uk-section`).

```html
<div class="uk-container">
  <div class="uk-grid-small uk-child-width-1-3@m" uk-grid>
    <div><div class="uk-card uk-card-body uk-card-primary">One</div></div>
    <div><div class="uk-card uk-card-body uk-card-primary">Two</div></div>
    <div><div class="uk-card uk-card-body uk-card-primary">Three</div></div>
  </div>
</div>
```

## 3. Components

- Elements: buttons (`uk-button-*`), badges, icons, labels, progress, cards, tables, forms.
- Complex: navbar, dropdown, modal, off-canvas, slider, tabs, accordion, lightbox, notification (`UIkit.notification`).
- Most components use `uk-*` attributes (`uk-toggle`, `uk-modal`, `uk-accordion`), minimal markup needed.

```html
<button class="uk-button uk-button-primary" uk-toggle="target: #demo-modal">
  Open modal
</button>

<div id="demo-modal" uk-modal>
  <div class="uk-modal-dialog uk-modal-body">
    <h2 class="uk-modal-title">Confirm</h2>
    <p>Publish the release?</p>
    <p class="uk-text-right">
      <button class="uk-button uk-button-default uk-modal-close" type="button">
        Cancel
      </button>
      <button class="uk-button uk-button-primary" type="button">Publish</button>
    </p>
  </div>
</div>

<ul uk-accordion>
  <li class="uk-open">
    <a class="uk-accordion-title" href>Step 1</a>
    <div class="uk-accordion-content"><p>Install dependencies.</p></div>
  </li>
  <li>
    <a class="uk-accordion-title" href>Step 2</a>
    <div class="uk-accordion-content"><p>Run the build.</p></div>
  </li>
</ul>
```

## 4. JavaScript and Initialization

- Components initialize automatically via data attributes (`uk-modal`, `uk-offcanvas`).
- Programmatic API: `UIkit.modal('.modal').show()`, `UIkit.offcanvas('.oc').toggle()`, etc.
- Options override: `UIkit.dropdown('.el', {pos: 'bottom-right'})`.

```javascript
// Programmatic control when data attributes are not enough
import UIkit from 'uikit';

const modal = UIkit.modal('#demo-modal');
modal.show();

UIkit.dropdown('.menu', { pos: 'bottom-right' });

UIkit.util.on('#demo-modal', 'hidden', () => {
  console.log('modal closed');
});
```

## 5. Theming and Customization

- Sass variables (`$global-color`, `$primary-*`, `$card-*`, etc.) to theme without CSS overrides.
- Compile only needed modules with a custom Sass build for a smaller bundle.
- Dark/light via variable sets and custom class overrides.

```scss
// 1. Your custom variables and variable overwrites
$global-link-color: #6d28d9;
$global-font-family: "Inter", system-ui, sans-serif;

// 2. Import default variables and available mixins
@import "uikit/src/scss/variables-theme.scss";
@import "uikit/src/scss/mixins-theme.scss";

// 3. Import UIkit
@import "uikit/src/scss/uikit-theme.scss";
```

## 6. Common Pitfalls

- Missing `uikit-icons` → icon glyphs don't render.
- Not importing required companion (e.g., `uikit.js` for interactions) → components stay inert.
- Treating UIkit as pure-CSS: most composites need JS initialized.

```html
<!-- Bad: icons render as empty spans without the icons script -->
<script src="/node_modules/uikit/dist/js/uikit.min.js"></script>

<!-- Good: include the icons build too -->
<script src="/node_modules/uikit/dist/js/uikit.min.js"></script>
<script src="/node_modules/uikit/dist/js/uikit-icons.min.js"></script>

<!-- Icons are then referenced via uk-icon -->
<span uk-icon="icon: plus; ratio: 1.4"></span>
```

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
