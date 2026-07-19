---
name: "daisyui"
description: "DaisyUI — Tailwind CSS component classes for rapid, accessible UI building with theming plugins and pure-class components."
tags:
  - "programming"
  - "language"
  - "css"
  - "components"
  - "daisyui"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting DaisyUI in a project."
prerequisites:
  - "Basic familiarity with CSS and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../../SKILL.md"
  - "../bootstrap/SKILL.md"
  - "../tailwindcss-plus/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
DaisyUI is a **plugin for Tailwind CSS** that adds **`.btn`, `.card`, `.modal`, `.dropdown` and dozens of other component classes** — designed to be **themeable and accessible** with class-only usage and zero extra JS.

## 1. Setup and Installation

- Requirements: Tailwind CSS v3/v4.
- Install: `npm i daisyui` then add `require('daisyui')` to `tailwind.config.js` `plugins` (or `@plugin "daisyui"` for v4).
- Import `daisyui/dist/full.css` (or use JIT via class detection when enabled).

```bash
npm i -D daisyui
```

```javascript
// tailwind.config.js (daisyUI v4 + Tailwind v3)
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
    darkTheme: 'dark',
  },
};
```

## 2. Component Classes

- Buttons: `btn btn-primary btn-outline btn-ghost btn-xs…btn-lg`, `btn-circle`.
- Layout: `card`, `navbar`, `drawer`, `menu`, `tabs (tab, tab-active, tab-content)`, `breadcrumbs`.
- Feedback: `alert alert-success`, `toast`, `modal`, `tooltip`, `loading`, `progress`.
- Forms: `input input-bordered`, `select`, `checkbox`, `radio`, `range`, `toggle`.

```html
<div class="navbar bg-base-100 shadow-sm">
  <a class="btn btn-ghost text-xl">Acme</a>
  <nav class="menu menu-horizontal px-1">
    <li><a class="active">Dashboard</a></li>
    <li><a>Projects</a></li>
  </nav>
</div>

<div class="card bg-base-100 w-96 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Deploy to production?</h2>
    <p>This will roll out the latest build to all users.</p>
    <div class="card-actions justify-end">
      <button class="btn btn-ghost">Cancel</button>
      <button class="btn btn-primary">Deploy</button>
    </div>
  </div>
</div>
```

```html
<form class="flex flex-col gap-3 max-w-sm">
  <input class="input input-bordered" type="email" placeholder="Email" />
  <select class="select select-bordered">
    <option disabled selected>Choose a plan</option>
    <option>Starter</option>
    <option>Team</option>
  </select>
  <label class="label cursor-pointer">
    <span class="label-text">Enable alerts</span>
    <input class="toggle toggle-primary" type="checkbox" checked />
  </label>
</form>
```

## 3. Theming and Dark Mode

- Prefix themes: `data-theme="light|dark|cupcake|cyberpunk|..."` on `<html>` for instant theming.
- When using Tailwind config, set `themes: ["light", "dark", ...]`; use `themes: false` to use a single dark/base theme.
- Custom theme: define colors per the DaisyUI color scale (base, content, primary, secondary, accent, neutral, info, success, warning, error).
- Dark mode: set `darkTheme: "dark"` and toggle `data-theme` / `class`.

```html
<!-- Switch the whole app by setting data-theme on <html> -->
<html data-theme="dark">
  <body class="bg-base-100 text-base-content">
    <button class="btn btn-primary">Dark by default</button>
  </body>
</html>
```

```javascript
// tailwind.config.js — a custom theme on the DaisyUI color scale
module.exports = {
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        brand: {
          primary: '#6d28d9',
          'primary-content': '#ffffff',
          secondary: '#f59e0b',
          accent: '#0ea5e9',
          neutral: '#1f2937',
          'base-100': '#ffffff',
          info: '#38bdf8',
          success: '#22c55e',
          warning: '#facc15',
          error: '#ef4444',
        },
      },
      'dark',
    ],
    darkTheme: 'dark',
  },
};
```

## 4. Styling vs Tailwind

- Prefer DaisyUI component classes for standard UI pieces; use Tailwind utilities for spacing/layout details.
- DaisyUI is JIT-friendly: only classes you use are generated.
- Custom themes require CSS variables per color name (or use the config map).

## 5. Accessibility

- Most components carry correct ARIA; verify interactive elements have focus and keyboard semantics.
- Add `aria-label`s to icon-only buttons/`btn-circle`.

```html
<button class="btn btn-circle btn-ghost" aria-label="Open settings">
  <svg viewBox="0 0 24 24" class="size-5" aria-hidden="true">
    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
  </svg>
</button>
```

## 6. Common Pitfalls

- Forgetting to register the plugin → classes not generated.
- Mixing theme prefixes without defining them (errors).
- Overwriting brand tokens after a theme — prefer editing a custom theme config.

## General Rules of Thumb

- Use DaisyUI for complete components; Tailwind utilities for one-off tweaks.
- Register themes explicitly; designate one `darkTheme`.
- Verify interactive markup (keyboard/focus) when using modal, drawer, dropdown.

## Quick-Start Checklist

- [ ] Install and register the plugin in Tailwind config.
- [ ] Define themes (or use built-ins) and pick default + dark.
- [ ] Build UI with component/utility classes.
- [ ] Add aria + interaction statements for toggles/modals.
- [ ] Test JIT output size; confirm classes generated.
