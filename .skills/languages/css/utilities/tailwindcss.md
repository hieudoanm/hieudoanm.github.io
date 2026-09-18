---
name: tailwindcss
description: Tailwind CSS — utility-first CSS framework for rapidly building custom UIs without leaving your HTML.
---

Tailwind CSS is a **utility-first CSS framework** that lets you build **arbitrary, bespoke designs directly in markup** using low-level utility classes, with **JIT compilation, theming via config, and zero component opinions**.

## 1. Installation and Setup (v3)

- Install: `npm i -D tailwindcss postcss autoprefixer`, `npx tailwindcss init -p`.
- Configure `content` globs in `tailwind.config.js` to watch your source files for class extraction.
- Add `@tailwind base; @tailwind components; @tailwind utilities;` to your CSS entry.
- PostCSS plugin ties it into the build (`postcss.config.js → tailwindcss + autoprefixer`).

## 2. Writing Utilities

- Layout: `flex`, `grid`, `p-*`, `m-*`, `w-*`, `h-*`, `gap-*`.
- Styling: `text-*` (color/size), `bg-*`, `border-*`, `rounded-*`, `shadow-*`.
- Variants: `hover:`, `focus:`, `active:`, `disabled:`, `responsive:` (`sm:`, `md:`, `lg:`, `xl`), dark mode (`dark:`).
- Arbitrary values: `top-[117px]`, `grid-cols-[200px,1fr]`, `bg-[#0af]`.

## 3. Theming and Config

- Extend default theme via `theme.extend` in config (colors, spacing, font sizes, breakpoints).
- Custom utilities via `plugin` + `addUtilities` or `@layer utilities`.
- Dark mode: toggle `class` strategy (`darkMode: 'class'`) for a manual `.dark` on `<html>` vs the default `media` (prefers-color-scheme).

## 4. Components and Reuse

- Compose patterns with `@apply` inside `@layer components` for readable, tailwind-based components.
- Extract repeated groups with components (React components / Blade components) so markup stays clean.
- Purge/JIT ensures only used classes ship — keep `content` accurate.

## 5. Performance and Best Practices

- Do not use `@apply` inside the same file you write utilities for (`Layers` workaround) — apply it only in component layer.
- Avoid dynamic class strings like `text-${color}` — Tailwind can't inline-extract them (use full class names or safelist).
- Prefer small `@layer` for overrides; rely on JIT scan accuracy.

## 6. Common Pitfalls

- Missing `content` globs → classes silently dropped in production.
- Dynamic/concatenated class names break extraction.
- Overriding with CSS specificity fights instead of using config/theme.
- Forgetting dark-mode variant toggling setup (`class` vs `media`).

## General Rules of Thumb

- Design tokens live in `theme.extend`; markup carries utilities only.
- Extract repeated UI as components (not CSS classes with `@apply` everywhere).
- Keep class lists deliberate; let JIT remove what you don't use.

## Quick-Start Checklist

- [ ] Install + configure `content` globs + PostCSS.
- [ ] Define brand colors/fonts in `theme.extend`.
- [ ] Build the UI with utilities and variants in markup.
- [ ] Extract repeated patterns into components.
- [ ] Configure dark mode strategy appropriately.
- [ ] Build prod; verify output size and class coverage.
