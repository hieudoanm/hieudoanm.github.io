# chess.com Focus

## Introduction

## Installation

### Google Chrome / Chromium-based Browsers

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked** and select the `dist/v2` or `dist/v3` folder of this extension.

### Mozilla Firefox

Firefox enforces extension signatures by default for general release channels. You can install or run this extension using these methods:

#### Option A: Temporary Loading (Recommended for Development)

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on...**.
3. Select the `manifest.json` file inside `dist/v2` or `dist/v3`, or select the packed `.zip`/`.xpi` file.
   _(Note: Temporarily loaded add-ons are removed when Firefox restarts.)_

#### Option B: Developer / Nightly Edition (Persistent Installation)

If you are using Firefox Developer Edition, Firefox Nightly, or Firefox ESR:

1. Navigate to `about:config`.
2. Search for `xpinstall.signatures.required`.
3. Double-click to set its value to `false`.
4. Drag and drop the `.xpi` file from `download/` into the browser to install persistently.

#### Option C: Build and Run via `web-ext`

You can automatically run a temporary, auto-reloading Firefox instance with the extension loaded by executing:

```bash
# For Manifest V2
pnpm web-ext run --source-dir ./dist/v2

# For Manifest V3
pnpm web-ext run --source-dir ./dist/v3
```

## License

- **GPL-3.0** - [LICENSE.md](LICENSE.md)
