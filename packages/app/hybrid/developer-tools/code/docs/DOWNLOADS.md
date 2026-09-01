# Code

> A pocket-sized code editor — syntax highlighting, multi-cursor, find in
> files, and more, right on your phone, tablet, laptop, or desktop.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌─────────────────────────────────────┐
│  CODE                    ⚙  👤     │
├──────────┬──────────────────────────┤
│ 📁 src/  │  1 │ const app = () => { │
│   index  │  2 │   return (          │
│   util   │  3 │     <Hello />       │
│ 📁 test/ │  4 │   );                │
│          │  5 │ };                   │
│          │  ─────────────────────   │
│          │  TypeScript  Ln 1, Col 1 │
└──────────┴──────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-developer-tools-code-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform and you're good to go.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note             |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ---------------- |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install |
| 4   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                  |
| 5   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon    |
| 6   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |

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

<br>

¹ The `.aab` bundle is for Google Play upload, not direct install.

² Apple Silicon (M1+) only. macOS 13 required.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-developer-tools-code-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/developer-tools/code
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A minimal VSCode / Zed you can carry anywhere — browse files, edit with
multi-cursor, find across projects, and ship code from any device.

---

## Features

All the essentials for editing code on the go.

### 📂 File System
- File explorer sidebar with tree view
- Create/rename/delete files and folders
- Status bar with language and position
- Auto-save (2s debounce to the real filesystem via Tauri plugin-fs)

### ✏️ Editor
- Code editor with line numbers and syntax highlighting
- Tab management (open, close, reorder)
- Bracket matching and auto-closing
- Current line highlight
- Word wrap toggle
- Font size zoom (Ctrl+/-)
- Breadcrumb navigation

### 🔍 Editing
- Find in file (Ctrl+F) with match count and navigation
- Find and replace (Ctrl+H) with regex support
- Find in files (Ctrl+Shift+F) with results grouped by file
- Multi-cursor editing (Ctrl+Alt+up/down, Ctrl+D)
- Auto-close HTML/JSX tags
- Move line up/down (Alt+up/down)
- Delete line (Ctrl+Shift+K)

### 🎛️ Command & Themes
- Command palette (Ctrl+P for files; Ctrl+Shift+P commands pending)
- Keyboard shortcuts modal (Ctrl+/)
- Theme marketplace (custom editor themes — dim/winter toggle)
- Additional language support (ts/tsx/js/jsx/py/rs/md/json/css/html/xml)

### 🖥️ Platform
- Tauri desktop app build (bundling configured; signing not yet)

---

# First run

- **macOS:** Right-click the `.dmg` and choose **Open** to bypass Gatekeeper.
- **Linux AppImage:** `chmod +x code_amd64.AppImage && ./code_amd64.AppImage`
- **Windows SmartScreen:** Click **More info → Run anyway** if prompted.
- **Android Play Protect:** Tap **Install anyway** if the warning appears.

---

## First run

---

## Next steps

- Check [CONTRIBUTING](CONTRIBUTING) for dev setup, coding conventions, and how to run tests.
- Browse the [ROADMAP](ROADMAP) for what's shipping next.

---

## License

See [LICENSE](LICENSE).