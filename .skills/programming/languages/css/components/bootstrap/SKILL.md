---
name: "bootstrap"
description: "Bootstrap — the most widely used CSS framework with responsive grid, utilities, components, and Sass-based theming."
tags:
  - "programming"
  - "language"
  - "css"
  - "components"
  - "bootstrap"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting Bootstrap in a project."
prerequisites:
  - "Basic familiarity with CSS and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../bulma/SKILL.md"
  - "../daisyui/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
Bootstrap is the **most widely used open-source CSS framework**, providing a **responsive grid system, ready-made components, JavaScript plugins, and a utility API**, themable through Sass variables and maps.

## 1. Installation and Setup

- CDN (quick start): `<link>` CSS + `<script>` bundle for components needing JS.
- npm: `npm i bootstrap` — import `bootstrap/dist/css/bootstrap.min.css` and the JS bundle.
- Sass theming: import `bootstrap/scss/_functions.scss`, `_variables.scss`, then override variables before importing the rest.
- For React: use `react-bootstrap` components; for Angular, `ng-bootstrap`.

```bash
npm i bootstrap
```

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
```

## 2. Grid System and Layout

- 12-column flexbox-based grid: `.container`, `.container-fluid`, `.row`, `.col`, `.col-md-6` etc.
- Breakpoints: `xs`, `sm`, `md`, `lg`, `xl`, `xxl` (576/768/992/1200/1400px).
- Utility classes for layout: `d-flex`, `justify-content-*`, `align-items-*`, `gap-*`, `order-*`.
- CSS Grid option: Bootstrap 5 provides `g-*` gutter and `row-cols-*` for equal-width auto columns.

```html
<div class="container">
  <div class="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
    <div class="col">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Starter</h5>
          <p class="card-text">For side projects.</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 3. Components

- Buttons, alerts, badges, cards, navs/navbar, forms, dropdowns, modals, toasts, tooltips, popovers, carousel.
- Interaction components require JS: initialize with `data-bs-*` attributes for simplicity.
- Accessibility: many components ship with ARIA roles; verify contrast and keyboard support.

```html
<!-- data-bs-* attributes initialise plugins without writing JS -->
<div class="dropdown">
  <button
    class="btn btn-primary dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Actions
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="/settings">Settings</a></li>
    <li><a class="dropdown-item text-danger" href="/delete">Delete</a></li>
  </ul>
</div>

<button
  class="btn btn-outline-secondary"
  data-bs-toggle="modal"
  data-bs-target="#confirmModal"
>
  Open modal
</button>
```

## 4. Utilities and Theming

- Rich utility classes: spacing (`m-*`, `p-*`), text (`text-*`), color (`text-primary`, `bg-*`), borders, shadows, opacity.
- Customize via Sass variables (colors, spacing scale, border-radius) and `$utilities` map.
- `--bs-*` CSS custom properties power runtime theming (e.g., `--bs-primary`).
- Dark mode: `.text-bg-dark`, `data-bs-theme="dark"` (Bootstrap 5.3+).

```scss
// 1. Functions first so overrides can use them
@import "bootstrap/scss/functions";

// 2. Your overrides
$primary: #6d28d9;
$border-radius: 0.5rem;
$font-family-sans-serif: "Inter", system-ui, sans-serif;

// 3. Default maps, then Bootstrap
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/bootstrap";
```

```html
<!-- Bootstrap 5.3 runtime theming via --bs-* custom properties -->
<html data-bs-theme="dark">
  <body class="bg-body text-body">
    <button class="btn btn-primary">Themed button</button>
  </body>
</html>

<style>
  .pricing-card {
    --bs-card-border-color: var(--bs-primary);
    --bs-card-border-width: 2px;
  }
</style>
```

## 5. Common Pitfalls

- Importing JS but missing Popper for tooltips/popovers.
- Overriding components by hacky class overrides instead of Sass variables.
- Neglecting responsiveness on custom content (fixed widths outside grid).
- Conflict between Bootstrap and existing CSS (order/layer management).

```html
<!-- Bad: bootstrap.js alone leaves tooltips/popovers without Popper -->
<script src="bootstrap/dist/js/bootstrap.js"></script>

<!-- Good: the bundle ships Bootstrap + Popper together -->
<script src="bootstrap/dist/js/bootstrap.bundle.min.js"></script>
```

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
