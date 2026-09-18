---
name: daisyui
description: DaisyUI — Tailwind CSS component classes for rapid, accessible UI building with theming plugins and pure-class components.
---

DaisyUI is a **plugin for Tailwind CSS** that adds **`.btn`, `.card`, `.modal`, `.dropdown` and dozens of other component classes** — designed to be **themeable and accessible** with class-only usage and zero extra JS.

## 1. Setup and Installation

- Requirements: Tailwind CSS v3/v4.
- Install: `npm i daisyui` then add `require('daisyui')` to `tailwind.config.js` `plugins` (or `@plugin "daisyui"` for v4).
- Import `daisyui/dist/full.css` (or use JIT via class detection when enabled).

## 2. Component Classes

- Buttons: `btn btn-primary btn-outline btn-ghost btn-xs…btn-lg`, `btn-circle`.
- Layout: `card`, `navbar`, `drawer`, `menu`, `tabs (tab, tab-active, tab-content)`, `breadcrumbs`.
- Feedback: `alert alert-success`, `toast`, `modal`, `tooltip`, `loading`, `progress`.
- Forms: `input input-bordered`, `select`, `checkbox`, `radio`, `range`, `toggle`.

## 3. Theming and Dark Mode

- Prefix themes: `data-theme="light|dark|cupcake|cyberpunk|..."` on `<html>` for instant theming.
- When using Tailwind config, set `themes: ["light", "dark", ...]`; use `themes: false` to use a single dark/base theme.
- Custom theme: define colors per the DaisyUI color scale (base, content, primary, secondary, accent, neutral, info, success, warning, error).
- Dark mode: set `darkTheme: "dark"` and toggle `data-theme` / `class`.

## 4. Styling vs Tailwind

- Prefer DaisyUI component classes for standard UI pieces; use Tailwind utilities for spacing/layout details.
- DaisyUI is JIT-friendly: only classes you use are generated.
- Custom themes require CSS variables per color name (or use the config map).

## 5. Accessibility

- Most components carry correct ARIA; verify interactive elements have focus and keyboard semantics.
- Add `aria-label`s to icon-only buttons/`btn-circle`.

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
