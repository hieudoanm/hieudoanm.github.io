# Markdown

> A minimal, Obsidian-style notes app that lives offline and syncs with nothing
> but your brain. Works on your phone, tablet, laptop, and desktop — write
> anywhere, find everything.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

![markdown screenshot](https://raw.githubusercontent.com/hieudoanm/hieudoanm.github.io/refs/heads/master/packages/app/hybrid/shopping/store/public/screenshots/markdown/home.png)

---

## Latest release

- **Version:** `app-hybrid-productivity-markdown-latest` — updates ship
  continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the right file for your platform.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note             |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ---------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 4   | Linux    | Fedora | amd64        | 40.+         | [Download `.rpm`][download-rpm]            |                  |
| 5   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                  |
| 6   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon    |
| 7   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |
| 8   | Windows  |        | x64          | 10.+         | [Download `.exe`][download-exe]            | Portable         |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/markdown.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/markdown.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/markdown.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/markdown.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/markdown.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/markdown.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/markdown.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/markdown.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

## First run

- **macOS** — right-click the `.dmg` and choose **Open** to bypass Gatekeeper.
- **Linux** — `chmod +x markdown.AppImage && ./markdown.AppImage`.
- **Windows** — SmartScreen may warn; click **More info → Run anyway**.
- **Android** — Play Protect may block; tap **Install anyway**.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/productivity/markdown
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A minimal, Obsidian-style notes app that keeps your thoughts organized with
wikilinks, graph views, and a live split-pane editor — all running offline on
every device you own.

---

## Features

### ✏️ Editing

- CodeMirror markdown editor
- Live preview pane (split view)
- Markdown formatting toolbar
- Word/character/line stats bar
- Outline/collapse support in editor
- Scroll sync between editor and preview

### 📁 Vault

- Vault sidebar with note tree
- File operations (new, rename, save, delete)
- Seeded vault with categorized notes
- Wikilink resolution and navigation
- Slug-based note addressing

### 🔍 Navigation & Search

- Table of contents sidebar
- Full-text search across the vault
- Graph view of note links

### 📤 Export & Platform

- Export notes as PDF, HTML (DOCX pending)
- Custom themes and fonts (lib/fonts)
- Tauri desktop app build (bundling configured; signing not yet)

---

## Next steps

- Found a bug or want a feature? See [CONTRIBUTING](CONTRIBUTING) to get
  started.
- Curious what's coming next? Check the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
