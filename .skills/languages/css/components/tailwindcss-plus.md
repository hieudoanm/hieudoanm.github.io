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

## 2. Utilities and States

- Use classes: flexbox, grid, spacing (`p-4`, `m-2`), typography, colors, effects.
- Variants: `hover:`, `focus:`, `group-hover:`, `dark:`, `max-*`, `min-[…]:`.
- Arbitrary values keep full CSS power: `w-[calc(100%-1rem)]`, `grid-cols-[repeat(auto-fit,minmax(...))]`.

## 3. Responsive and Container Queries

- Breakpoints via `sm:`, `md:`, `lg:` customisable in `@theme`.
- **Container queries** (Plus/foundation): `@container` + `@md:` etc. — style a component based on its container width, not viewport.
- Combine container-aware sizing for highly modular UIs.

## 4. Dark Mode and Theming

- Dark mode: `dark:` variant (class or `prefers-color-scheme` per config).
- Theme multiple brands/variants with `@theme` variable sets + `@layer`.

## 5. Performance

- JIT: only used utilities are generated → tiny output vs old full builds.
- Use `@apply`/`@utility` to compose; keep purging active in production builds.

## 6. Common Pitfalls

- Mixing v3 config needs with v4 CSS-first (double configs confuse).
- Overuse of arbitrary values killing the design-token system.
- Forgetting `@layer` when overriding base styles with custom utilities.

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
