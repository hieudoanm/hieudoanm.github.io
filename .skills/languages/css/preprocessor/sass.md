---
name: sass
description: Sass — most mature CSS preprocessor with SCSS syntax, variables, nesting, mixins, functions, and modules, compiled via Dart Sass.
---

Sass is the **most mature and widely used CSS preprocessor**, extending CSS with **variables, nesting, partials, mixins, `@use`/modules, and math functions**, compiled to plain CSS by **Dart Sass** (the only official implementation).

## 1. Installation and Setup

- Modern setup: `npm install -D sass` (Dart Sass). Legacy: Ruby Sass (deprecated).
- Cli: `sass input.scss output.css`; watch mode: `sass --watch`.
- Bundlers: Vite (`vite-plugin-sass`), Webpack (`sass-loader`), and Node API via the `sass` package.

```bash
npm install -D sass
npx sass src/styles/index.scss public/styles.css --watch
```

## 2. Syntax: SCSS vs Sass

- **SCSS** (recommended): CSS-compatible syntax `@mixin`, `@use`, `.card { color: $color; }`.
- **Sass** (indented): significant whitespace, no braces/semicolons; legacy but still supported.
- Use SCSS for team familiarity and easier CSS diffing.

```scss
// components/_button.scss
@use "../tokens" as t;

.button {
  display: inline-flex;
  align-items: center;
  gap: t.$space-2;
  padding-inline: t.$space-3;
  border-radius: t.$radius-md;
  background: t.$color-primary;

  &:hover {
    filter: brightness(1.1);
  }

  &--ghost {
    background: transparent;
    border: 1px solid t.$color-primary;
  }
}
```

## 3. Variables, Maps, and Functions

- Variables: `$color: #4b8;` — scope per module/`{}`.
- Maps: `$breakpoints: (sm: 576px, md: 768px);` with `map-get($m, key)`, `map-merge`, iteration via `@each`.
- Functions: built-ins (`lighten`, `darken`, `mix`, `darken`, `pow`, etc.) and `@function` for custom logic.

```scss
// _tokens.scss
@use "sass:map";
@use "sass:math";

$color-primary: #6d28d9;
$space-3: 1rem;
$radius-md: 0.5rem;
$breakpoints: (sm: 576px, md: 768px, lg: 992px);

@function rem($px, $base: 16px) {
  @return math.div($px, $base) * 1rem;
}

@function bp($name) {
  @return map.get($breakpoints, $name);
}
```

## 4. Mixins and Include

- Reusable styles: `@mixin card($radius: 4px) { ... }` consumed with `@include card()`.
- Content blocks: `@content` inside mixins for slot-style overriding.
- Conditional inline `if()`/`@if` + loops (`@for`, `@each`, `@while`) for generating utility classes.

```scss
@use "../tokens" as t;

@mixin card($radius: t.$radius-md, $padding: t.$space-3) {
  padding: $padding;
  border-radius: $radius;
  background: t.$color-surface;

  @content;
}

.summary-card {
  @include card(t.$radius-md, t.rem(24px)) {
    border-inline-start: 4px solid t.$color-primary;
  }
}
```

```scss
// Generate spacing utilities from one scale
$spaces: (1: 0.25rem, 2: 0.5rem, 3: 1rem, 4: 1.5rem);

@each $key, $value in $spaces {
  .p-#{$key} {
    padding: $value;
  }

  .m-#{$key} {
    margin: $value;
  }
}
```

## 5. Nesting, `&`, and Extending

- `&` refers to the current selector context; common for BEM modifiers: `.btn &:hover`, `&--primary`.
- `@extend` inherits a selector's styles — prefer mixins over `@extend` (cleaner, no selector bloat).
- Beware nesting depth → specificity explosion; cap at 3 levels.

```scss
.field {
  display: grid;
  gap: 0.25rem;

  &__label {
    font-weight: 600;
  }

  &--invalid {
    .field__input {
      border-color: var(--color-danger);
    }
  }
}
```

## 6. Modules and Partials

- `_partial.scss` files get imported into another file with `@use 'file'` (namespaced).
- `@use 'colors' as *;` exposes members locally; `@forward` re-exports across a barrel.
- Avoid legacy `@import`: it injects globally, causes name collisions and duplicates.

```scss
// _index.scss — the only file the build compiles
@forward "tokens";
@use "components/button";
@use "components/card";
@use "components/field";
```

## 7. Media Queries and Breakpoints

- Nest media queries inside rules; Sass compiles them correctly to flat CSS.
- With maps: `@include respond-to('md') { ... }` via a mixin using `@media (min-width: map-get(...))`.
- Use `min-width` (mobile-first) and container-query support where sensible.

```scss
// _mixins.scss
@use "sass:map";
@use "tokens" as t;

@mixin respond-to($name) {
  @media (min-width: map.get(t.$breakpoints, $name)) {
    @content;
  }
}

.page-layout {
  display: grid;
  gap: t.$space-3;

  @include respond-to(md) {
    grid-template-columns: 16rem minmax(0, 1fr);
  }
}
```

## 8. Common Pitfalls

- Using legacy `@import` (global namespace pollution) instead of `@use`/`@forward`.
- Over-nesting/`@extend` chains that balloon specificity and output size.
- Mixing unit arithmetic without `strip-unit`/math helpers.
- Assuming media-query + variable values are interpolated everywhere (works in Dart Sass).

## General Rules of Thumb

- Structure: `_variables.scss`, `_mixins.scss`, `_functions.scss`, component partials, one barrel `@use`.
- Prefer mixins for reuse; keep nesting flat; use `@use`/`@forward` only.
- Generate utilities/responsive classes with loops + maps.
- Always precompile via the build tool; never ship sass in the browser.

## Quick-Start Checklist

- [ ] Install `sass` and wire into your bundler (Vite/webpack/CLI).
- [ ] Organize files: variables, mixins, functions, components, `index.scss`.
- [ ] Replace any legacy `@import` with `@use`/`@forward`.
- [ ] Standardize breakpoints in a `$breakpoints` map + `respond-to` mixin.
- [ ] Compile and inspect output size and selector specificity.
- [ ] Run a lint/format check (stylelint) on generated CSS.
