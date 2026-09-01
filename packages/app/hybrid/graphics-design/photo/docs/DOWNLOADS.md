# Photo

> A minimal Adobe Photoshop-style image editor that runs everywhere — phone, tablet, laptop, and desktop. Adjust, layer, crop, and export polished images from any screen.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌─────────────────────────────────┐
│  ┌───────┬──────────────┐      │
│  │ layer │  ┌────────┐  │      │
│  │ ░░░░  │  │  image  │  │      │
│  │ ▓▓▓▓  │  │  canvas │  │      │
│  └───────┘  └────────┘  │      │
│  layers │ adjust │ export│      │
└─────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-graphics-design-photo-latest` — updates ship continuously.
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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-photo-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-photo-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-photo-latest/photo_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-photo-latest/photo_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-photo-latest/photo_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-photo-latest/photo_x64.msi

<br>

¹ The `.aab` bundle is for uploading to app stores; install the `.apk` directly on your device.

² Right-click the `.dmg`, choose **Open**, then drag the app into your Applications folder.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-photo-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/graphics-design/photo
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

---

## About

A pocket-sized image editor with layers, AI tools, and social export presets — Photoshop stripped to the essentials, running natively on every device you own.

---

## Features

### 🖼️ Library

- Image library with grid/list view
- Image upload with drag-and-drop
- Demo images seed data
- Responsive layout

### 🎚️ Editor

- Canvas editor workspace
- Zoom controls (slider, presets, fit-to-screen)
- Canvas info bar (zoom, coordinates, dimensions)
- Before/after comparison (split view or toggle)
- Skeleton loading states

### 🎨 Adjustments

- Brightness, contrast, saturation sliders
- Hue and temperature controls
- Exposure, highlights, shadows
- Clarity, vibrance, sharpness
- Noise reduction slider
- Vignette effect
- 20+ preset filters with intensity slider
- Reset per adjustment and reset all

### 📝 Text & Layers

- Text tool with font selector
- Text properties (size, color, bold, italic, alignment)
- Layer panel with thumbnails
- Per-layer opacity slider
- Blend modes (Normal, Multiply, Screen, Overlay, etc.)
- Layer visibility toggle and lock
- New empty layer
- Layer naming

### 🧪 Tools & AI

- Crop and transform tools
- Image resizing and canvas size adjustment
- Background removal (mock AI tool)
- AI-enhance (mock: auto-levels, auto-color)

### 📤 Export & Platform

- Social media export presets (Instagram, Twitter, Facebook sizes)
- Tauri desktop app build (bundling configured; signing not yet)

---

## Next steps

- Want to contribute? Check the [CONTRIBUTING](CONTRIBUTING) guide.
- Curious what's coming? See the [roadmap](ROADMAP).

---

## License

See [LICENSE](LICENSE).
