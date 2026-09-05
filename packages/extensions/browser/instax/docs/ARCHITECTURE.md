# Architecture

## Goals

- Cross-browser extension that runs on Chromium browsers (Chrome, Edge, Brave,
  Opera, Vivaldi, Arc) and Gecko browsers (Firefox, Tor)
- Ship both **Manifest V2** and **Manifest V3** builds from a single source
- On Instagram, open all nearby images at full resolution in new tabs with a
  double right-click gesture
- Gesture must not disturb normal right-click on the rest of the web
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer         | Technology                                     |
| ------------- | ---------------------------------------------- |
| Runtime       | Browser extension (WebExtension API, both MV2 and MV3) |
| Language      | TypeScript 6 (strict)                          |
| Build         | Webpack 5 + ts-loader                          |
| Manifests     | MV2 + MV3 (identical, permission shape differs)|
| DOM           | Content script only (context-menu gesture)     |
| Linting       | ESLint 10 + Prettier                           |
| Packaging     | Makefile + `web-ext` (zip / xpi / crx)         |
| Package Mgr   | pnpm                                           |

## Directory Structure

```txt
src/
└── content.ts       # Double right-click image opener (single source file)
public/
├── icons/           # 16x16.png, 48x48.png, 128x128.png, icon.svg
└── manifest/
    ├── v2/
    │   └── manifest.json   # MV2 manifest (activeTab)
    └── v3/
        └── manifest.json   # MV3 manifest (host_permissions instagram.com)
docs/               # Architecture, roadmap, contributing, packaging, downloads
```

## Build Pipeline

```txt
┌───────────────────────────────────────────────────────────────┐
│  webpack.config.ts                                            │
│  entry: { content: './src/content.ts' }                       │
├───────────────────────────────────────────────────────────────┤
│  dist/v2/                                                     │
│    content.js   manifest.json   icons/                        │
│    (MV2 manifest swapped in via CopyPlugin)                   │
├───────────────────────────────────────────────────────────────┤
│  dist/v3/                                                     │
│    content.js   manifest.json   icons/                        │
│    (MV3 manifest swapped in via CopyPlugin)                   │
├───────────────────────────────────────────────────────────────┤
│  make build → zip, xpi (web-ext), crx (Chrome --pack-extension)│
│  artifacts land in download/v2 and download/v3                │
└───────────────────────────────────────────────────────────────┘
```

The single content entry compiles twice — once per manifest version — and
CopyPlugin injects the matching `manifest.json` into each `dist/` directory.
Output filename is `content.js`.

## Application Layers

```txt
┌───────────────────────────────────────────────┐
│  Content (src/content.ts)                     │  Runs on Instagram only
│  - lastRightClick timestamp (ms)              │  (document_idle)
│  - 'contextmenu' listener:                    │
│    · if two right-clicks within 400ms:        │
│    · event.preventDefault() (no native menu)  │
│    · collect <img> from target + children +   │
│      siblings via querySelectorAll('img')     │
│    · dedupe by src                            │
│    · open each in _blank via hidden <a> click │
├───────────────────────────────────────────────┤
│  Manifests (public/manifest/{v2,v3})          │  Declares content script
│                                               │  match *://*.instagram.com/*
└───────────────────────────────────────────────┘
```

There is no background script, popup, or options page.

## Manifest Versions

| Concern            | Manifest V2                            | Manifest V3                              |
| ------------------ | -------------------------------------- | ---------------------------------------- |
| Permissions        | `activeTab`                            | `activeTab`                              |
| Host access        | content_scripts `matches` `*://*.instagram.com/*` | `host_permissions` `*://*.instagram.com/*` |
| Content script     | `content.js`, `run_at: document_idle`  | `content.js`, `run_at: document_idle`    |
| Background/action  | — (none)                               | — (none)                                 |

## Gesture Strategy

- **Double right-click** — two `contextmenu` events within a 400ms window
  trigger the action; a single right-click still shows the native menu.
- **Nearby images** — `querySelectorAll('img')` over the target element, its
  children, and sibling elements collects the visible image set; results are
  deduplicated by `src` to avoid duplicate tabs.
- **Opening** — each unique image URL opens in a new tab by creating and
  clicking a hidden `<a target="_blank">` element.

## State Management

- **None** — only the transient `lastRightClick` timestamp; no storage, no
  background state.

## Performance

- A single `contextmenu` listener; work only happens on the double-click
  gesture
- Runs `document_idle` so it never contends with page load
- No remote resources, lists, or analytics — fully offline and lightweight