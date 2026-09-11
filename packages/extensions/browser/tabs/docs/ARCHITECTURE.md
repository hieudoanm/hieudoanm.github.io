# Architecture

## Goals

- Cross-browser extension that runs on Chromium browsers (Chrome, Edge, Brave,
  Opera, Vivaldi, Arc) and Gecko browsers (Firefox, Tor)
- Ship both **Manifest V2** and **Manifest V3** builds from a single source
- Redirect every new tab to the hieudoanm home page (`https://hieudoanm.github.io/app/`)
- Block distracting sites with an offline "focus wall" fallback
- Block ads and tracking requests fully offline
- Capture the visible viewport or the full page of any tab as an image
- Support both automatic download and copy-to-clipboard
- Stitch tall pages cross-device correctly via `OffscreenCanvas` chunking
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                                             |
| ----------- | ------------------------------------------------------ |
| Runtime     | Browser extension (WebExtension API, both MV2 and MV3) |
| Language    | TypeScript 6 (strict)                                  |
| Build       | Webpack 5 + ts-loader                                  |
| Manifests   | MV2 + MV3 (identical, permission shape differs)        |
| DOM/Canvas  | Content script + `OffscreenCanvas` stitching           |
| UI          | Action popup (`popup.html`, `popup.ts`)                |
| Linting     | ESLint 10 + Prettier                                   |
| Packaging   | Makefile + `web-ext` (zip / xpi / crx)                 |
| Package Mgr | pnpm                                                   |

## Directory Structure

```txt
src/
├── background.ts   # New-tab redirect + capture orchestration + network ad blocking
├── content.ts      # Page layout reader + block wall + ad-hiding triggers
├── popup.ts        # Action popup UI (capture buttons + redirect/block toggles)
└── lib/
    ├── ads.ts      # Ad selectors + network domains + offline ad-hiding
    ├── block.ts    # Distracting-site block wall (+ better sites + suggestion wheel)
    ├── newtab.ts   # New-tab/home URL interception + redirect
    └── stitch.ts   # OffscreenCanvas chunk stitching
public/
├── icons/              # 16x16.png, 48x48.png, 128x128.png, icon.svg
├── popup.html          # Popup markup
└── manifest/
    ├── v2/
    │   └── manifest.json   # MV2 manifest (browser_action, <all_urls>, webRequest)
    └── v3/
        ├── manifest.json   # MV3 manifest (action, host_permissions <all_urls>, DNR)
        └── rules.json      # MV3 static declarativeNetRequest ads rules
docs/               # Architecture, roadmap, contributing, packaging, downloads
```

## Build Pipeline

```txt
┌───────────────────────────────────────────────────────────────┐
│  webpack.config.ts                                            │
│  entry: { background, content, popup }                        │
├───────────────────────────────────────────────────────────────┤
│  dist/v2/                                                     │
│    background.js  content.js  popup.js  popup.html            │
│    manifest.json   icons/                                     │
│    (MV2 manifest swapped in via CopyPlugin)                   │
├───────────────────────────────────────────────────────────────┤
│  dist/v3/                                                     │
│    background.js  content.js  popup.js  popup.html            │
│    manifest.json   icons/                                     │
│    (MV3 manifest swapped in via CopyPlugin)                   │
├───────────────────────────────────────────────────────────────┤
│  make build → zip, xpi (web-ext), crx (Chrome --pack-extension)│
│  artifacts land in download/v2 and download/v3                │
└───────────────────────────────────────────────────────────────┘
```

The three entries compile twice — once per manifest version — and CopyPlugin
injects the matching `manifest.json` and `popup.html` into each `dist/`
directory.

## Application Layers

