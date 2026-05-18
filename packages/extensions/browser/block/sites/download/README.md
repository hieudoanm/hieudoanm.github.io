# Block Sites Extension

A lightweight browser extension to block distracting or unwanted websites, showing a clean block page instead.

## Features

- **Network-level Blocking** (`background.ts`):
  - **MV2**: Uses `webRequest` API to cancel requests to blocked domains.
  - **MV3**: Uses `declarativeNetRequest` with `rules.json` for native, performant blocking.
- **Block Page** (`content.ts`): Replaces the page with a clean, minimal "Site Blocked" message showing the blocked domain name.

## Structure

- `src/background.ts`: Network request blocking logic.
- `src/content.ts`: Renders the block page when a blocked domain is visited.
- `public/manifest/v2/manifest.json`: Manifest for Manifest V2.
- `public/manifest/v3/manifest.json`: Manifest for Manifest V3.
- `public/manifest/v3/rules.json`: Declarative Net Request rules (MV3).
- `public/icons/`: Extension icons (16×16, 48×48, 128×128).

## Build

```bash
pnpm run build
```

Generates `.zip`, `.xpi`, and `.crx` packages in `download/v2` and `download/v3`.

## Installation

### Chrome / Chromium

1. Go to `chrome://extensions/` → Enable **Developer mode**.
2. Click **Load unpacked** → select `dist/v2` or `dist/v3`.

### Firefox

1. Go to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...** → select any file inside `dist/v2` or `dist/v3`.
