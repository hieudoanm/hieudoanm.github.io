# Contributing

Thanks for contributing to **InstaX**, a cross-browser extension that opens
nearby Instagram images in new tabs with a double right-click, on Chromium and
Gecko browsers via both Manifest V2 and Manifest V3 builds.

## Getting Started

1. **Prerequisites**: Node.js (see `.nvmrc` at the repo root) and `pnpm`.
2. **Install dependencies** from the workspace root:

   ```bash
   pnpm install
   ```

3. **Build this extension**:

   ```bash
   pnpm build --filter=@hieudoanm.github.io/instax
   ```

## Development Commands

| Task     | Command                                                        |
| -------- | -------------------------------------------------------------- |
| Build    | `pnpm build --filter=@hieudoanm.github.io/instax`              |
| Lint     | `pnpm lint --filter=@hieudoanm.github.io/instax`               |
| Format   | `pnpm format --filter=@hieudoanm.github.io/instax`             |
| Web-ext  | `pnpm web-ext lint --source-dir dist/v3` (also `dist/v2`)      |
| Clean    | `pnpm clean --filter=@hieudoanm.github.io/instax`              |

`pnpm build` runs clean → lint → format → webpack → `make build` (zip/xpi/crx).
Run lint and format before pushing — CI enforces them.

## Coding Conventions

The conventions below come from the repository-wide `AGENTS.md`. Follow them for
every change.

### General

1. **Explicit types over implicit** — annotate function signatures and exported
   symbols. A signature tells the reader more than a body.
2. **Flat over deeply nested** — short functions, minimal indentation, guard
   clauses (`if (!value) return`).
3. **Self-documenting identifiers** — `openNearbyImages()` needs no comment;
   `processData(x)` does.
4. **DRY** — when a pattern repeats, centralize it. Duplication is how bugs get
   missed.
5. **Small, focused files** — functions ≤ 30 lines, files ≤ 200 lines.
   `content.ts` stays single-purpose.
6. **Explicit error handling** — check errors and fail loudly; never let
   failures silently propagate.
7. **Consistent imports** — group by origin: stdlib, third-party, internal.
8. **Pure functions with explicit dependencies** — accept inputs, return
   outputs; no global/singleton state.
9. **Conventional layouts** — `src/`, `public/`, `docs/`.

### TypeScript

1. Use arrow functions for all function declarations — `const fn = () => {}`,
   not `function fn() {}`.
2. Use `const` over `let` when a value is never reassigned.
3. Use `strict: true` in `tsconfig.json`.
4. Prefer `interface` over `type` for object shapes; use `type` for unions,
   intersections, and primitives.
5. Use `as const` for literal types.
6. Use `satisfies` over raw casts where narrowing is needed.
7. Explicitly type return values on exported functions.
8. Never reference `any` — prefer `unknown` with explicit narrowing.

### WebExtension

1. Keep MV2 and MV3 parity — a feature must work on both manifest versions or
   be documented in the roadmap as version-specific.
2. Stay scoped to `*://*.instagram.com/*` — never widen the content-script
   match without a roadmap item.
3. A single right-click must always show the native context menu; only the
   double-click gesture within the 400ms window suppresses it.
4. Content scripts must be idempotent — running twice must not stack
   listeners; guards belong where listeners are bound.
5. Never add remote resources or network-backed behavior; the extension is
   fully offline.
6. Prefix debug logs with `[InstaX]` and keep them minimal.

## Testing Conventions

There is no unit-test harness for browser extensions in this workspace; the
quality gates are:

1. **`web-ext lint`** on both `dist/v2` and `dist/v3` — validates manifest
   schema and forbidden APIs (`make lint`).
2. **Manual matrix** — smoke-test after any change:
   - MV3: Chromium (Chrome/Edge) — `dist/v3`; MV2: Firefox — `dist/v2`
   - On an Instagram page, double right-click a post → nearby images open in
     new tabs; single right-click still shows the native menu
   - Right-click on a photo grid → all unique image URLs in view open
   - No duplicate tabs for the same `src`
3. **No false positives** — outside Instagram the listener never runs; native
   right-click behavior is untouched everywhere else.

## Before You Push

1. `pnpm lint --filter=@hieudoanm.github.io/instax`
2. `pnpm format --filter=@hieudoanm.github.io/instax`
3. `pnpm build --filter=@hieudoanm.github.io/instax`
4. `make lint` (web-ext) against `dist/v2` and `dist/v3`
5. Smoke-test the manual matrix above