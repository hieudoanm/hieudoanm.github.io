---
name: tailwindcss-plus
description: Tailwind CSS Plus — Tailwind CSS v4 with CSS-first configuration, container queries, and the plus-extended utilities palette.
---

Tailwind CSS Plus (v4+) is the **next-generation Tailwind**, moving configuration into **CSS-first `@theme`**, adding native **container queries**, and expanding the utility API for modern styling without `tailwind.config.js`.

## 1. Core: CSS-First Configuration

- Replace config file with `@import "tailwindcss";` and `@theme { ... }` in your CSS.
- Define tokens as CSS variables: `@theme { --color-brand: #4b8; --font-family-sans: ... }`
- `@theme` values become utilities automatically (`bg-brand`, `font-sans`, `text-*`).
- Legacy JS config still works via `@config` if you need extensions.

```bash
npm i tailwindcss @tailwindcss/vite
```

```css
/* src/app.css — the whole config now lives in CSS */
@import "tailwindcss";

@theme {
  --color-brand: oklch(55% 0.19 285);
  --color-brand-600: oklch(48% 0.19 285);
  --color-surface: oklch(100% 0 0);
  --font-sans: "Inter", system-ui, sans-serif;
  --spacing-18: 4.5rem;
  --breakpoint-md: 48rem;
}

/* Only when extending an existing v3 config */
@config "../../tailwind.config.js";

/* v4 defaults to prefers-color-scheme — opt into the class strategy explicitly */
@custom-variant dark (&:where(.dark, .dark *));
```

## 2. Utilities and States

- Use classes: flexbox, grid, spacing (`p-4`, `m-2`), typography, colors, effects.
- Variants: `hover:`, `focus:`, `group-hover:`, `dark:`, `max-*`, `min-[…]:`.
- Arbitrary values keep full CSS power: `w-[calc(100%-1rem)]`, `grid-cols-[repeat(auto-fit,minmax(...))]`.

```html
<!-- theme tokens, group variants and arbitrary values side by side -->
<div class="grid grid-cols-[200px,1fr] gap-[117px] bg-[#0af] md:grid-cols-3 md:gap-8">
  <article class="group rounded-xl border border-slate-200 bg-surface p-4 shadow-sm transition hover:shadow-md">
    <h3 class="text-lg font-semibold text-slate-900 group-hover:text-brand">Usage</h3>
    <p class="mt-1 text-sm text-slate-500">1,204 requests this week.</p>
    <span class="mt-3 inline-block rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">+12%</span>
  </article>
</div>
```

## 3. Responsive and Container Queries

- Breakpoints via `sm:`, `md:`, `lg:` customisable in `@theme`.
- **Container queries** (Plus/foundation): `@container` + `@md:` etc. — style a component based on its container width, not viewport.
- Combine container-aware sizing for highly modular UIs.

```html
<!-- @container scopes the query; @md:/@xl: react to the container, not the viewport -->
<div class="@container">
  <div class="grid grid-cols-1 gap-4 @md:grid-cols-[12rem_1fr] @xl:grid-cols-[16rem_1fr]">
    <img class="aspect-square w-full rounded-lg object-cover" src="/chart.png" alt="" />
    <div class="min-w-0">
      <h3 class="truncate text-base font-semibold">Weekly active teams</h3>
      <p class="text-sm text-slate-500">Same markup inside a sidebar or full page.</p>
    </div>
  </div>
</div>
```

## 4. Dark Mode and Theming

- Dark mode: `dark:` variant (class or `prefers-color-scheme` per config).
- Theme multiple brands/variants with `@theme` variable sets + `@layer`.

```css
@layer base {
  body {
    background: var(--color-surface);
  }
}

@layer utilities {
  .bg-brand-muted {
    background: color-mix(in oklab, var(--color-brand) 12%, transparent);
  }
}
```

```html
<html class="dark">
  <body class="bg-surface text-slate-800 dark:bg-slate-900 dark:text-slate-100">
    <button class="rounded-lg bg-brand px-4 py-2 text-white hover:bg-brand-600">Save</button>
  </body>
</html>
```

## 5. Performance

- JIT: only used utilities are generated → tiny output vs old full builds.
- Use `@apply`/`@utility` to compose; keep purging active in production builds.

```css
/* @utility registers a first-class utility, variants work on it for free */
@utility card-surface {
  border-radius: 0.75rem;
  border: 1px solid color-mix(in oklab, var(--color-slate-200) 80%, transparent);
  background: var(--color-surface);
  box-shadow: 0 1px 2px color-mix(in oklab, var(--color-slate-900) 8%, transparent);
}

@utility text-balance {
  text-wrap: balance;
}
```

## 6. Common Pitfalls

- Mixing v3 config needs with v4 CSS-first (double configs confuse).
- Overuse of arbitrary values killing the design-token system.
- Forgetting `@layer` when overriding base styles with custom utilities.

```html
<!-- Bad: arbitrary values everywhere erodes the token system -->
<div class="mt-[13px] rounded-[7px] text-[#6d28d9]">Overdue</div>

<!-- Good: theme tokens, then the registered custom utility -->
<div class="mt-4 rounded-xl text-brand card-surface">Overdue</div>
```

## General Rules of Thumb

- Define brand tokens in `@theme`; use utilities for layout/composition.
- Reach for container queries for component-level responsiveness.
- Keep custom utilities via `@utility` rather than global classes.

## Quick-Start Checklist

- [ ] `npm i tailwindcss` and import `@import "tailwindcss";` in CSS.
- [ ] Declare `@theme` tokens (colors, fonts, spacing) — no config file needed.
- [ ] Build UI with utilities + variants.
- [ ] Add container queries for component-responsive layouts.
- [ ] Configure dark mode and verify variants.
- [ ] Build to confirm small output and no missing classes.
