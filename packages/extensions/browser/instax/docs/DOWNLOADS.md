# InstaX

> Open nearby Instagram images with a double right-click — get full-resolution
> originals out of the grid in one gesture.

![Chromium](https://img.shields.io/badge/Chromium-Chrome%2FEdge%2FBrave%2FOpera%2FVivaldi%2FArc-blue)
![Firefox](https://img.shields.io/badge/Firefox-MV2-lightblue)
![MV3](https://img.shields.io/badge/Manifest-V3-green)

---

## Latest release

- **Version:** `0.0.1` — tag `extensions-browser-instax-latest`.
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

[download-crx-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-instax-latest/instax-v2.crx
[download-crx-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-instax-latest/instax-v3.crx
[download-xpi-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-instax-latest/instax-v2.xpi
[download-xpi-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-instax-latest/instax-v3.xpi
[download-zip-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-instax-latest/instax-v2.zip
[download-zip-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-instax-latest/instax-v3.zip

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

[checksums]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-instax-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/extensions/browser/instax
pnpm install
pnpm build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

InstaX is a scoped, content-script-only extension that runs on Instagram. A
double right-click (two right-clicks within 400ms) on a post or grid collects
every image in the target, its children, and adjacent siblings, deduplicates
them by source, and opens each one in a new tab — so you go from grid to
full-size originals in a single gesture. A single right-click behaves exactly
as normal. Fully offline, no data stored.

---

## Features

### 🖱️ Double right-click gesture

- Two `contextmenu` events within the 400ms window trigger the action
- `preventDefault()` suppresses the native menu only on the gesture

### 🖼️ Nearby image collection

- Collects `<img>` from the target, its children, and sibling elements
- Deduplicates by `src` so each image opens exactly once

### 🗂️ Open in new tabs

- Each unique URL opens via a hidden `<a target="_blank">` click
- Your current Instagram page stays intact

### 🔒 Privacy

- 100% offline — no remote resources, no analytics, no metrics
- No user data collected, transmitted, or stored

---

## First run

- Open any Instagram page.
- Double right-click on a post or the photo grid.
- All unique images in view open in new tabs.
- A single right-click still shows the normal Instagram menu.

---

## Next steps

- Check [CONTRIBUTING](CONTRIBUTING) for dev setup, coding conventions, and the
  manual test matrix.
- Browse the [ROADMAP](ROADMAP) for what's shipping next.

---

## License

See [LICENSE](LICENSE).