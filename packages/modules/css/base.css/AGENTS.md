# base.css Module — Agent Guide

Element-only base stylesheet. No classes, no scoping: every HTML tag gets neutral,
themeable defaults resolved through `--base-*` tokens, emitted inside `@layer base`
so consumers can layer component and utility styles on top at normal specificity.

## Commands

- `pnpm run build` — `prebuild` = `bash scripts/build.sh clean` (wipes `dist`), then
  `scripts/build.sh` compiles the single entry `src/base.scss` into `dist/base.css`
  (expanded) and `dist/base.min.css` (compressed), each with a source map. Then
  `postbuild` = `ts-node scripts/post-build.ts` writes `dist/base.metadata.json`
  (filename → `{ size: bytes, kb: kibibytes }`).
- `pnpm run lint` — `stylelint "src/**/*.scss"`. Must be clean before committing.
- `pnpm run format` — `prettier --cache --write .` (formats `.scss` and `.ts`).
- `pnpm run examples` — `ts-node scripts/examples.ts` renders `public/index.html` to
  full-page screenshots `public/images/base.light.png` and `base.dark.png` by emulating
  `prefers-color-scheme: light` and `dark`. Playwright is optional — when absent or
  without a cached Chromium install, the script warns and skips the images.

## Tokens and theming

Light values are the `:root` defaults; dark values are a `prefers-color-scheme: dark`
override in `src/core/_root.scss`. There is no theme-class mechanism — overriding a
token on any ancestor is the supported local tweak.

- Fonts: `--base-font-sans`, `--base-font-serif`, `--base-font-mono`
- Text: `--base-text`, `--base-text-muted`
- Surfaces: `--base-bg`, `--base-border`
- Brand: `--base-primary`, `--base-focus-ring` (resolves to `--base-primary`), `--base-mark-bg`
- Radii: `--base-radius-xs`, `--base-radius-sm`, `--base-radius`
- Elevation: `--base-shadow`

The dark block deliberately overrides only the six colour tokens. Fonts, radii, and
`--base-shadow` are shared across schemes.

## Layout

- `src/base.scss` — the only entry built. `@use 'base-core'` + `@include base-core.base-core`.
- `src/_base-core.scss` — `@use`s the 13 fragments and exposes `@mixin base-core`, which
  wraps them in a single `@layer base`. Nothing is emitted until the mixin is included.
- `src/core/_*.scss` — one plain `@mixin` per fragment. Nothing is emitted on `@use` alone.
  Inclusion order in `_base-core.scss` is the cascade order and is load-bearing:
  `root, reset, sectioning, headings, text, lists, blockquote, code, embedded, tables, forms, interactive, misc`.
- `public/index.html` — the element showcase (the `pnpm run examples` input).
- `scripts/build.sh` — Sass compile of `src/base.scss` into `dist/`.
- `scripts/post-build.ts` — writes `dist/base.metadata.json`.

## Linting

Stylelint config is shared by all three CSS modules at `../.stylelintrc.json`; there is no
module-local config. Three deviations from `stylelint-config-standard-scss` are deliberate:

- `scss/comment-no-empty` is off — a bare `//` line is used as a paragraph separator
  inside the file header comments.
- `property-no-vendor-prefix` is off — `-webkit-tap-highlight-color`,
  `-webkit-text-size-adjust`, and `-webkit-font-smoothing` are intentional.
- `value-keyword-case` ignores `font-family`/`font`/`font-synthesis` and the font names
  used inside the `--base-font-*` custom properties, because lower-casing a family name
  is wrong even though the rule cannot tell a family name from a keyword.

## Verification

After any change:

```sh
pnpm run lint && pnpm run build
```

Then confirm against the expanded output, which is the source of truth:

- `grep -c '@layer base' dist/base.css` → exactly `1`.
- `grep -n 'prefers-color-scheme: dark' dist/base.css` → exactly one dark block.
- Every token overridden in the dark block still exists in `:root` — a rename must land in both.
- `dist/base.css.map` and `dist/base.min.css.map` both exist (`post-build.ts` `stat()`s all
  four artifacts and fails the build if any is missing).

## Sass gotcha (verified with Dart Sass 1.105.0)

**Literal `rgb(R G B / A)` in a real property is re-serialized to legacy `rgba(r, g, b, a)`.**

```scss
.prop {
  box-shadow: 0 1px 2px rgb(0 0 0 / 5%);
} // emits box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
```

Sass parses that as a colour value and re-emits the comma form. Two places do **not** get
rewritten, because Sass passes them through untouched:

- **Custom property values** — `--base-shadow` and `--base-mark-bg` ship the modern
  space-separated syntax in `dist/base.css`.
- **Unknown functions** — every `color-mix(in srgb, …)` is emitted verbatim.

So the notation in the source deliberately differs from the notation in the output. That
is expected, not a bug: stylelint's `color-function-notation` governs source style, and
the compiler normalises real properties afterwards. Do not "fix" `rgba()` in `dist/`, and
do not add a post-processing step to reconcile the two.

## Conventions

- Match an existing fragment before writing a new one (same header comment, plain
  `@mixin name` shape, no nesting deeper than one block).
- Never hard-code a colour or radius in a fragment — add or reuse a `--base-*` token.
  Tokens consumed by a fragment must be defined in `_root.scss`, in both the `:root`
  defaults and the dark block when the value is scheme-dependent.
- Files stay under 200 lines. `_text.scss` is the largest at 115.
- Arrow functions only in `scripts/*.ts`.
- `scripts/examples.ts` locates Playwright by walking up from the module root for
  `node_modules/.pnpm/playwright@*/node_modules/playwright` — keep that discovery, do not
  add a hard dependency.
