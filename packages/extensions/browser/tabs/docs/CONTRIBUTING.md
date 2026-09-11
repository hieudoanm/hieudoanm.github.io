# Contributing

Thanks for contributing to **Tabs**, a cross-browser extension that redirects
every new tab to the hieudoanm home page, blocks distracting sites with an
offline focus wall, hides ads and tracking requests, routes external links from
GitHub pages into new tabs, detects Shopify stores as you browse, and captures
the visible viewport or the full page
of any tab as an image, on Chromium and Gecko browsers via both Manifest V2 and
Manifest V3 builds.

## Getting Started

1. **Prerequisites**: Node.js (see `.nvmrc` at the repo root) and `pnpm`.
2. **Install dependencies** from the workspace root:

   ```bash
   pnpm install
   ```

3. **Build this extension**:

   ```bash
   pnpm build --filter=@hieudoanm.github.io/tabs
   ```

## Development Commands

| Task    | Command                                                   |
| ------- | --------------------------------------------------------- |
| Build   | `pnpm build --filter=@hieudoanm.github.io/tabs`           |
| Lint    | `pnpm lint --filter=@hieudoanm.github.io/tabs`            |
| Format  | `pnpm format --filter=@hieudoanm.github.io/tabs`          |
| Web-ext | `pnpm web-ext lint --source-dir dist/v3` (also `dist/v2`) |
| Clean   | `pnpm clean --filter=@hieudoanm.github.io/tabs`           |

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
   `lib/newtab.ts` and `lib/stitch.ts` stay single-purpose helpers.
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
3. Redirect **only** new-tab / home / private-browsing URLs
   (`chrome://newtab`, `about:newtab`, `about:home`, `about:privatebrowsing`);
   every other URL is left completely untouched.
4. The block wall lives in `src/lib/block.ts` and only fires on
   `BLOCKED_DOMAINS`; the `blockDistractingSites` toggle (default on,
   `storage.sync`) gates it, and non-blocked pages must never see the wall.
5. Ad blocking lives in `src/lib/ads.ts` — `AD_SELECTORS` (DOM hiding via
   `MutationObserver`) and `AD_NETWORK_DOMAINS` (network blocking) must stay in
   sync with the static MV3 DNR ruleset in `public/manifest/v3/rules.json`; the
   `blockAds` toggle (default on, `storage.sync`) gates both layers.
6. Content scripts must be idempotent — running twice must not stack
   listeners; guards belong where listeners are bound.
7. Protect the user — capture chunks must never scroll the page to a position
   it can't restore, and scroll position should be near-fully restored after a
   full-page capture.
8. Use `document_start` for the content script so layout metrics are ready the
   moment the user asks to capture.
9. The new-tab redirect target defaults to `DEFAULT_TARGET_URL` in
   `src/lib/newtab.ts`; users can override it per-install from the popup's New
   Tab tab (stored in `storage.sync` as `newTabTargetUrl`), and the background
   falls back to the default whenever the stored value is empty or invalid.
10. Prefix debug logs with `[Tabs]` and keep them minimal, and prefix errors
    with `Block:` / `BlockAds:` / `Snapshot:` consistently; the Insta gesture,
    GitHub routing, Shopify detection, and Chess focus debug logs use `Insta:`,
    `GitHub:`, `Shopify:`, and `Chess:` prefixes.
11. GitHub external-link routing lives in `src/lib/github.ts` and mounts its
    click listener only on `github.com` hosts; in-repo links, `#` /
    `javascript:` hrefs, modifier-key clicks, and programmatic clicks always
    pass through untouched, and the `githubExternalLinks` toggle (default on,
    `storage.sync`) gates it.
