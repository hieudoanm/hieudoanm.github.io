# Block Ads and Banners Extension

A simple, lightweight, and extremely powerful browser extension to block advertisements, banners, and analytics/tracking scripts.

## Features

- **Network Request Blocking**: Blocks calls to popular ad networks (DoubleClick, Google Analytics, Outbrain, Taboola, etc.).
  - Uses `webRequest` API for Manifest V2.
  - Uses declarative network rules (`declarativeNetRequest` with `rules.json`) for Manifest V3.
- **DOM Hiding Engine**: Runs a high-performance content script that continuously detects and hides ad elements (`.ads`, `ins.adsbygoogle`, etc.) from the page to keep pages clean and banner-free.

## Structure

- `src/background.ts`: Coordinates network blocking logic.
- `src/content.ts`: Handles DOM-hiding and dynamic mutation observer.
- `public/v2/manifest.json`: Manifest file for Manifest V2 compatibility.
- `public/v3/manifest.json`: Manifest file for Manifest V3 compatibility.
- `public/v3/rules.json`: Declarative Net Request rules for Manifest V3.

## Build and Package

Run from the root or within the extension directory:

```bash
pnpm run build
```

This generates the packaged `.zip`, `.xpi`, and `.crx` extensions in the `download/v2` and `download/v3` directories!

## Installation

### Google Chrome / Chromium Browsers

1. Open Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** in the top right.
3. Click **Load unpacked** and select either the `dist/v2` or `dist/v3` folder.

### Mozilla Firefox

1. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...**.
3. Select any file within the compiled `dist/v2` or `dist/v3` folder (e.g. `manifest.json`).
