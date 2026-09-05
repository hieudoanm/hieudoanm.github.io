# Architecture

## Goals

- Cross-browser extension that runs on Chromium browsers (Chrome, Edge, Brave,
  Opera, Vivaldi, Arc) and Gecko browsers (Firefox, Tor)
- Ship both **Manifest V2** and **Manifest V3** builds from a single source
- On GitHub pages, open external (non-github.com) links in a new tab without
  leaving the current repo
- Zero-config, zero-permission creep beyond the GitHub origin
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer         | Technology                                     |
| ------------- | ---------------------------------------------- |
| Runtime       | Browser extension (WebExtension API, both MV2 and MV3) |
| Language      | TypeScript 6 (strict)                          |
| Build         | Webpack 5 + ts-loader                          |
| Manifests     | MV2 + MV3 (identical, permission shape differs)|
| DOM           | Content script only (click interception)       |
| Linting       | ESLint 10 + Prettier                           |
| Packaging     | Makefile + `web-ext` (zip / xpi / crx)         |
| Package Mgr   | pnpm                                           |

## Directory Structure

```txt
src/
└── content.ts       # Link interception (single source file)
public/
├── icons/           # 16x16.png, 48x48.png, 128x128.png, icon.svg
└── manifest/
    ├── v2/
    │   └── manifest.json   # MV2 manifest (activeTab)
    └── v3/
        └── manifest.json   # MV3 manifest (host_permissions github.com)
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
│  Content (src/content.ts)                     │  Runs on github.com only
│  - isGitHubUrl(url): contains 'github.com'    │  (document_idle)
│  - getAbsoluteUrl(href): resolves relative    │
│    hrefs against https://github.com           │
│  - document 'click' listener:                 │
│    · find closest <a> ancestor                │
│    · resolve absolute href                    │
│    · if NOT github.com → preventDefault +     │
│      window.open(url, '_blank')               │
├───────────────────────────────────────────────┤
│  Manifests (public/manifest/{v2,v3})          │  Declares content script
│                                               │  match *://github.com/*
└───────────────────────────────────────────────┘
```

There is no background script, popup, or options page. The extension is scoped
exclusively to GitHub.

## Manifest Versions

| Concern            | Manifest V2                            | Manifest V3                              |
| ------------------ | -------------------------------------- | ---------------------------------------- |
| Permissions        | `activeTab`                            | `activeTab`                              |
| Host access        | content_scripts `matches` `*://github.com/*` | `host_permissions` `*://github.com/*` |
| Content script     | `content.js`, `run_at: document_idle`  | `content.js`, `run_at: document_idle`    |
| Background/action  | — (none)                               | — (none)                                 |

## Link Interception Strategy

- **Single delegated listener** — one `click` listener on `document` catches
  all clicks via bubbling; no per-link binding.
- **Relative resolution** — `getAbsoluteUrl()` resolves `/foo` and relative
  paths against `https://github.com` so comparison is always against a fully
  qualified URL.
- **External-only trigger** — if the resolved destination is a github.com URL,
  nothing happens; otherwise `event.preventDefault()` stops navigation and
  `window.open(url, '_blank')` opens the link in a new tab.
- **Ignores** — `#` fragment links and `javascript:` URIs pass through.

## State Management

- **None** — the extension is stateless. Behavior is purely event-driven from
  click events; no storage, no background state.

## Performance

- A single document-level listener; interception cost is one
  `closest('a')` walk per click
- Runs `document_idle` so it never contends with page load
- No remote resources, lists, or analytics — fully offline and lightweight