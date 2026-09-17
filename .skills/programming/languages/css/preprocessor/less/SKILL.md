---
name: "less"
description: "Less — CSS preprocessor with variables, nesting, mixins, and functions that compiles to plain CSS on Node.js and the browser."
tags:
  - "programming"
  - "language"
  - "css"
  - "preprocessor"
  - "less"
when_to_use: "Use when implementing, configuring, evaluating, or troubleshooting Less in a project."
prerequisites:
  - "Basic familiarity with CSS and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../sass/SKILL.md"
  - "../../SKILL.md"
  - "../../components/bootstrap/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---
Less is a **CSS preprocessor** that extends CSS with programming constructs — **variables, nesting, mixins, functions, and modularity** — compiling to plain, browser-ready CSS.

## 1. Installation and Setup

- Install: `npm install -g less` (CLI) or `less` as a devDependency for build pipelines.
- Compile: `lessc input.less output.css` (see `lessc --help` for all options).
- In-browser compile (development only): `<link rel="stylesheet/less" href="...">` + `<script src="less.min.js">`.
- Integrations: Webpack via `less-loader`, Vite via `vite-plugin-less`, or the `less` API in Node.

```bash
npm install -D less
npx lessc src/styles/index.less public/styles.css --source-map
```

## 2. Variables and Mixins

- Variables: `@brand: #4b8; .btn { color: @brand; }` (lazy evaluation, scoped).
- Mixins: reusable style blocks with arguments, defaults, and `;variadic(...)`:
  `.border-radius(@r: 4px) { border-radius: @r; }` then `.card { .border-radius(); }`.
- Namespace mixins and access properties via `#ns.mixin();` and use **guards** (`when`) for conditional rules.

```less
// variables.less
@brand: #4b8;
@space-3: 1rem;
@radius-md: 4px;
```

```less
// components/card.less
@import "variables.less";

.card-radius(@r: @radius-md) {
  border-radius: @r;
}

.card {
  .card-radius(8px);
  padding: @space-3;
  background: @brand;
}
```

```less
// guards pick the matching rule at compile time
.respond(@width) when (@width >= 768px) {
  display: grid;
  grid-template-columns: 16rem 1fr;
}

.respond(@width) when (@width < 768px) {
  display: block;
}

.page-layout {
  .respond(1024px);
}
```

## 3. Nesting and Selectors

- Nest selectors for readability; `&` refers to the current selector: `.nav { &-item { ... } &--active { ... } }`.
- Combine with media queries nested inside rules: `.card { @media (max-width: 600px) { ... } }`.
- Keep nesting shallow (≤ 3 levels) to limit specificity.

```less
.nav {
  display: flex;
  gap: 0.5rem;

  &.is-open {
    display: block;
  }

  &-item {
    padding: 0.25rem 0.5rem;
  }

  &--stacked {
    flex-direction: column;
  }
}
```

```less
.card {
  padding: 1.5rem;

  @media (max-width: 600px) {
    padding: 1rem;
  }
}
```

## 4. Functions and Operations

- Arithmetic: `@width: (100% / 3);` — works with compatible units.
- Built-ins: `lighten()`, `darken()`, `fade()`, `mix()`, `percentage()`, `math()`, `unit()`.
- Color functions and math make theming much easier than raw CSS.

```less
// Less 4 keeps maths only inside parentheses by default
@columns: 3;
@content-width: (100% / @columns);

.column {
  width: @content-width;
  background: lighten(@brand, 10%);
  border-color: fade(@brand, 40%);
  color: mix(@brand, #000, 80%);
}
```

## 5. Import and Modularity

- `@import "base.less"; @import "reset.less";` — use `@import (reference)` to pull in only definitions used.
- `@import (css)` for plain CSS files; `once` (default) prevents double-import.

```less
// index.less — single entry
@import "variables.less";
@import "mixins.less";

@import (reference) "vendor/bootstrap.less";
@import (css) "vendor/normalize.css";

@import "components/card.less";
@import "components/button.less";
```

## 6. Common Pitfalls

- Over-nesting causing high-specificity selectors that remove flexibility.
- Forgetting variable lazy-evaluation order (evaluated at last use).
- Mixing units in operations without conversion utilities.
- Compiling in production — always precompile before deploy; in-browser mode is dev-only.

```less
// Over-nesting: .card .card__title .card__icon is harder to override
.card {
  .card__title {
    .card__icon {
      color: @brand;
    }
  }
}

// Flat BEM keeps specificity at one class
.card__icon {
  color: @brand;
}
```

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
