# TailwindSCSS Module — Agent Guide

## Build

- `pnpm run build` — runs `bash scripts/build.sh` (with `prebuild` = `bash scripts/build.sh clean` wiping `dist` beforehand). The script `mkdir -p dist/nano dist/micro dist/lite dist/standard dist/full` and compiles every tier entry to `dist/<tier>/` (expanded + compressed `.min` CSS + source maps): `src/tailwind.nano.scss` → `dist/nano/tailwind.nano(.min).css`, `src/tailwind.micro.scss` → `dist/micro/tailwind.micro(.min).css`, `src/tailwind.lite.scss` → `dist/lite/tailwind.lite(.min).css`, `src/tailwind.standard.scss` → `dist/standard/tailwind.standard(.min).css`, `src/tailwind.scss` → `dist/full/tailwind(.min).css`. Then `ts-node scripts/post-build.ts` writes `dist/metadata.json` shaped like `metadata.schema.json` (tier → filename → `{ size: bytes, kb: kibibytes }`).
- Tier ladder (each a strict superset): `nano ⊂ micro ⊂ lite ⊂ standard ⊂ full`.
  - **nano** = skeleton: layout basics (box-sizing, display, float, clear, position, inset, z-index, overflow, visibility), margin/padding, borders (color/radius/style/width), bg color/image, core typography (family, size, style, weight, line-height, align, color, vertical-align, white-space), opacity, w/h, flex core, grid-cols, gap, cursor.
  - **micro** = nano + full backgrounds, blend modes, box/text shadow, full flexgrid (incl. place-*), form colors (accent/caret/color-scheme/appearance), pointer-events/resize/touch-action/user-select, aspect-ratio/isolation/object-fit/position, logical & min/max sizing, tables, transitions, 2D transforms, full typography.
  - **lite** = micro + filters (`filter-*`), scroll-behavior, scroll-snap-_, scrollbar(-gutter), break-_, columns, box-decoration-break, overscroll-behavior.
  - **standard** = lite + masks (`mask-*`), backdrop filters (`backdrop-*`), field-sizing, will-change.
  - **full** = standard + scroll-margin, scroll-padding, perspective/perspective-origin/transform-style, backface-visibility, zoom.
- Verify changes: rebuild, then `grep -nE '^\.<utility> ' dist/tailwind.css` for representative selectors. The expanded output is the source of truth. When tier membership changes, re-check boundaries in `dist/tailwind.nano.css`, `tailwind.micro.css`, `tailwind.lite.css`, `tailwind.standard.css`.

## Layout

- Entry `src/tailwind.scss`: one `@use '<category>/<name>';` per partial; `@use` lines are kept alphabetical by module path in every tier entry (`tailwind.micro.scss`, `tailwind.lite.scss`, `tailwind.standard.scss`, `tailwind.nano.scss` are alphabetical subsets; note `transforms/*` sorts before `transitions/*`). `@use` order = CSS output order.
- One partial per utility in `src/<category>/_<name>.scss`. Files stay under 200 lines.
- Shared values belong in a data-only partial (`@use`'d with `as *`), e.g. `src/colors/_colors.scss` (`$palette`) and `src/transforms/_transform-composite.scss` (`$transform-composite`).

## Sass gotchas (Dart Sass 1.104, verified empirically)

- **Custom property values are emitted verbatim.** Wrap any computed value in `#{}` — `--tw-x: #{$step * $unit};` — or the raw expression is printed literally.
- **Quoted Sass strings keep quotes in the output** unless interpolated. Use `transform: #{$transform-composite};`, never `transform: $transform-composite;`. Inside font lists, inner quotes (`"Apple Color Emoji"`) stay — that is correct CSS.
- **`@each` over a one-pair comma-list iterates zero times.** Single-entry maps must be explicit rules, e.g. `.transition-behavior-discrete { ... }`.
- **The `if()` function is deprecated.** Prefer separate loops or `@if` blocks.
- **Selector escapes must be literal in the data**, never built at runtime: class `'0\\.5'`, `'1\\/2'` inside the map produce working selectors; string-built escapes fail silently.
- Store the leading `-` in side/axis tokens (`('x', '--tw-scale-x', 'scale-x-', '-scale-x-')`) rather than concatenating it.

## Conventions

- Match an existing partial in the same category before writing a new one (same header comment, data-map + `@each` shape).
- Tailwind v3 default values/class names only (zoom follows v4's scale). Reuse `colors.$palette` instead of duplicating hex values.
- Color consumers: `@use '../colors/colors' as colors;` then loop `colors.$palette`.
