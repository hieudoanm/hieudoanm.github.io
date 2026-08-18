# Markdown

## Installation

| Platform | Distro | Architecture | Requirements | Download Link                              |
| -------- | ------ | ------------ | ------------ | ------------------------------------------ |
| Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            |
| Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           |
| Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] |
| Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |
| macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           |
| Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |

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

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-productivity-markdown-latest/SHA256SUMS.txt

## About

Markdown — minimal Obsidian-style notes app.

## Features

## Editing

- CodeMirror markdown editor
- Live preview pane (split view)
- Markdown formatting toolbar
- Word/character/line stats bar
- Outline/collapse support in editor
- Scroll sync between editor and preview

## Vault

- Vault sidebar with note tree
- File operations (new, rename, save, delete)
- Seeded vault with categorized notes
- Wikilink resolution and navigation
- Slug-based note addressing

## Navigation & Search

- Table of contents sidebar
- Full-text search across the vault
- Graph view of note links

## Export & Platform

- Export notes as PDF, HTML (DOCX pending)
- Custom themes and fonts (lib/fonts)
- Tauri desktop app build (bundling configured; signing not yet)

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
