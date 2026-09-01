# Markdown

> A minimal, Obsidian-style notes app that lives offline and syncs with nothing
> but your brain. Works on your phone, tablet, laptop, and desktop — write
> anywhere, find everything.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────────────┐
│ 📝 Markdown            [Sync] [⚙] [···]  │
├────────────────────┬─────────────────────┤
│ 📁 Vault            │ # My Note           │
│ ├─ notes/           │                     │
│ │ ├─ daily/         │ This is a **live**  │
│ │ ├─ projects/      │ preview of my       │
│ │ └─ archive/       │ markdown notes.     │
│ └─ templates/       │                     │
│                     │ - [x] Write docs    │
│ 🔍 Search...        │ - [ ] Ship it       │
│ 📊 Graph            │                     │
├────────────────────┴─────────────────────┤
│ Words: 142  Lines: 18  Characters: 847   │
└──────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-productivity-markdown-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the right file for your platform.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link | Note |
| --- | -------- | ------ | ------------ | ------------ | ------------- | ---- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk] | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹ | For store upload ¹ |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 4   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb] | |
| 5   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]² | Apple Silicon ² |
| 6   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi] | |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/markdown_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/markdown_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/markdown_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/markdown_x64.msi

<br>

¹ The `.aab` bundle is for Google Play store upload — sideload the `.apk`
instead.

² The `.dmg` is a universal Apple Silicon binary.

## First run

- **macOS** — right-click the `.dmg` and choose **Open** to bypass Gatekeeper.
- **Linux** — `chmod +x markdown_amd64.AppImage && ./markdown_amd64.AppImage`.
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

## First run

---

## Next steps

- Found a bug or want a feature? See [CONTRIBUTING](CONTRIBUTING) to get
  started.
- Curious what's coming next? Check the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).