# Architecture

## Goals

- Cross-browser extension that runs on Chromium browsers (Chrome, Edge, Brave,
  Opera, Vivaldi, Arc) and Gecko browsers (Firefox, Tor)
- Ship both **Manifest V2** and **Manifest V3** builds from a single source
- Block 10 known distracting sites and replace them with a "boredom wall" that
  nudges the user toward better things to do
- Fully offline — no remote lists, no accounts, no data collection
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer         | Technology                                     |
| ------------- | ---------------------------------------------- |
| Runtime       | Browser extension (WebExtension API, both MV2 and MV3) |
| Language      | TypeScript 6 (strict)                          |
| Build         | Webpack 5 + ts-loader                          |
| Manifests     | MV2 + MV3 (identical, permission shape differs)|
| DOM           | Content script only (page replacement)         |
| Linting       | ESLint 10 + Prettier                           |
| Packaging     | Makefile + `web-ext` (zip / xpi / crx)         |
| Package Mgr   | pnpm                                           |

## Directory Structure

```txt
src/
└── content.ts       # Interception + wall UI (single source file)
public/
├── icons/           # 16x16.png, 48x48.png, 128x128.png, icon.svg
└── manifest/
    ├── v2/
    │   └── manifest.json   # MV2 manifest (activeTab + <all_urls> content)
    └── v3/
        └── manifest.json   # MV3 manifest (host_permissions <all_urls>)
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
│  Content (src/content.ts)                     │  Runs at document_start on
│  - BLOCKED_DOMAINS (10 distracting sites)     │  every page (<all_urls>)
│  - isBlocked(): hostname/subdomain matching   │
│  - buildWall(): replacement DOM               │
│    (.bored-wall, .wheel-display, .wheel-button)│
│  - spinSuggestions(): wheel animation         │
│  - renderBlockedWall(): swaps page DOM        │
├───────────────────────────────────────────────┤
│  Manifests (public/manifest/{v2,v3})          │  Declares activeTab +
│                                               │  <all_urls> content script
└───────────────────────────────────────────────┘
```

There is no background script, popup, or options page — the extension is
self-contained in one content script.

## Manifest Versions

| Concern            | Manifest V2                            | Manifest V3                              |
| ------------------ | -------------------------------------- | ---------------------------------------- |
| Permissions        | `activeTab`                            | `activeTab`                              |
| Host access        | content_scripts `matches` `<all_urls>` | `host_permissions` `<all_urls>`          |
| Content script     | `content.js`, `run_at: document_start` | `content.js`, `run_at: document_start`   |
| Background/action  | — (none)                               | — (none)                                 |

## Blocking Strategy

- **Domain matching** — `normalizeHostname()` strips the `www.` prefix;
  `isBlocked()` returns true when the current hostname equals, or is a
  subdomain of, any entry in `BLOCKED_DOMAINS` (facebook.com, twitter.com,
  x.com, instagram.com, reddit.com, tiktok.com, youtube.com, netflix.com,
  twitch.tv, discord.com).
- **Wall replacement** — on match, `renderBlockedWall()` replaces the entire
  `documentElement.innerHTML` with an offline wall presenting `BETTER_SITES`
  (8 alternatives with URLs) and a suggestion wheel.
- **Wheel** — `spinSuggestions()` cycles through 20 offline `SUGGESTIONS`
  with an exponential pause schedule (`SPIN_BASE_DELAY_MS = 40`,
  `SPIN_DURATION_MS = 2400`) and lands on one activity.

## State Management

- **Minimal** — sessionStorage key `bored_blocked_started_at` records when the
  wall first appeared for the session. Everything else is stateless and
  recomputed per page load.

## Performance

- A single content script with zero network calls; after the wall renders no
  observers or timers remain active
- Matching is a constant-time check against a 10-entry domain list
- Fully offline and lightweight