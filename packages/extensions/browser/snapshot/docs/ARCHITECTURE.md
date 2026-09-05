# Architecture

## Goals

- Cross-browser extension that runs on Chromium browsers (Chrome, Edge, Brave,
  Opera, Vivaldi, Arc) and Gecko browsers (Firefox, Tor)
- Ship both **Manifest V2** and **Manifest V3** builds from a single source
- Capture the visible viewport or the full page of any tab as an image
- Support both automatic download and copy-to-clipboard
- Stitch tall pages cross-device correctly via `OffscreenCanvas` chunking
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer         | Technology                                     |
| ------------- | ---------------------------------------------- |
| Runtime       | Browser extension (WebExtension API, both MV2 and MV3) |
| Language      | TypeScript 6 (strict)                          |
| Build         | Webpack 5 + ts-loader                          |
| Manifests     | MV2 + MV3 (identical, permission shape differs)|
| DOM/Canvas    | Content script + `OffscreenCanvas` stitching   |
| UI            | Action popup (`popup.html`, `popup.ts`)        |
| Linting       | ESLint 10 + Prettier                           |
| Packaging     | Makefile + `web-ext` (zip / xpi / crx)         |
| Package Mgr   | pnpm                                           |

## Directory Structure

```txt
src/
├── background.ts   # Message dispatch, capture orchestration (188 lines)
├── content.ts      # Page layout reader (50 lines)
├── popup.ts        # Action popup UI (138 lines)
└── lib/
    └── stitch.ts   # OffscreenCanvas chunk stitching (42 lines)
public/
├── icons/              # 16x16.png, 48x48.png, 128x128.png, icon.svg
├── popup.html          # Popup markup
└── manifest/
    ├── v2/
    │   └── manifest.json   # MV2 manifest (browser_action, <all_urls>)
    └── v3/
        └── manifest.json   # MV3 manifest (action, host_permissions <all_urls>)
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
│  - Sends CAPTURE_VIEW / CAPTURE_FULLPAGE to background     │
├────────────────────────────────────────────────────────────┤
│  Background (src/background.ts)                            │  MV3 service worker /
│  - Listens for capture messages                            │  MV2 background page
│  - Grabs the active tab via chrome.tabs                    │
│  - Requests page layout via SNAP_GET_LAYOUT               │
│  - Scales chunks + stitches via OffscreenCanvas (stitch)   │
│  - Downloads (downloads.download) or clipboard.write       │
├────────────────────────────────────────────────────────────┤
│  Content (src/content.ts)                                  │  Runs <all_urls>
│  - Answers SNAP_GET_LAYOUT / SNAP_SCROLL_TO                │  document_start
│  - Reports scrollY, innerHeight, document size             │
│  - Scrolls the page for full-page stitching                │
├────────────────────────────────────────────────────────────┤
│  lib/stitch (src/lib/stitch.ts)                           │  Shared helper
│  - stitchChunks → OffscreenCanvas composition              │
└────────────────────────────────────────────────────────────┘
```

## Manifest Versions

| Concern            | Manifest V2                          | Manifest V3                            |
| ------------------ | ------------------------------------ | -------------------------------------- |
| Permissions        | `activeTab`, `tabs`, `downloads`, `storage` | `activeTab`, `tabs`, `downloads`, `storage` |
| Host access        | content_scripts `matches` `<all_urls>` | `host_permissions` `<all_urls>`         |
| User interface     | `browser_action` + `popup.html`      | `action` + `popup.html`                |
| Content script     | `content.js`, `run_at: document_start` | `content.js`, `run_at: document_start` |
| Background         | `background.scripts` + `persistent: false` | `background.service_worker`        |

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

- **Minimal** — per-invocation state lives in the message flow; `storage` is
  granted and reserved for future capture options (format, filename).

## Performance

- Content script runs `document_start` so layout metrics are ready the moment
  the user asks to capture
- Chunked scrolling supports very tall pages without hitting canvas size caps
- No remote resources or telemetry — fully offline and lightweight