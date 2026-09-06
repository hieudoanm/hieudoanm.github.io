# Architecture

## Goals

- Cross-browser extension that runs on Chromium browsers (Chrome, Edge, Brave,
  Opera, Vivaldi, Arc) and Gecko browsers (Firefox, Tor)
- Ship both **Manifest V2** and **Manifest V3** builds from a single source
- Tell you, on any page, whether a store runs on Shopify — and whether it's a
  Shopify Plus store
- Answer `CHECK_SHOPIFY` runtime messages with the detection result
- Zero-config, fully offline, and transparent about what it reads
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                                             |
| ----------- | ------------------------------------------------------ |
| Runtime     | Browser extension (WebExtension API, both MV2 and MV3) |
| Language    | TypeScript 6 (strict)                                  |
| Build       | Webpack 5 + ts-loader                                  |
| Manifests   | MV2 + MV3 (single content script)                      |
| Linting     | ESLint 10 + Prettier                                   |
| Packaging   | Makefile + `web-ext` (zip / xpi / crx)                 |
| Package Mgr | pnpm                                                   |

## Directory Structure

```txt
src/
└── content.ts          # Shopify / Shopify Plus detection + CHECK_SHOPIFY replies
public/
├── icons/              # 16x16.png, 48x48.png, 128x128.png, icon.svg
└── manifest/
    ├── v2/
    │   └── manifest.json   # MV2 manifest (content script, <all_urls>)
    └── v3/
        └── manifest.json   # MV3 manifest (content script, <all_urls>)
docs/               # Architecture, roadmap, contributing, packaging, downloads
```

There is no popup, options page, or background worker — the extension is a
single content script.

## Build Pipeline

```txt
┌───────────────────────────────────────────────────────────────┐
│  webpack.config.ts                                            │
│  entry:                                                       │
│    content: './src/content.ts'                                │
├───────────────────────────────────────────────────────────────┤
│  dist/v2/                                                     │
│    content.js  manifest.json  icons/                          │
├───────────────────────────────────────────────────────────────┤
│  dist/v3/                                                     │
│    content.js  manifest.json  icons/                          │
├───────────────────────────────────────────────────────────────┤
│  make build → zip, xpi (web-ext), crx (Chrome --pack-extension)│
│  artifacts land in download/v2 and download/v3 (shopifyx-*)   │
└───────────────────────────────────────────────────────────────┘
```

Webpack compiles the single entry twice — once per manifest version — and
CopyPlugin injects the matching `manifest.json` into each `dist/` directory.

## Application Layers

```txt
┌───────────────────────────────────────────────┐
│  Content (src/content.ts)                     │  Runs on all sites
│  - snapshots window.Shopify / meta / scripts  │  (document_idle)
│  - detects Shopify via window.Shopify,        │
│    shopify-checkout-api-token meta,           │
│    cdn.shopify.com scripts, /cart.js          │
│  - detects Shopify Plus via checkout.shopify  │
│    host, Shopify.checkout, wallet meta        │
│  - replies to CHECK_SHOPIFY messages          │
├───────────────────────────────────────────────┤
│  Manifests (public/manifest/{v2,v3})          │  <all_urls> matches
└───────────────────────────────────────────────┘
```

## Manifest Versions

| Concern        | Manifest V2                              | Manifest V3                           |
| -------------- | ---------------------------------------- | ------------------------------------- |
| Permissions    | —                                        | —                                     |
| Host access    | content_scripts `matches` `<all_urls>`   | `host_permissions` `<all_urls>`       |
| Content script | `content.js`, `run_at: document_idle`    | `content.js`, `run_at: document_idle` |
| Gecko ID       | `shopifyx-extension@hieudoanm.github.io` | same                                  |

The content script needs `<all_urls>` because a Shopify store's domain is not
knowable ahead of time — detection must run wherever you browse.

## Detection Strategy

`src/content.ts` snapshots page signals once at `document_idle`:

- **Shopify:** `window.Shopify` global, the
  `meta[name="shopify-checkout-api-token"]` tag, any
  `cdn.shopify.com` script URL, and any `/cart.js` script URL.
  `isShopify` is true when at least one indicator matches.
- **Shopify Plus:** only when `isShopify` is true — the
  `checkout.shopify` checkout.hostname/subdomain, a `Shopify.checkout`
  object, and the `meta[name="shopify-digital-wallet"]` tag.

The full indicator breakdown is captured in a typed
`ShopifyDetectionResult` and returned verbatim for `CHECK_SHOPIFY`
messages, so callers (e.g. a popup or page tooling) can surface exactly which
signals fired.

## State Management

- The extension is stateless: it snapshots once per page load, holds the
  `ShopifyDetectionResult` for the life of the page, and replies to
  `CHECK_SHOPIFY` messages. No storage, no background, no persistence.

## Performance

- One lightweight snapshot computed at `document_idle`; no observers, timers,
  or network requests
- The message listener does no work beyond returning the precomputed result
- No remote resources, lists, or analytics — fully offline and lightweight
