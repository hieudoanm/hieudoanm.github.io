# Contributing

Thanks for contributing to **Ads Blocker**, a cross-browser extension that
blocks ads and tracking requests on Chromium and Gecko browsers via both
Manifest V2 and Manifest V3 builds.

## Getting Started

1. **Prerequisites**: Node.js (see `.nvmrc` at the repo root) and `pnpm`.
2. **Install dependencies** from the workspace root:

   ```bash
   pnpm install
   ```

3. **Build this extension**:

   ```bash
   pnpm build --filter=@hieudoanm.github.io/ads-blocker
   ```

## Development Commands

| Task    | Command                                                   |
| ------- | --------------------------------------------------------- |
| Build   | `pnpm build --filter=@hieudoanm.github.io/ads-blocker`    |
| Lint    | `pnpm lint --filter=@hieudoanm.github.io/ads-blocker`     |
| Format  | `pnpm format --filter=@hieudoanm.github.io/ads-blocker`   |
| Web-ext | `pnpm web-ext lint --source-dir dist/v3` (also `dist/v2`) |
| Clean   | `pnpm clean --filter=@hieudoanm.github.io/ads-blocker`    |

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
3. **Self-documenting identifiers** — `hideAds()` needs no comment;
   `processData(x)` does.
4. **DRY** — when a pattern repeats, centralize it. Duplication is how bugs get
   missed.
5. **Small, focused files** — functions ≤ 30 lines, files ≤ 200 lines.
   `background.ts` and `content.ts` are deliberately small and single-purpose.
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
2. MV3 network blocking goes in `rules.json` (DNR); MV2 blocking goes in
   `background.ts` (`webRequest`). Keep the two lists in sync.
3. Content scripts must be idempotent — running twice must not corrupt state.
4. Never add remote resources or network-backed lists; the extension is fully
   offline.
5. Prefix debug logs with `[AdBlocker]` and keep them minimal.

## Testing Conventions

There is no unit-test harness for browser extensions in this workspace; the
quality gates are:

1. **`web-ext lint`** on both `dist/v2` and `dist/v3` — validates manifest
   schema and forbidden APIs (`make lint`).
2. **Manual matrix** — smoke-test after any change:
   - MV3: Chromium (Chrome/Edge) — `dist/v3`; MV2: Firefox — `dist/v2`
   - Ad appearing on page load (selector hiding)
   - Ad injected after load (MutationObserver re-hide)
   - Network request to a blocked domain (devtools → network, request cancelled)
3. **No false positives** — verify an ordinary page (e.g. GitHub) renders
   normally with no unexpected elements hidden.

## Before You Push

1. `pnpm lint --filter=@hieudoanm.github.io/ads-blocker`
2. `pnpm format --filter=@hieudoanm.github.io/ads-blocker`
3. `pnpm build --filter=@hieudoanm.github.io/ads-blocker`
4. `make lint` (web-ext) against `dist/v2` and `dist/v3`
5. Smoke-test the manual matrix above
