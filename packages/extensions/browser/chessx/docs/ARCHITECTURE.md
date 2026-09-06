# Architecture

## Goals

- Cross-browser extension that runs on Chromium browsers (Chrome, Edge, Brave,
  Opera, Vivaldi, Arc) and Gecko browsers (Firefox, Tor)
- Ship both **Manifest V2** and **Manifest V3** builds from a single source
- On chess.com, hide ratings and usernames so you can focus on the game
- Zero-config, permissions scoped to the chess.com origin only
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                                             |
| ----------- | ------------------------------------------------------ |
| Runtime     | Browser extension (WebExtension API, both MV2 and MV3) |
| Language    | TypeScript 6 (strict)                                  |
| Build       | Webpack 5 + ts-loader                                  |
| Manifests   | MV2 + MV3 (identical, permission shape differs)        |
| DOM         | Content script only (class hiding + observer)          |
| Linting     | ESLint 10 + Prettier                                   |
| Packaging   | Makefile + `web-ext` (zip / xpi / crx)                 |
| Package Mgr | pnpm                                                   |

## Directory Structure

```txt
src/
└── content.ts       # Rating hiding (single source file)
public/
├── icons/           # 16x16.png, 48x48.png, 128x128.png, icon.svg
└── manifest/
    ├── v2/
    │   └── manifest.json   # MV2 manifest (activeTab)
    └── v3/
        └── manifest.json   # MV3 manifest (host_permissions chess.com)
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
│  Content (src/content.ts)                     │  Runs on chess.com only
│  - HIDE_CLASSES: the class names to hide      │  (document_idle)
│  - hideElement(className): sets display:none  │
│  - hideRatings(): applies every class         │
│  - MutationObserver: re-applies hiding as     │
│    chess.com adds/removes DOM nodes           │
├───────────────────────────────────────────────┤
│  Manifests (public/manifest/{v2,v3})          │  Declares content script
│                                               │  match *://*.chess.com/*
└───────────────────────────────────────────────┘
```

There is no background script, popup, or options page. The extension is scoped
exclusively to chess.com.

## Manifest Versions

| Concern           | Manifest V2                                   | Manifest V3                            |
| ----------------- | --------------------------------------------- | -------------------------------------- |
| Permissions       | `activeTab`                                   | `activeTab`                            |
| Host access       | content_scripts `matches` `*://*.chess.com/*` | `host_permissions` `*://*.chess.com/*` |
| Content script    | `content.js`, `run_at: document_idle`         | `content.js`, `run_at: document_idle`  |
| Background/action | — (none)                                      | — (none)                               |

## Rating Hiding Strategy

- **Class-based hiding** — a fixed list of live-game and user-tagline classes
  is hidden with `display: none`; safe to run repeatedly (idempotent).
- **`MutationObserver`** — chess.com renders game state asynchronously, so a
  single observer watches the whole document for added/removed nodes and
  re-applies hiding whenever the DOM churns.
- **No mutation of page logic** — elements are only hidden, never removed, so
  chess.com state stays intact.

## State Management

- **None** — the extension is stateless. Behavior is deterministic from the
  DOM; no storage, no background state.

## Performance

- A single `MutationObserver` with `childList` + `subtree`; each mutation
  batch triggers one pass over the fixed class list
- `getElementsByClassName` is a live, fast built-in lookup
- Runs `document_idle` so it never contends with page load
- No remote resources, lists, or analytics — fully offline and lightweight
