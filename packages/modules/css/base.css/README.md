# base.css

An element-only base stylesheet. Every HTML tag gets neutral, themeable defaults — no
classes, no scoping — emitted inside `@layer base` so a consumer can layer component and
utility styles on top at normal specificity. Light and dark are handled by
`prefers-color-scheme`, and every colour, radius, and font resolves through a `--base-*`
custom property, so a local tweak is one `var()` override rather than a second stylesheet.

```html
<link rel="stylesheet" href="dist/base.css" />
```

## Table of Contents

- [base.css](#basecss)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Theming](#theming)
    - [Design tokens](#design-tokens)
    - [Cascade layer](#cascade-layer)
  - [Build](#build)
  - [Lint](#lint)
  - [Examples](#examples)
  - [Layout](#layout)

---

## Usage

One stylesheet covers both schemes. The browser picks the palette from
`prefers-color-scheme`, so there is nothing to configure and no flash of the wrong theme.

### Theming

Dark is a `prefers-color-scheme: dark` override in `src/core/_root.scss`. It deliberately
re-observes only the six colour tokens — fonts, radii, and `--base-shadow` are shared
across both schemes.

To force a scheme regardless of system preference, override the tokens directly:

```css
:root {
  --base-bg: #101014;
  --base-text: #e5e5e8;
}
```

### Design tokens

Override any token on `:root` (or any ancestor) for a local tweak.

- Fonts: `--base-font-sans`, `--base-font-serif`, `--base-font-mono`
- Text: `--base-text`, `--base-text-muted`
- Surfaces: `--base-bg`, `--base-border`
- Brand: `--base-primary`, `--base-focus-ring`, `--base-mark-bg`
- Radii: `--base-radius-xs`, `--base-radius-sm`, `--base-radius`
- Elevation: `--base-shadow`

### Cascade layer

Everything is emitted inside `@layer base`. In a consumer that also uses Tailwind or
similar, declare the layer order once so utilities keep winning:

```css
@layer base, components, utilities;
```

## Build

```sh
pnpm run build
```

`prebuild` wipes `dist` (`bash scripts/build.sh clean`), then `scripts/build.sh` compiles
the single entry `src/base.scss` into `dist/base.css` (expanded) and `dist/base.min.css`
(compressed), each with a source map. Finally `ts-node scripts/post-build.ts` writes
`dist/base.metadata.json` (filename → `{ size: bytes, kb: kibibytes }`).

> Dart Sass re-serializes a literal `rgb(R G B / A)` in a real property back to the legacy
> `rgba(r, g, b, a)` form, so the notation in the source differs from the notation in the
> output. Custom property values and `color-mix()` are passed through untouched. See
> [AGENTS.md](./AGENTS.md#sass-gotcha-verified-with-dart-sass-11050) for the details.

## Lint

```sh
pnpm run lint
```

Runs `stylelint "src/**/*.scss"` against `stylelint-config-standard-scss`. The config is
shared with `md.css` and `tw.css` at [`../.stylelintrc.json`](../.stylelintrc.json); the
few deviations from the standard preset (empty comment lines, vendor prefixes, font-name
casing) are documented in [AGENTS.md](./AGENTS.md#linting).

## Examples

```sh
pnpm run examples
```

`ts-node scripts/examples.ts` renders the element showcase at `public/index.html` into
full-page screenshots `public/images/base.light.png` and `base.dark.png`, emulating each
`prefers-color-scheme`. Playwright is optional — when absent, or without a cached Chromium
install, the script warns and skips the images.

## Layout

- `src/base.scss` — the only entry built: `@use 'base-core'` + `@include base-core.base-core`.
- `src/_base-core.scss` — `@use`s the 13 fragments and exposes `@mixin base-core`, which
  wraps them in a single `@layer base`. Inclusion order is the cascade order.
- `src/core/_root.scss` — design tokens, the dark block, and document scaffolding.
- `src/core/_*.scss` — one plain `@mixin` per fragment: `reset`, `sectioning`, `headings`,
  `text`, `lists`, `blockquote`, `code`, `embedded`, `tables`, `forms`, `interactive`,
  `misc`. Nothing is emitted on `@use` alone.
- `public/index.html` — the element showcase, and the input to `pnpm run examples`.
- `scripts/build.sh` — Sass compile of `src/base.scss` into `dist/`.
- `scripts/post-build.ts` — writes `dist/base.metadata.json`.
