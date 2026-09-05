# GitHubX

> Opens external (non-github.com) links in a new tab right from GitHub — keep
> your repo page intact while docs open alongside.

![Chromium](https://img.shields.io/badge/Chromium-Chrome%2FEdge%2FBrave%2FOpera%2FVivaldi%2FArc-blue)
![Firefox](https://img.shields.io/badge/Firefox-MV2-lightblue)
![MV3](https://img.shields.io/badge/Manifest-V3-green)

---

## Latest release

- **Version:** `0.0.1` — tag `extensions-browser-githubx-latest`.
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

[download-crx-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-githubx-latest/githubx-v2.crx
[download-crx-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-githubx-latest/githubx-v3.crx
[download-xpi-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-githubx-latest/githubx-v2.xpi
[download-xpi-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-githubx-latest/githubx-v3.xpi
[download-zip-v2]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-githubx-latest/githubx-v2.zip
[download-zip-v3]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-githubx-latest/githubx-v3.zip

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

[checksums]: https://github.com/hieudoanm/hieudoanm.github.io/releases/download/extensions-browser-githubx-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/extensions/browser/githubx
pnpm install
pnpm build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

GitHubX is a tiny, scoped content script that runs only on `github.com`. When
you click a link pointing anywhere outside GitHub, it intercepts the
navigation and opens the destination in a new tab — leaving your current repo,
PR, or issue page untouched. It never touches internal GitHub links, anchors,
or `javascript:` URIs. Fully offline, no data stored.

---

## Features

### 🔗 External links in new tabs

- One delegated `click` listener on `document` — no per-link bindings
- Resolves relative hrefs against `https://github.com` before deciding
- `preventDefault()` + `window.open(url, '_blank')` only for external links

### 🧭 GitHub-native behavior preserved

- Internal `github.com` links navigate normally in the same tab
- `#anchors` and `javascript:` URIs are ignored
- Runs at `document_idle` so page load is never slowed

### 🔒 Privacy

- 100% offline — no remote resources, no analytics, no metrics
- No user data collected, transmitted, or stored

---

## First run

- Open any GitHub page (repo, issue, PR, gist).
- Click an external link — e.g. a `github.io` page, docs site, or license
  link — and it opens in a new tab.
- Nothing else changes; GitHub links behave exactly as before.

---

## Next steps

- Check [CONTRIBUTING](CONTRIBUTING) for dev setup, coding conventions, and the
  manual test matrix.
- Browse the [ROADMAP](ROADMAP) for what's shipping next.

---

## License

See [LICENSE](LICENSE).