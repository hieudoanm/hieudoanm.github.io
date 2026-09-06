# Architecture

## Goals

- Cross-browser extension that runs on Chromium browsers (Chrome, Edge, Brave,
  Opera, Vivaldi, Arc) and Gecko browsers (Firefox, Tor)
- Ship both **Manifest V2** and **Manifest V3** builds from a single source
- On claude.ai, surface API rate-limit usage inline near the composer and in
  the toolbar badge
- Zero-config, permissions scoped to the claude.ai origin + `storage`
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                                                            |
| ----------- | --------------------------------------------------------------------- |
| Runtime     | Browser extension (WebExtension API, both MV2 and MV3)                |
| Language    | TypeScript 6 (strict)                                                 |
| Build       | Webpack 5 + ts-loader                                                 |
| Manifests   | MV2 + MV3 (identical, permission shape differs)                       |
| Storage     | `localStorage` (content cache) + `chrome.storage.local` (badge state) |
| Linting     | ESLint 10 + Prettier                                                  |
| Packaging   | Makefile + `web-ext` (zip / xpi / crx)                                |
| Package Mgr | pnpm                                                                  |

## Directory Structure

```txt
src/
├── background.ts    # Badge state (chrome.storage.local + toolbar badge)
└── content.ts       # Fetch patch, usage parsing, inline indicator
public/
├── icons/           # 16x16.png, 48x48.png, 128x128.png, icon.svg
└── manifest/
    ├── v2/
    │   └── manifest.json   # MV2 manifest (storage, browser_action)
    └── v3/
        └── manifest.json   # MV3 manifest (storage, action, host claude.ai)
docs/               # Architecture, roadmap, contributing, packaging, downloads
```

## Build Pipeline

```txt
┌───────────────────────────────────────────────────────────────┐
│  webpack.config.ts                                            │
│  entry:                                                       │
│    background: './src/background.ts'                          │
│    content:    './src/content.ts'                             │
├───────────────────────────────────────────────────────────────┤
│  dist/v2/                                                     │
│    background.js   content.js   manifest.json   icons/        │
│    (MV2 manifest swapped in via CopyPlugin)                   │
├───────────────────────────────────────────────────────────────┤
│  dist/v3/                                                     │
│    background.js   content.js   manifest.json   icons/        │
│    (MV3 manifest swapped in via CopyPlugin)                   │
├───────────────────────────────────────────────────────────────┤
│  make build → zip, xpi (web-ext), crx (Chrome --pack-extension)│
│  artifacts land in download/v2 and download/v3                │
└───────────────────────────────────────────────────────────────┘
```

Each entry compiles twice — once per manifest version — and CopyPlugin injects
the matching `manifest.json` into each `dist/` directory. Output filenames
match the entry names.

## Application Layers

```txt
┌───────────────────────────────────────────────┐
│  Content (src/content.ts)                     │  Runs on claude.ai only
│  - monkey-patches window.fetch                │  (document_idle)
│  - intercepts /rate_limits and /usage bodies  │
│  - caches parsed usage in localStorage        │
│    (claude_limit_data)                        │
│  - renders inline daily/weekly indicator      │
│    (#claude-limit-indicator) near composer    │
│  - MutationObserver + retries + 60s refresh   │
├───────────────────────────────────────────────┤
│  Background (src/background.ts)               │  Service worker (MV3) /
│  - CLAUDE_API_RESPONSE messages → merge +     │  event page (MV2)
│    store in chrome.storage.local ('claudeLimit')│
│  - chrome.storage.onChanged → badge color     │
├───────────────────────────────────────────────┤
│  Manifests (public/manifest/{v2,v3})          │  Matches *://*.claude.ai/*
└───────────────────────────────────────────────┘
```

## Manifest Versions

| Concern        | Manifest V2                                   | Manifest V3                                 |
| -------------- | --------------------------------------------- | ------------------------------------------- |
| Permissions    | `storage`                                     | `storage`                                   |
| Host access    | content_scripts `matches` `*://*.claude.ai/*` | `host_permissions` `*://*.claude.ai/*`      |
| Background     | `background.scripts` + `persistent: false`    | `background.service_worker` `background.js` |
| Action         | `browser_action` (title + icon)               | `action` (title + icon)                     |
| Content script | `content.js`, `run_at: document_idle`         | `content.js`, `run_at: document_idle`       |

The badge API is resolved at runtime as `action` (MV3) falling back to
`browserAction` (MV2), so the badge works on both Chromium and Firefox.

## Rate-Limit Tracking Strategy

- **Passive fetch patch** — `window.fetch` is wrapped once; only responses to
  `/rate_limits` and `/usage` are cloned and inspected. All other requests pass
  through untouched with zero overhead.
- **Tolerant parsing** — the arrays (`rate_limits`, `limits`) and object
  (`daily`/`weekly`, `*_message_count`) shapes are both handled, so either API
  response format updates the same snapshot.
- **Two caches** — the content script keeps a `localStorage` snapshot for the
  inline indicator; the background keeps an independent
  `chrome.storage.local` snapshot to drive the badge.
- **Idempotent indicator** — a single `#claude-limit-indicator` element is
  created or replaced; a `MutationObserver` re-mounts only when it is missing.

## State Management

- **Content** — `localStorage` key `claude_limit_data` holds the last parsed
  daily/weekly usage for the inline indicator.
- **Background** — `chrome.storage.local` key `claudeLimit` holds the latest
  usage snapshot; a `storage.onChanged` listener refreshes the toolbar badge.
- Everything else is stateless and recomputed per request/update.

## Performance

- The fetch patch is a thin wrapper that only inspects two endpoint shapes
- The indicator mounts once and re-renders from cached data on a 60s timer —
  no layout thrash from repeated DOM insertion
- Badge updates are event-driven (storage changes), not polling
- No remote resources, lists, or analytics — fully offline and lightweight
