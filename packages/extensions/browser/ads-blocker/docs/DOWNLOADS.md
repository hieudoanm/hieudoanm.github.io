# Ads Blocker

> Blocks ads, banners, and tracking requests across every web page — without a
> single byte leaving your browser.

![Chromium](https://img.shields.io/badge/Chromium-Chrome%2FEdge%2FBrave%2FOpera%2FVivaldi%2FArc-blue)
![Firefox](https://img.shields.io/badge/Firefox-MV2-lightblue)
![MV3](https://img.shields.io/badge/Manifest-V3-green)

---

## Latest release

- **Version:** `0.0.1` — tag `extensions-browser-ads-blocker-latest`.
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

[download-crx-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-ads-blocker-latest/ads-blocker-v2.crx
[download-crx-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-ads-blocker-latest/ads-blocker-v3.crx
[download-xpi-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-ads-blocker-latest/ads-blocker-v2.xpi
[download-xpi-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-ads-blocker-latest/ads-blocker-v3.xpi
[download-zip-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-ads-blocker-latest/ads-blocker-v2.zip
[download-zip-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-ads-blocker-latest/ads-blocker-v3.zip

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

[checksums]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-ads-blocker-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/extensions/browser/ads-blocker
pnpm install
pnpm build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Ads Blocker is a stateless, offline browser extension: it cancels network
requests to known ad and tracking domains and hides ad containers in the DOM on
every page — with zero data collection and no remote lists.

---

## Features

### 🚫 Network blocking (MV3)

- Native `declarativeNetRequest` rule set — the browser does the blocking, no
  JavaScript runs on the request path
- Covers doubleclick, Google Analytics, Google Syndication, AdNxs, Outbrain,
  and Taboola

### 🖥️ Network blocking (MV2)

- `webRequest` blocking listener for Firefox and legacy Chromium
- Same domain list as the MV3 ruleset, kept in sync in `background.ts`

### 🧹 DOM hiding

- Hides ad containers, banners, and placeholders via safe attribute selectors
- `MutationObserver` catches ads injected after page load
- Applies `display: none` with `important` so site CSS cannot override it

### 🔒 Privacy

- 100% offline — no lists fetched at runtime, no analytics, no metrics
- No user data collected, transmitted, or stored

---

## First run

- After installing, reload open tabs so the content script attaches.
- If a page still shows an ad frame, hard-reload (`Cmd/Ctrl+Shift+R`).

---

## Next steps

- Check [CONTRIBUTING](CONTRIBUTING) for dev setup, coding conventions, and the
  manual test matrix.
- Browse the [ROADMAP](ROADMAP) for what's shipping next.

---

## License

See [LICENSE](LICENSE).
