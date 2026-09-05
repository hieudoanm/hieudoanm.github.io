# Snapshot

> Capture the visible viewport or the full page of any tab — in one click.

![Chromium](https://img.shields.io/badge/Chromium-Chrome%2FEdge%2FBrave%2FOpera%2FVivaldi%2FArc-blue)
![Firefox](https://img.shields.io/badge/Firefox-MV2-lightblue)
![MV3](https://img.shields.io/badge/Manifest-V3-green)

---

## Latest release

- **Version:** `0.0.1` — tag `extensions-browser-snapshot-latest`.
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

[download-crx-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-snapshot-latest/snapshot-v2.crx
[download-crx-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-snapshot-latest/snapshot-v3.crx
[download-xpi-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-snapshot-latest/snapshot-v2.xpi
[download-xpi-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-snapshot-latest/snapshot-v3.xpi
[download-zip-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-snapshot-latest/snapshot-v2.zip
[download-zip-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-snapshot-latest/snapshot-v3.zip

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

[checksums]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-snapshot-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/extensions/browser/snapshot
pnpm install
pnpm build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

Snapshot turns the toolbar into a camera. Open the popup and choose **Capture
view** for a screenshot of what's on screen or **Capture full page** for the
entire scrollable page — stitched seamlessly from chunks on an
`OffscreenCanvas`, so even very tall articles capture cleanly across screen
sizes. The finished image downloads straight to your default folder. Fully
offline, no data leaves your machine.

---

## Features

### 📸 Capture view

- One-click screenshot of the visible viewport
- Delivered via `downloads.download` as an image file

### 📜 Capture full page

- Scrolls and stitches the whole page with `SNAP_GET_LAYOUT`/`SNAP_SCROLL_TO`
- Chunked `OffscreenCanvas` composition preserves aspect ratio on tall pages
- Scroll position is restored after the capture

### 🖼️ About the output

- Built from the live page, so lazy-loaded content that renders counts
- Protected pages (`chrome://`, `about:`) surface a clear error instead of a
  blank capture

### 🔒 Privacy

- 100% offline — no remote resources, no analytics
- No user data collected, transmitted, or stored; the image stays on your disk

---

## First run

- Pin Snapshot to the toolbar.
- Open any page and click the icon.
- Choose **Capture view** or **Capture full page** — the image downloads.
- Try it on a long article to see the full-page stitch in action.

---

## Next steps

- Check [CONTRIBUTING](CONTRIBUTING) for dev setup, coding conventions, and the
  manual test matrix.
- Browse the [ROADMAP](ROADMAP) for what's shipping next.

---

## License

See [LICENSE](LICENSE).