# Architecture

## Goals

- Cross-browser extension that runs on Chromium browsers (Chrome, Edge, Brave,
  Opera, Vivaldi, Arc) and Gecko browsers (Firefox, Tor)
- Ship both **Manifest V2** and **Manifest V3** builds from a single source
- Redirect every new tab to the hieudoanm home page (`https://hieudoanm.github.io/app/`)
- Show zero UI of its own — no popup, no content scripts, no toolbar action
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer         | Technology                                     |
| ------------- | ---------------------------------------------- |
| Runtime       | Browser extension (WebExtension API, both MV2 and MV3) |
| Language      | TypeScript 6 (strict)                          |
| Build         | Webpack 5 + ts-loader                          |
| Manifests     | MV2 + MV3 (identical, permission shape differs)|
| Background    | MV3 service worker / MV2 background page       |
| Linting       | ESLint 10 + Prettier                           |
| Packaging     | Makefile + `web-ext` (zip / xpi / crx)         |
| Package Mgr   | pnpm                                           |

## Directory Structure

```txt
src/
└── background.ts   # New-tab interception (single source file)
public/
├── icons/           # 16x16.png, 48x48.png, 128x128.png, icon.svg
└── manifest/
    ├── v2/
    │   └── manifest.json   # MV2 manifest (tabs + <all_urls>)
    └── v3/
        └── manifest.json   # MV3 manifest (tabs + host_permissions <all_urls>)
docs/               # Architecture, roadmap, contributing, packaging, downloads
```

## Build Pipeline

```txt
┌───────────────────────────────────────────────────────────────┐
│  webpack.config.ts                                            │
│  entry: { background: './src/background.ts' }                 │
├───────────────────────────────────────────────────────────────┤
│  dist/v2/                                                     │
│    background.js   manifest.json   icons/                     │
│    (MV2 manifest swapped in via CopyPlugin)                   │
├───────────────────────────────────────────────────────────────┤
│  dist/v3/                                                     │
│    background.js   manifest.json   icons/                     │
│    (MV3 manifest swapped in via CopyPlugin)                   │
├───────────────────────────────────────────────────────────────┤
│  make build → zip, xpi (web-ext), crx (Chrome --pack-extension)│
│  artifacts land in download/v2 and download/v3                │
└───────────────────────────────────────────────────────────────┘
```

The single background entry compiles twice — once per manifest version — and
CopyPlugin injects the matching `manifest.json` into each `dist/` directory.
Output filename is `background.js`.

## Application Layers

```txt
┌───────────────────────────────────────────────┐
│  Background (src/background.ts)               │  MV3 service worker / MV2
│  - TARGET_URL = hieudoanm.github.io/app/      │  background page
│  - isNewTab(url): matches chrome://newtab,    │
│    about:newtab, about:home,                  │
│    about:privatebrowsing prefixes             │
│  - chrome.tabs.onCreated → check tab.url /    │
│    tab.pendingUrl → tabs.update(TARGET_URL)   │
│  - chrome.tabs.onUpdated → check changeInfo.  │
│    url → tabs.update(TARGET_URL)              │
├───────────────────────────────────────────────┤
│  Manifests (public/manifest/{v2,v3})          │  Declares 'tabs' permission
│                                               │  + background scripts
└───────────────────────────────────────────────┘
```

There are no content scripts, popups, or options pages — the extension works
entirely from the background context and is invisible otherwise.

## Manifest Versions

| Concern            | Manifest V2                            | Manifest V3                              |
| ------------------ | -------------------------------------- | ---------------------------------------- |
| Permissions        | `tabs`, `<all_urls>`                   | `tabs`                                   |
| Host access        | `<all_urls>` permission                | `host_permissions` `<all_urls>`          |
| Background         | `background.scripts` + `persistent: false` | `background.service_worker`          |
| Content/action     | — (none)                               | — (none)                                 |

## Redirect Strategy

- **New-tab detection** — `isNewTab()` matches URLs whose prefix is one of
  `chrome://newtab`, `about:newtab`, `about:home`, or
  `about:privatebrowsing`.
- **Two event hooks** — `tabs.onCreated` inspects `tab.url` and
  `tab.pendingUrl` (a tab can be created "pending" before it has a final URL)
  and `tabs.onUpdated` inspects `changeInfo.url`, covering both the moment a
  tab opens and any navigation to a new-tab URL.
- **Redirect** — matches are rewritten via `chrome.tabs.update(tabId,
  { url: TARGET_URL })`, landing on the hieudoanm home page.

## State Management

- **None** — stateless and event-driven; no storage, no background state
  beyond the constant `TARGET_URL`.

## Performance

- Only two tab listeners with constant-time prefix checks
- The service worker is near-zero footprint; it wakes only on tab events
- No remote resources or telemetry — fully offline and lightweight