# Contributing

Thanks for contributing to **Snapshot**, a cross-browser extension that
captures the visible viewport or the full page of any tab as an image, on
Chromium and Gecko browsers via both Manifest V2 and Manifest V3 builds.

## Getting Started

1. **Prerequisites**: Node.js (see `.nvmrc` at the repo root) and `pnpm`.
2. **Install dependencies** from the workspace root:

   ```bash
   pnpm install
   ```

3. **Build this extension**:

   ```bash
   pnpm build --filter=@hieudoanm.github.io/snapshot
   ```

## Development Commands

| Task     | Command                                                        |
| -------- | -------------------------------------------------------------- |
| Build    | `pnpm build --filter=@hieudoanm.github.io/snapshot`            |
| Lint     | `pnpm lint --filter=@hieudoanm.github.io/snapshot`             |
| Format   | `pnpm format --filter=@hieudoanm.github.io/snapshot`           |
| Web-ext  | `pnpm web-ext lint --source-dir dist/v3` (also `dist/v2`)      |
| Clean    | `pnpm clean --filter=@hieudoanm.github.io/snapshot`            |

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
3. **Self-documenting identifiers** — `stitchChunks()` needs no comment;
   `processData(x)` does.
4. **DRY** — when a pattern repeats, centralize it. Duplication is how bugs get
   missed.
5. **Small, focused files** — functions ≤ 30 lines, files ≤ 200 lines.
   `lib/stitch.ts` stays a single pure helper.
6. **Explicit error handling** — check errors and fail loudly; never let
   failures silently propagate. Protected pages, canvas caps, and
   `clipboard-write` denials are surfaced to the popup.
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
2. Message protocols stay stable and well-named — `CAPTURE_VIEW`,
   `CAPTURE_FULLPAGE`, `SNAP_GET_LAYOUT`, `SNAP_SCROLL_TO` — and any change
   updates both sender and receiver together.
3. Content scripts must be idempotent — running twice must not stack
   listeners; guards belong where listeners are bound.
4. Protect the user — capture chunks must never scroll the page to a position
   it can't restore, and scroll position should be near-fully restored after a
   full-page capture.
5. Use `document_start` for the content script so layout metrics are ready the
   moment the user asks to capture.
6. Prefix debug logs with `[Snapshot]` and keep them minimal.

## Testing Conventions

There is no unit-test harness for browser extensions in this workspace; the
quality gates are:

1. **`web-ext lint`** on both `dist/v2` and `dist/v3` — validates manifest
   schema and forbidden APIs (`make lint`).
2. **Manual matrix** — smoke-test after any change:
   - MV3: Chromium (Chrome/Edge) — `dist/v3`; MV2: Firefox — `dist/v2`
   - Capture view → a PNG of the visible viewport downloads
   - Capture full page on a tall page (e.g. a long article) → one complete
     image, no seams or aspect-ratio distortion
   - Capture on a lazily-loaded feed → all sections that render appear
   - Protected pages (`chrome://`,`about:`) → explicit error in the popup
   - `download` action works in both MV2 and MV3
3. **No false positives** — the content script is read-only for layout; nothing
   but the capture scroll is ever applied.

## Before You Push

1. `pnpm lint --filter=@hieudoanm.github.io/snapshot`
2. `pnpm format --filter=@hieudoanm.github.io/snapshot`
3. `pnpm build --filter=@hieudoanm.github.io/snapshot`
4. `make lint` (web-ext) against `dist/v2` and `dist/v3`
5. Smoke-test the manual matrix above