# Architecture

## Goals

- Cross-browser extension that runs on Chromium browsers (Chrome, Edge, Brave,
  Opera, Vivaldi, Arc) and Gecko browsers (Firefox, Tor)
- Ship both **Manifest V2** and **Manifest V3** builds from a single source
- Block network requests to known ad/tracking domains and hide ad DOM elements
- Offline-capable and transparent — no remote lists, no data collection
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                                             |
| ----------- | ------------------------------------------------------ |
| Runtime     | Browser extension (WebExtension API, both MV2 and MV3) |
| Language    | TypeScript 6 (strict)                                  |
| Build       | Webpack 5 + ts-loader                                  |
| Manifests   | MV2 (`webRequest`) + MV3 (`declarativeNetRequest`)     |
| DOM hiding  | Content script (CSS selectors + `MutationObserver`)    |
| Linting     | ESLint 10 + Prettier                                   |
| Packaging   | Makefile + `web-ext` (zip / xpi / crx)                 |
| Package Mgr | pnpm                                                   |

## Directory Structure

```txt
src/
├── background.ts   # Network request blocking (MV2 webRequest / MV3 DNR)
└── content.ts      # DOM ad hiding (selectors + MutationObserver)
public/
├── icons/          # 16x16.png, 48x48.png, 128x128.png, icon.svg
└── manifest/
    ├── v2/
    │   └── manifest.json   # MV2 manifest (webRequest + webRequestBlocking)
    └── v3/
        ├── manifest.json   # MV3 manifest (declarativeNetRequest)
        └── rules.json      # DNR block rule set (6 ad/tracking domains)
docs/               # Architecture, roadmap, contributing, packaging, downloads
```

## Build Pipeline

```txt
┌───────────────────────────────────────────────────────────────┐
│  webpack.config.ts                                            │
│  entry: { background: './src/background.ts',                  │
│           content:   './src/content.ts'   }                   │
├───────────────────────────────────────────────────────────────┤
│  dist/v2/                                                     │
│    background.js   content.js   manifest.json   icons/        │
│    (MV2 manifest swapped in via CopyPlugin)                   │
├───────────────────────────────────────────────────────────────┤
│  dist/v3/                                                     │
│    background.js   content.js   manifest.json   rules.json    │
│    (MV3 manifest + DNR rules swapped in via CopyPlugin)       │
├───────────────────────────────────────────────────────────────┤
│  make build → zip, xpi (web-ext), crx (Chrome --pack-extension)│
│  artifacts land in download/v2 and download/v3                │
└───────────────────────────────────────────────────────────────┘
```

The same entry sources compile twice — once per manifest version — and
CopyPlugin injects the matching `manifest.json` (and `rules.json` for v3) into
each `dist/` directory. Output filenames are `[name].js`.

## Application Layers

```txt
┌───────────────────────────────────────────────┐
│  Background (src/background.ts)               │  Service worker (MV3) or
│  - MV2: webRequest.onBeforeRequest + cancel   │  background page (MV2)
│  - MV3: declarativeNetRequest static rules    │
├───────────────────────────────────────────────┤
│  Content (src/content.ts)                     │  Runs in page context,
│  - AD_SELECTORS + querySelectorAll            │  shares DOM access
│  - Hide via style.setProperty('display','none')│
│  - MutationObserver for dynamically-added ads │
├───────────────────────────────────────────────┤
│  Manifests (public/manifest/{v2,v3})          │  Declares permissions,
│                                               │  content script matches
└───────────────────────────────────────────────┘
```

## Manifest Versions

| Concern          | Manifest V2                         | Manifest V3                              |
| ---------------- | ----------------------------------- | ---------------------------------------- |
| Network blocking | `webRequest` + `webRequestBlocking` | `declarativeNetRequest` static rules     |
| `rules.json`     | — (blocking handled in background)  | `declarative_net_request.rule_resources` |
| Background       | `background.scripts` + persistent   | `background.service_worker`              |
| Blocked domains  | `AD_DOMAINS` in `background.ts`     | 6 rules in `rules.json`                  |

## Blocking Strategy

- **Network layer** — requests to `doubleclick.net`, `google-analytics.com`,
  `googlesyndication.com`, `adnxs.com`, `outbrain.com`, and `taboola.com` are
  cancelled. MV2 uses a blocking `webRequest` listener; MV3 uses static
  `declarativeNetRequest` rules declared in the manifest.
- **DOM layer** — a content script hides ad containers and banner elements
  matched by attribute selectors (`.ad-*`, `.ads-*`, `ins.adsbygoogle`,
  iframes pointing at ad domains, etc.) with an `important`-flagged
  `display: none`. A `MutationObserver` re-runs hiding as pages inject new ad
  nodes dynamically.

## State Management

- **None** — the extension is stateless and declarative. All blocking logic is
  either a static rule set (MV3 DNR) or an idempotent listener (MV2
  `webRequest`), and the content script recomputes hiding on every mutation.

## Performance

- MV3 uses native `declarativeNetRequest` — blocking is done by the browser,
  not JS, so there is zero script overhead on the network path
- The content script only observes `childList` + `subtree` mutations and
  re-queries a fixed selector set; hidden elements are skipped on re-scan
- No remote resources, lists, or analytics — fully offline and lightweight