```txt
┌────────────────────────────────────────────────────────────┐
│  Popup (src/popup.ts)                                      │  Action toolbar icon
│  - "Capture view" / "Capture full page" buttons            │
│  - New Tab redirect + Block toggles (sync storage)         │
│  - Sends CAPTURE_VIEW / CAPTURE_FULLPAGE to background     │
├────────────────────────────────────────────────────────────┤
│  Background (src/background.ts)                            │  MV3 service worker /
│  - Registers the new-tab redirect (lib/newtab.ts)          │  MV2 background page
│  - Listens for capture messages                            │
│  - Grabs the active tab via chrome.tabs                    │
│  - Requests page layout via SNAP_GET_LAYOUT               │
│  - Scales chunks + stitches via OffscreenCanvas (stitch)   │
│  - Downloads (downloads.download) or clipboard.write       │
│  - Cancels ad/tracking requests (MV2 webRequest, MV3 DNR)   │
├────────────────────────────────────────────────────────────┤
│  Content (src/content.ts)                                  │  Runs <all_urls>
│  - Answers SNAP_GET_LAYOUT / SNAP_SCROLL_TO                │  document_start
│  - Reports scrollY, innerHeight, document size             │
│  - Scrolls the page for full-page stitching                │
│  - Triggers the block wall via maybeRenderBlockWall()      │
│  - Triggers ad hiding via maybeRunAdsBlocker()             │
├────────────────────────────────────────────────────────────┤
│  lib/ads (src/lib/ads.ts)                                  │  Shared helper
│  - AD_SELECTORS (DOM hiding) + AD_NETWORK_DOMAINS          │
│  - MutationObserver-based ad hiding, offline               │
├────────────────────────────────────────────────────────────┤
│  lib/block (src/lib/block.ts)                              │  Shared helper
│  - BLOCKED_DOMAINS + BETTER_SITES + SUGGESTIONS            │
│  - isBlockedHostname() prefix-suffix matching              │
│  - Renders an offline focus wall when enabled              │
├────────────────────────────────────────────────────────────┤
│  lib/newtab (src/lib/newtab.ts)                            │  Shared helper
│  - isNewTab(url) prefix matching                           │
│  - tabs.onCreated/onUpdated -> update target               │
├────────────────────────────────────────────────────────────┤
│  lib/stitch (src/lib/stitch.ts)                           │  Shared helper
│  - stitchChunks → OffscreenCanvas composition              │
└────────────────────────────────────────────────────────────┘
```

## Manifest Versions

| Concern        | Manifest V2                                                                     | Manifest V3                                                                                           |
| -------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Permissions    | `activeTab`, `tabs`, `downloads`, `storage`, `webRequest`, `webRequestBlocking` | `activeTab`, `tabs`, `downloads`, `storage`, `declarativeNetRequest`, `declarativeNetRequestFeedback` |
| Host access    | content_scripts `matches` `<all_urls>`                                          | `host_permissions` `<all_urls>`                                                                       |
| User interface | `browser_action` + `popup.html`                                                 | `action` + `popup.html`                                                                               |
| Content script | `content.js`, `run_at: document_start`                                          | `content.js`, `run_at: document_start`                                                                |
| Background     | `background.scripts` + `persistent: false`                                      | `background.service_worker`                                                                           |
| Network ads    | `webRequest` + `webRequestBlocking` listener                                    | static DNR ruleset `rules.json`                                                                       |

## New-Tab Redirect Strategy

- **New-tab detection** — `isNewTab()` in `src/lib/newtab.ts` matches URLs
  whose prefix is one of `chrome://newtab`, `about:newtab`, `about:home`, or
  `about:privatebrowsing`.
- **Two event hooks** — `tabs.onCreated` inspects `tab.url` and `tab.pendingUrl`
  (a tab can be created "pending" before it has a final URL) and `tabs.onUpdated`
  inspects `changeInfo.url`, covering both the moment a tab opens and any
  navigation to a new-tab URL.
- **Toggle** — the popup toggle `redirectNewTabs` lives in `storage.sync`
  (default on); every other URL is left completely untouched.
- **Configurable target** — `DEFAULT_TARGET_URL` in `src/lib/newtab.ts`
  (`https://hieudoanm.github.io`) is the fallback; users can point new tabs at
  any `http(s)` URL from the popup's New Tab tab, stored in `storage.sync` as
  `newTabTargetUrl`. The background re-resolves the target before each redirect
  and skips blank/newtab targets to avoid loops.

