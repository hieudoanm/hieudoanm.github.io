# Architecture

## Goals

- Cross-browser extension that runs on Chromium browsers (Chrome, Edge, Brave,
  Opera, Vivaldi, Arc) and Gecko browsers (Firefox, Tor)
- Ship both **Manifest V2** and **Manifest V3** builds from a single source
- Provide four site-specific enhancements from one install:
  Claude.ai usage tracking, Shopify detection, chess.com focus, and YouTube
  transcripts
- Overscoped `<all_urls>` permission kept honest — each content script matches
  only the origin it needs
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                                                            |
| ----------- | --------------------------------------------------------------------- |
| Runtime     | Browser extension (WebExtension API, both MV2 and MV3)                |
| Language    | TypeScript 6 (strict)                                                 |
| Build       | Webpack 5 + ts-loader                                                 |
| Manifests   | MV2 + MV3 (background + 4 content scripts)                            |
| Storage     | `chrome.storage.local` (badge state) + `localStorage` (content cache) |
| Linting     | ESLint 10 + Prettier                                                  |
| Packaging   | Makefile + `web-ext` (zip / xpi / crx)                                |
| Package Mgr | pnpm                                                                  |

## Directory Structure

```txt
src/
├── background/
│   ├── index.ts              # Barrel entry (background)
│   ├── claude-limit.ts       # Claude rate-limit badge + data (webRequest-free)
│   └── youtube-transcript.ts # Install logging only
└── content/
    ├── claude-limit.ts       # Claude inline usage indicator (fetch patch)
    ├── chess-focus.ts        # Hides chess.com ratings
    ├── shopify-detect.ts     # Shopify / Shopify Plus detection
    └── youtube-transcript.ts # Caption transcription
public/
├── icons/                    # 16x16.png, 48x48.png, 128x128.png, icon.svg
└── manifest/
    ├── v2/
    │   └── manifest.json     # MV2 manifest
    └── v3/
        └── manifest.json     # MV3 manifest
docs/               # Architecture, roadmap, contributing, packaging, downloads
```

## Build Pipeline

```txt
┌───────────────────────────────────────────────────────────────┐
│  webpack.config.ts                                            │
│  entry:                                                       │
│    background: './src/background/index.ts'                    │
│    claude:     './src/content/claude-limit.ts'                │
│    chess:      './src/content/chess-focus.ts'                 │
│    shopify:    './src/content/shopify-detect.ts'              │
│    youtube:    './src/content/youtube-transcript.ts'          │
├───────────────────────────────────────────────────────────────┤
│  dist/v2/                                                     │
│    background.js  claude.js  chess.js  shopify.js  youtube.js │
│    manifest.json  icons/                                      │
├───────────────────────────────────────────────────────────────┤
│  dist/v3/                                                     │
│    background.js  claude.js  chess.js  shopify.js  youtube.js │
│    manifest.json  icons/                                      │
├───────────────────────────────────────────────────────────────┤
│  make build → zip, xpi (web-ext), crx (Chrome --pack-extension)│
│  artifacts land in download/v2 and download/v3 (hieudoanm-*)  │
└───────────────────────────────────────────────────────────────┘
```

Webpack compiles one entry per feature; CopyPlugin injects the matching
`manifest.json` per version. Output filenames match the entry names.

## Application Layers

```txt
┌───────────────────────────────────────────────┐
│  Background (src/background/index.ts)         │  MV3 service worker / MV2
│  ├─ claude-limit   CLAUDE_API_RESPONSE msgs,  │  background page
│  │   chrome.storage.local['claudeLimit'],     │
│  │   action badge (green/yellow/red)          │
│  └─ youtube-transcript  logs on install       │
├───────────────────────────────────────────────┤
│  Content scripts (per-origin)                 │  Chess/Shopify/Claude/YouTube
│  ├─ claude-limit   fetch monkey-patch,        │
│  │   /rate_limits + /usage, indicator widget  │
│  ├─ chess-focus    rating/username hiding     │
│  ├─ shopify-detect window.Shopify + meta +    │
│  │   cdn scripts, CHECK_SHOPIFY replies       │
│  └─ youtube-transcript caption track fetch    │
├───────────────────────────────────────────────┤
│  Manifests (public/manifest/{v2,v3})          │  Permissions: activeTab,
│                                               │  tabs, storage, scripting
└───────────────────────────────────────────────┘
```

## Manifest Versions

| Concern         | Manifest V2                                               | Manifest V3                                 |
| --------------- | --------------------------------------------------------- | ------------------------------------------- |
| Permissions     | `activeTab`, `tabs`, `storage`, `scripting`, `<all_urls>` | `activeTab`, `tabs`, `storage`, `scripting` |
| Host access     | `<all_urls>` permission + content `matches`               | `host_permissions` `<all_urls>`             |
| Background      | `background.scripts` + `persistent: false`                | `background.service_worker`                 |
| Action          | `browser_action` (title + icon)                           | `action` (title + icon)                     |
| Content scripts | 4 entries (chess, shopify, claude, youtube)               | same 4 entries                              |
| Gecko ID        | `hieudoanm-extension@hieudoanm.github.io`                 | same                                        |

## Feature Details

### Claude.ai usage tracking

- **Content** monkey-patches `window.fetch`, intercepts responses to
  `/rate_limits` and `/usage`, and caches parsed usage in `localStorage`
  (`claude_limit_data`). Renders an inline indicator (id
  `claude-limit-indicator`) with daily/weekly percentages and reset
  countdowns; re-mounts via `MutationObserver`, retries, and a 60s interval.
  Mount targets `[data-testid="input-menu-container"]` near the composer.
- **Background** receives `CLAUDE_API_RESPONSE` messages, stores the latest
  state in `chrome.storage.local` (`claudeLimit`), and sets the action badge
  color by threshold: green <60%, yellow 60–89%, red ≥90%.

### Shopify detection

- Detects Shopify via `window.Shopify`, `meta[name="shopify-checkout-api-token"]`,
  `cdn.shopify.com` scripts, and `/cart.js` presence; detects Shopify Plus via
  the `checkout.shopify` hostname, `Shopify.checkout`, and the digital-wallet
  meta tag. Responds to `CHECK_SHOPIFY` runtime messages with the result.

### chess.com focus

- Hides rating/username elements (`live-game-start-component`,
  `live-game-over-component`, `user-tagline-username`,
  `user-tagline-rating`, `user-rating`) with a `MutationObserver` re-applying
  the hiding to dynamically added elements.

### YouTube transcript

- On `GET_TRANSCRIPT` messages, reads
  `window.ytInitialPlayerResponse.captions…captionTracks[0].baseUrl`, fetches
  the caption XML, parses `<text>` nodes with `DOMParser`, and returns the
  concatenated transcript.

## State Management

- **Background** — `chrome.storage.local` key `claudeLimit` holds the latest
  Claude usage snapshot for badge display.
- **Content** — `localStorage` key `claude_limit_data` caches parsed usage for
  the inline indicator between page loads.
- Everything else is stateless and recomputed per page/event.

## Performance

- Each content script is injected only on the origin it serves (`chess.com`,
  `claude.ai`, `www.youtube.com/watch*`, or all pages for Shopify detection)
- The Claude fetch patch is a thin wrapper that only intercepts two endpoint
  shapes; non-matching responses pass through untouched
- Badge updates are throttled by message arrival, not per-request
