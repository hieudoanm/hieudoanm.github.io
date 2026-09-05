# hieudoanm Extension

> Track Claude usage, detect Shopify stores, hide chess.com ratings, and grab
> YouTube transcripts — four site enhancements in one extension.

![Chromium](https://img.shields.io/badge/Chromium-Chrome%2FEdge%2FBrave%2FOpera%2FVivaldi%2FArc-blue)
![Firefox](https://img.shields.io/badge/Firefox-MV2-lightblue)
![MV3](https://img.shields.io/badge/Manifest-V3-green)

---

## Latest release

- **Version:** `1.0.0` — tag `extensions-browser-hieudoanm-extension-latest`.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your browser and manifest version.

### Downloads

| No  | Manifest | Format | Download Link               |
| --- | -------- | ------ | --------------------------- |
| 1   | V2       | `.crx` | [Download][download-crx-v2] |
| 2   | V3       | `.crx` | [Download][download-crx-v3] |
| 3   | V2       | `.xpi` | [Download][download-xpi-v2] |
| 4   | V3       | `.xpi` | [Download][download-xpi-v3] |
| 5   | V2       | `.zip` | [Download][download-zip-v2] |
| 6   | V3       | `.zip` | [Download][download-zip-v3] |

[download-crx-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-hieudoanm-extension-latest/hieudoanm-extension-v2.crx
[download-crx-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-hieudoanm-extension-latest/hieudoanm-extension-v3.crx
[download-xpi-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-hieudoanm-extension-latest/hieudoanm-extension-v2.xpi
[download-xpi-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-hieudoanm-extension-latest/hieudoanm-extension-v3.xpi
[download-zip-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-hieudoanm-extension-latest/hieudoanm-extension-v2.zip
[download-zip-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-hieudoanm-extension-latest/hieudoanm-extension-v3.zip

### Installation by browser

- **Chrome / Edge / Brave / Opera / Vivaldi / Arc (MV3):** open
  `chrome://extensions` (or `edge://extensions`), enable **Developer mode**,
  drag the `.crx` onto the page. For the `.zip`, click **Load unpacked** and
  select the `dist/v3` folder.
- **Firefox (MV2):** open `about:addons`, click the gear icon → **Install Add-on
  From File** and choose the `.xpi`. For the `.zip`, use `about:debugging` →
  **This Firefox** → **Load Temporary Add-on**.
- Firefox temporarily ignores signing for debugging; the `.xpi` from the
  release is signed for permanent use.

### Checksums

> 🛡️ **Verify your download.** Every asset ships with a SHA-256 digest. See
> [SHA256SUMS.txt][checksums].

[checksums]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-hieudoanm-extension-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/extensions/browser/hieudoanm
pnpm install
pnpm build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

The hieudoanm Extension is a single install that augments four sites you use
every day: it surfaces your Claude.ai API rate-limit usage inline and on the
toolbar badge, tells you whether a store runs on Shopify or Shopify Plus,
hides chess.com ratings so you can focus on the game, and pulls editable
transcripts straight from YouTube's caption tracks. Every feature is offline
and transparent — no data is collected or sent anywhere.

---

## Features

### 🤖 Claude.ai usage tracking

- Inline indicator (daily/weekly %) with reset countdowns near the composer
- Toolbar badge color: green <60%, yellow 60–89%, red ≥90%
- Intercepts only `/rate_limits` and `/usage` responses via a fetch wrapper

### 🛍️ Shopify detection

- Detects Shopify via `window.Shopify`, checkout meta tags, `cdn.shopify.com`
  scripts, and `/cart.js`
- Detects Shopify Plus via the `checkout.shopify` hostname and wallet meta
- Answers `CHECK_SHOPIFY` messages with the result

### ♟️ chess.com focus

- Hides live-game components, rating, and username elements
- `MutationObserver` re-hides elements added during play

### 📺 YouTube transcripts

- Extracts caption-track text via `ytInitialPlayerResponse` + `DOMParser`
- Returns the concatenated transcript on `GET_TRANSCRIPT` messages

### 🔒 Privacy

- 100% offline — no remote lists or analytics
- No user data collected or transmitted; only local usage caches

---

## First run

- **Claude.ai:** open a conversation — the usage indicator appears; the toolbar
  badge updates with your usage color.
- **Shopify:** visit any store — detection runs silently; nothing pops up.
- **chess.com:** open a game — ratings and usernames are hidden.
- **YouTube:** a transcript request returns the caption text.

---

## Next steps

- Check [CONTRIBUTING](CONTRIBUTING) for dev setup, coding conventions, and the
  manual test matrix.
- Browse the [ROADMAP](ROADMAP) for what's shipping next.

---

## License

See [LICENSE](LICENSE).
