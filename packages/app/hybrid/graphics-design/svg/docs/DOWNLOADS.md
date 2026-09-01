# SVG

> A minimal Adobe Illustrator-style vector editor that runs everywhere — phone, tablet, laptop, and desktop. Draw paths, manage symbols, and export pixel-perfect SVG, PNG, or JPEG from any screen.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌─────────────────────────────────┐
│  ┌───────────────────────┐  R  │
│  │    ╔═══════════╗      │  U  │
│  │    ║  path  ●───●    │  L  │
│  │    ║        │      │  E  │
│  │    ╚═══════════╝      │  R  │
│  │                       │  S  │
│  └───────────────────────┘     │
│  layers │ symbols │ properties │
└─────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-graphics-design-svg-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the file that matches your platform and install directly.

### Downloads

| No  | Platform | Distro | Architecture | Requirements | Download Link                              | Note                     |
| --- | -------- | ------ | ------------ | ------------ | ------------------------------------------ | ------------------------ |
| 1   | Android  |        | Universal    | 14.+         | [Download `.apk`][download-apk]            | Install directly         |
| 2   | Android  |        | Universal    | 14.+         | [Download `.aab`][download-aab]¹           | For store upload         |
| 3   | Linux    | Ubuntu | amd64        | 22.04.+      | [Download `.AppImage`][download-app-image] | Run — no install         |
| 4   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                          |
| 5   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon            |
| 6   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                          |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-svg-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-svg-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-svg-latest/svg_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-svg-latest/svg_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-svg-latest/svg_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-svg-latest/svg_x64.msi

<br>

¹ The `.aab` bundle is for uploading to app stores; install the `.apk` directly on your device.

² Right-click the `.dmg`, choose **Open**, then drag the app into your Applications folder.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-svg-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/graphics-design/svg
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A pocket-sized vector editor with paths, symbols, and export — think Illustrator stripped to the essentials, running natively on every device you own.

---

## Features

### 📐 Document & Canvas

- Document library with grid view
- Canvas workspace with pan and zoom
- Demo SVGs seed data
- Responsive layout
- Rulers on canvas edges
- Grid overlay and snap-to-grid
- Skeleton loading states

### 🖊️ Tools

- Rectangle and ellipse tools
- Line tool
- Pen tool (point-click paths; bezier handles pending)
- Freehand pencil tool (path simplification pending)
- Close path on first point click
- Point text tool
- Selection with bounding box and resize handles
- Duplicate (Ctrl+D)

### 🎨 Properties

- Fill and stroke color pickers
- Properties panel (x, y, width, height, rotation)
- Font selector and text properties
- Stroke dash array editor
- Stroke cap and join styles
- Opacity per object

### 🗂️ Layers & Symbols

- Layer panel with visibility and lock
- Create symbol from selection
- Symbol library panel
- Instance placement from library
- Edit master symbol (updates all instances)
- Detach symbol instance
- Component library (shared symbols across documents)

### 📤 Export & Platform

- Export as optimized SVG
- Export as PNG (1x, 2x, 4x)
- Export as JPEG with quality presets (high / medium / low)
- Selection-only export
- Copy SVG to clipboard
- SVG code editor view
- Preview mode (hide UI elements)
- Keyboard shortcuts (V, R, E, L, P, T)
- Snap to grid toggle
- Tauri desktop app build (bundling configured; signing not yet)
- iOS/Android native shells (Tauri mobile entry point wired)

---

## Next steps

- Want to contribute? Check the [CONTRIBUTING](CONTRIBUTING) guide.
- Curious what's coming? See the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
