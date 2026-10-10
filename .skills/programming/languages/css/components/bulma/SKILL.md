---
name: "bulma"
description: "Bulma — free, open-source CSS framework based on flexbox with minimal setup and a simple, modern aesthetic."
tags:
  - "programming"
  - "language"
  - "css"
  - "components"
  - "bulma"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting Bulma in a project."
prerequisites:
  - "Basic familiarity with CSS and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../bootstrap/SKILL.md"
  - "../daisyui/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
Bulma is a **free, modern CSS framework built on flexbox** — an **output-ready styling layer** providing layout primitives (columns), components (cards, forms, modals), and utilities without JavaScript.

## 1. Installation and Setup

- CDN: include `bulma` CSS from CDN in HTML.
- npm: `npm i bulma` — import `bulma.min.css` in your JS/CSS entry.
- Load only what you need with the Sass modules (`bulma/sass/...`) if you build with Sass.

```bash
npm i bulma
```

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css"
/>
```

## 2. Layout Primitives

- Columns: `.columns` / `.column` flexbox grid; size via `.is-1`…`.is-12`, offsets `.is-offset-*`.
- Next: containers `.container`, sections `.section`, and spacing helpers.
- Multi-line auto-fit: `.columns.is-multiline` + per-column widths.

```html
<div class="container">
  <div class="columns is-multiline is-variable is-4">
    <div class="column is-4">
      <div class="box">Column one</div>
    </div>
    <div class="column is-4">
      <div class="box">Column two</div>
    </div>
    <div class="column is-4">
      <div class="box">Column three</div>
    </div>
  </div>
</div>
```

## 3. Components

- Elements: buttons (`.button.is-primary`), forms, icons, boxes, tables, `notification`, `tag`.
- Components: `card`, `navbar` (with burger toggle), `tabs`, `modal`, `message`, `dropdown`, `breadcrumb`, `pagination`.
- Most components are pure CSS: JavaScript needed only for interactive behaviors (navbar burger, dropdowns).

```html
<nav class="navbar is-primary" role="navigation" aria-label="Main">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">Acme</a>
    <a
      role="button"
      class="navbar-burger"
      aria-label="Toggle menu"
      aria-expanded="false"
      data-target="mainNav"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="mainNav" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">Docs</a>
      <a class="navbar-item">Pricing</a>
    </div>
  </div>
</nav>
```

## 4. Helpers/Utilities

- Spacing: `m-*`, `p-*`, `mb-*`, `mt-*` scale.
- Text/color helpers, `is-flex`, `is-hidden-*` responsive toggles.
- Modifiers: `is-*` style variants (colors, sizes, states).

```html
<div
  class="is-flex is-justify-content-space-between is-align-items-center p-4 has-background-primary has-text-white"
>
  <span class="title is-5 has-text-white">Team plan</span>
  <button class="button is-white is-outlined">Upgrade</button>
</div>
```

## 5. Customization

- Theme from variables by compiling the Sass (`$primary`, `$link`, `$family-sans-serif`, etc.).
- Use modular Sass (`@use "bulma/sass"`) to import only needed components.
- Consider `bulma-prefers-dark` or custom dark variable sets for dark themes.

```scss
// Compile the full framework with your tokens
@use "bulma/sass" with (
  $primary: #6d28d9,
  $link: #2563eb,
  $family-primary: '"Inter", system-ui, sans-serif',
  $radius: 0.5rem
);
```

```scss
// Or import only the modules you use
@use "bulma/sass/utilities" with ($primary: #6d28d9);
@use "bulma/sass/base";
@use "bulma/sass/elements/button";
@use "bulma/sass/components/card";
@use "bulma/sass/layout/section";
```

```html
<!-- Bulma 1.x ships both system preference and explicit theme support -->
<html data-theme="dark">
  <body class="has-background-black has-text-white">
    <button class="button is-primary">Themed</button>
  </body>
</html>
```

## 6. Common Pitfalls

- Assuming all components are interactive without adding the needed JS (modals/burger).
- Over-relying on the default look for strong brand identity.
- Importing the full CSS when you only need parts.

```javascript
// Bulma is CSS-only: wire the navbar burger (and other toggles) yourself
const burger = document.querySelector('.navbar-burger');
const menu = document.getElementById(burger.dataset.target);

burger.addEventListener('click', () => {
  burger.classList.toggle('is-active');
  menu.classList.toggle('is-active');
});
```

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