## Block Strategy

- **Block list** — `BLOCKED_DOMAINS` in `src/lib/block.ts` (facebook, x/twitter,
  instagram, reddit, tiktok, youtube, netflix, twitch, discord); `content.ts`
  replaces the page with the offline "focus wall" when one loads.
- **Toggle** — the popup checkbox `blockDistractingSites` lives in `storage.sync`
  (default on); `maybeRenderBlockWall()` re-checks it on every load.
- **Wall content** — `BETTER_SITES` (jump shortcuts) and `SUGGESTIONS`
  (spin-wheel ideas) render fully offline, no network calls; nothing about the
  user's browsing ever leaves the page.

## Ad-Blocking Strategy

- **DOM hiding** — `AD_SELECTORS` in `src/lib/ads.ts` matches common ad
  containers; `maybeRunAdsBlocker()` in `content.ts` hides them
  (`display: none !important`) with an idempotent `MutationObserver` so
  dynamically injected ads get caught too.
- **Network blocking** — `AD_NETWORK_DOMAINS` (DoubleClick, Google Analytics,
  Google Syndication, AppNexus, Outbrain, Taboola) is enforced two ways: MV2
  cancels requests with a blocking `webRequest` listener in `background.ts`;
  MV3 ships the static DNR ruleset `ruleset_block` from
  `public/manifest/v3/rules.json`.
- **Toggle** — the popup checkbox `blockAds` lives in `storage.sync` (default
  on). The content script re-checks it on every load; the background flips the
  MV3 static ruleset on/off via `updateEnabledRulesets` and gates the MV2
  `webRequest` listener, so both DOM hiding and network blocking respect it.
- **Offline** — no rules are fetched, no telemetry, no network round-trips.

## Chess.com Focus Strategy

- **Scope** — `registerChessFocus()` in `src/lib/chess.ts` runs only on
  `chess.com` hosts; it hides every `HIDE_CLASSES` match (live-game start/over
  overlays, user tagline username/rating, user rating) with `display: none`.
- **Re-renders** — a single `MutationObserver` (with `WebKitMutationObserver`
  fallback) watches `childList` + `subtree`; it re-scans only when nodes are
  actually added or removed, plus one initial pass at `DOMContentLoaded`.
- **Toggle** — the popup checkbox `chessFocus` lives in `storage.sync` (default
  on); gated by hostname and the toggle, and the observer never touches game
  state, clicks, or messages.

## Capture Strategy

- **View capture** — background captures `chrome.tabs.captureVisibleTab`
  directly; the popup just triggers it.
- **Full-page capture** — background requests layout metrics via
  `SNAP_GET_LAYOUT`, scrolls the page chunk-by-chunk with `SNAP_SCROLL_TO` +
  `captureVisibleTab`, then stitches every chunk into one tall image with
  `stitchChunks` on an `OffscreenCanvas` (preserving aspect ratio across
  varying device pixel ratios).
- **Delivery** — the finished canvas converts to a blob; the default action
  calls `downloads.download`; the clipboard path uses `clipboard.write`.
- **Failure handling** — canvas size limits, protected pages (e.g.
  `chrome://`), and `clipboard-write` permission issues surface as explicit
  errors in the popup instead of silently failing.

## State Management

- **Minimal** — per-invocation capture state lives in the message flow; the
  `redirectNewTabs`, `newTabTargetUrl`, `blockDistractingSites`, `blockAds`,
  `instaGesture`, `githubExternalLinks`, and `chessFocus` preferences are the
  persisted values in `storage.sync`.

## Performance

- Content script runs `document_start` so layout metrics are ready the moment
  the user asks to capture
- The new-tab listeners are constant-time prefix checks; the service worker is
  near-zero footprint and wakes only on tab events or capture messages
- Chunked scrolling supports very tall pages without hitting canvas size caps
- No remote resources or telemetry — fully offline and lightweight