12. Shopify detection lives in `src/lib/shopify.ts` — modeled on the Fera.ai
    "Shopify App Detector": the content script pushes one-way, fire-and-forget
    `SHOPIFY_RESULT_ACTION` messages to the background (on load, 600 ms after
    `load`, and on `visibilitychange`); the popup and background only talk
    over `chrome.runtime.sendMessage` — the popup never does
    `tabs.sendMessage` to a content script. A store is Shopify if any
    indicator holds (window.Shopify, checkout-token meta, `cdn.shopify.com`
    script, `/cart.js`), Plus if a shopify store also has any plus indicator
    (`checkout.shopify` host, `Shopify.checkout`, digital-wallet meta);
    detection never probes the DOM before it exists. `window.Shopify` and
    `Shopify.checkout` live in the page's main world and are invisible to the
    isolated content-world, so the lib injects a tiny main-world probe (guarded by
    `window.__tabsShopifyHook`, removed after append) that answers
    `TABS_SHOPIFY_CHECK` `postMessage` round-trips. Injection is deferred until
    an existing script is present (or `DOMContentLoaded`) and copies an existing
    script's nonce when the page enforces CSP nonces (`strict-dynamic` blocks
    plain inline scripts); it falls back to DOM-only indicators if the probe is
    unavailable. The background caches the result per tab (`shopifyResults`) and
    sets an "S" toolbar badge on detected stores. The popup's Shopify tab is
    always visible; clicking "Check Shopify" sends `GET_SHOPIFY_ACTION` to the
    background, which returns the cache or runs `detectShopifyInPage()` in the
    tab's MAIN world via `chrome.scripting.executeScript` on Chromium.
13. Chess.com focus lives in `src/lib/chess.ts` — a content-side observer only;
    it runs on `chess.com` hosts, hides every `HIDE_CLASSES` match (`display:
none`), and re-applies hiding through a single `MutationObserver`
    (`WebKitMutationObserver` fallback) on `childList` + `subtree`, re-scanning
    only when nodes are actually added/removed plus one initial pass at
    `DOMContentLoaded`. It is declarative and idempotent — never mutates game
    state, clicks, or sends messages — and the `chessFocus` toggle (default on,
    `storage.sync`) gates it.

## Testing Conventions

There is no unit-test harness for browser extensions in this workspace; the
quality gates are:

1. **`web-ext lint`** on both `dist/v2` and `dist/v3` — validates manifest
   schema and forbidden APIs (`make lint`).
2. **Manual matrix** — smoke-test after any change:
   - MV3: Chromium (Chrome/Edge) — `dist/v3`; MV2: Firefox — `dist/v2`

- Open a new tab → it redirects to the configured target (default
  `https://hieudoanm.github.io`); toggle off in the popup → default new-tab
  page loads; change the Target URL in the New Tab tab → next new tab goes there
- Visit a `BLOCKED_DOMAINS` site → the focus wall appears; toggle off in the
  popup → the site loads normally
- On a GitHub page → external links open in new tabs; in-repo links navigate
  normally; toggle "githubExternalLinks" off → external links navigate away
  in the same tab
  - On a Shopify storefront → the popup's Shopify tab shows a Shopify / Shopify
    Plus verdict with the indicator breakdown; on regular pages it stays hidden
  - Open a page with ads → ad banners hidden and ad/tracking requests
    cancelled; toggle "Block ads" off in the popup → they return
  - Capture view → a PNG of the visible viewport downloads
  - Capture full page on a tall page (e.g. a long article) → one complete
    image, no seams or aspect-ratio distortion
  - Capture on a lazily-loaded feed → all sections that render appear
  - Protected pages (`chrome://`,`about:`) → explicit error in the popup
  - `download` action works in both MV2 and MV3

3. **No false positives** — the content script is read-only for layout; nothing
   but the capture scroll is ever applied.

## Before You Push

1. `pnpm lint --filter=@hieudoanm.github.io/tabs`
2. `pnpm format --filter=@hieudoanm.github.io/tabs`
3. `pnpm build --filter=@hieudoanm.github.io/tabs`
4. `make lint` (web-ext) against `dist/v2` and `dist/v3`
5. Smoke-test the manual matrix above
