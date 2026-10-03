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

```bash
npm i -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p
```

```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

```css
/* src/index.css — v3 layers */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 2. Writing Utilities

- Layout: `flex`, `grid`, `p-*`, `m-*`, `w-*`, `h-*`, `gap-*`.
- Styling: `text-*` (color/size), `bg-*`, `border-*`, `rounded-*`, `shadow-*`.
- Variants: `hover:`, `focus:`, `active:`, `disabled:`, `responsive:` (`sm:`, `md:`, `lg:`, `xl`), dark mode (`dark:`).
- Arbitrary values: `top-[117px]`, `grid-cols-[200px,1fr]`, `bg-[#0af]`.

```html
<!-- mobile-first utilities, variants and arbitrary values in one pass -->
<div class="grid grid-cols-1 gap-6 p-4 md:grid-cols-3 md:gap-8 dark:bg-slate-900">
  <article class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md focus-within:ring-2 focus-within:ring-brand-500 dark:border-slate-700 dark:bg-slate-800">
    <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">Usage</h3>
    <p class="mt-1 text-sm text-slate-500">1,204 requests this week.</p>
    <span class="mt-3 inline-block rounded-full bg-brand-500/10 px-2 py-0.5 text-xs font-medium text-brand-600">+12%</span>
  </article>
  <aside class="col-start-2 top-[117px] bg-[#0af]">anything CSS can express</aside>
</div>
```

## 3. Theming and Config

- Extend default theme via `theme.extend` in config (colors, spacing, font sizes, breakpoints).
- Custom utilities via `plugin` + `addUtilities` or `@layer utilities`.
- Dark mode: toggle `class` strategy (`darkMode: 'class'`) for a manual `.dark` on `<html>` vs the default `media` (prefers-color-scheme).

```javascript
// tailwind.config.js
import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  safelist: ['bg-rose-500', 'text-rose-700'],
  theme: {
    extend: {
      colors: {
        brand: { 500: '#6d28d9', 600: '#5b21b6' },
        surface: '#ffffff',
      },
      spacing: { 18: '4.5rem' },
      fontSize: { 'display-lg': ['clamp(2rem, 1rem + 3vw, 3.5rem)', { lineHeight: '1.05' }] },
      screens: { '3xl': '1600px' },
    },
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        '.text-balance': { 'text-wrap': 'balance' },
        '.surface-card': { background: theme('colors.surface'), borderRadius: theme('borderRadius.xl') },
      });
    }),
  ],
};
```

```html
<!-- darkMode: 'class' — flip the class on <html> at runtime -->
<html class="dark">
  <body class="bg-surface text-slate-800 dark:bg-slate-900 dark:text-slate-100">
    <button class="rounded-lg bg-brand-500 px-4 py-2 text-white hover:bg-brand-600">Save</button>
  </body>
</html>
```

## 4. Components and Reuse

- Compose patterns with `@apply` inside `@layer components` for readable, tailwind-based components.
- Extract repeated groups with components (React components / Blade components) so markup stays clean.
- Purge/JIT ensures only used classes ship — keep `content` accurate.

```css
/* src/components.css — @apply belongs in the components layer */
@tailwind components;

@layer components {
  .summary-card {
    @apply grid gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm;
    @apply hover:shadow-md motion-safe:transition-shadow;
  }

  .summary-card__title {
    @apply text-lg font-semibold text-slate-900 dark:text-slate-100;
  }
}
```

## 5. Performance and Best Practices

- Do not use `@apply` inside the same file you write utilities for (`Layers` workaround) — apply it only in component layer.
- Avoid dynamic class strings like `text-${color}` — Tailwind can't inline-extract them (use full class names or safelist).
- Prefer small `@layer` for overrides; rely on JIT scan accuracy.

```tsx
// Bad: the JIT scanner cannot see an interpolated class, so nothing is emitted
const bad = <p className={`text-${status}-500`}>Overdue</p>;

// Good: every full class name exists as a literal string in the file
const statusTextColor = {
  active: 'text-emerald-500',
  overdue: 'text-rose-500',
} as const satisfies Record<Status, string>;

const good = <p className={statusTextColor[status]}>Overdue</p>;
```

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
