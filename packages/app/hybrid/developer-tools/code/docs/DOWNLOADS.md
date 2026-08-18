# Code

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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-code-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-code-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-code-latest/code_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-code-latest/code_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-code-latest/code_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-code-latest/code_x64.msi

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-code-latest/SHA256SUMS.txt

## About

Code — minimal VSCode / Zed editor.

## Features

## File System

- File explorer sidebar with tree view
- Create/rename/delete files and folders
- Status bar with language and position
- Auto-save (2s debounce to the real filesystem via Tauri plugin-fs)

## Editor

- Code editor with line numbers and syntax highlighting
- Tab management (open, close, reorder)
- Bracket matching and auto-closing
- Current line highlight
- Word wrap toggle
- Font size zoom (Ctrl+/-)
- Breadcrumb navigation

## Editing

- Find in file (Ctrl+F) with match count and navigation
- Find and replace (Ctrl+H) with regex support
- Find in files (Ctrl+Shift+F) with results grouped by file
- Multi-cursor editing (Ctrl+Alt+up/down, Ctrl+D)
- Auto-close HTML/JSX tags
- Move line up/down (Alt+up/down)
- Delete line (Ctrl+Shift+K)

## Command & Themes

- Command palette (Ctrl+P for files; Ctrl+Shift+P commands pending)
- Keyboard shortcuts modal (Ctrl+/)
- Theme marketplace (custom editor themes — dim/winter toggle)
- Additional language support (ts/tsx/js/jsx/py/rs/md/json/css/html/xml)

## Platform

- Tauri desktop app build (bundling configured; signing not yet)

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
