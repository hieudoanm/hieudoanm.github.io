---
name: less
description: Less — CSS preprocessor with variables, nesting, mixins, and functions that compiles to plain CSS on Node.js and the browser.
---

Less is a **CSS preprocessor** that extends CSS with programming constructs — **variables, nesting, mixins, functions, and modularity** — compiling to plain, browser-ready CSS.

## 1. Installation and Setup

- Install: `npm install -g less` (CLI) or `less` as a devDependency for build pipelines.
- Compile: `lessc input.less output.css` (see `lessc --help` for all options).
- In-browser compile (development only): `<link rel="stylesheet/less" href="...">` + `<script src="less.min.js">`.
- Integrations: Webpack via `less-loader`, Vite via `vite-plugin-less`, or the `less` API in Node.

## 2. Variables and Mixins

- Variables: `@brand: #4b8; .btn { color: @brand; }` (lazy evaluation, scoped).
- Mixins: reusable style blocks with arguments, defaults, and `;variadic(...)`:
  `.border-radius(@r: 4px) { border-radius: @r; }` then `.card { .border-radius(); }`.
- Namespace mixins and access properties via `#ns.mixin();` and use **guards** (`when`) for conditional rules.

## 3. Nesting and Selectors

- Nest selectors for readability; `&` refers to the current selector: `.nav { &-item { ... } &--active { ... } }`.
- Combine with media queries nested inside rules: `.card { @media (max-width: 600px) { ... } }`.
- Keep nesting shallow (≤ 3 levels) to limit specificity.

## 4. Functions and Operations

- Arithmetic: `@width: (100% / 3);` — works with compatible units.
- Built-ins: `lighten()`, `darken()`, `fade()`, `mix()`, `percentage()`, `math()`, `unit()`.
- Color functions and math make theming much easier than raw CSS.

## 5. Import and Modularity

- `@import "base.less"; @import "reset.less";` — use `@import (reference)` to pull in only definitions used.
- `@import (css)` for plain CSS files; `once` (default) prevents double-import.

## 6. Common Pitfalls

- Over-nesting causing high-specificity selectors that remove flexibility.
- Forgetting variable lazy-evaluation order (evaluated at last use).
- Mixing units in operations without conversion utilities.
- Compiling in production — always precompile before deploy; in-browser mode is dev-only.

## General Rules of Thumb

- Extract colors/spacing/typography into variables; reuse via mixins over repetition.
- Keep nesting flat; use `&` for state, element, and modifier naming.
- Precompile in the build pipeline; never ship less.js in production.

## Quick-Start Checklist

- [ ] Configure `less-loader`/plugin for your bundler.
- [ ] Define a `variables.less` file with the theme tokens.
- [ ] Write component `.less` files with flat nesting and reusable mixins.
- [ ] Set up `@import` ordering (variables → mixins → components).
- [ ] Compile and lint output; verify in DevTools.
- [ ] Confirm final CSS matches expected size/specificity.
