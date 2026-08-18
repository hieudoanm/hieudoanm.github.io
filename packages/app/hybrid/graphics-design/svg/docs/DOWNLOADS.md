# SVG

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

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-graphics-design-svg-latest/SHA256SUMS.txt

## About

SVG — minimal Adobe Illustrator-style vector editor.

## Features

## Document & Canvas

- Document library with grid view
- Canvas workspace with pan and zoom
- Demo SVGs seed data
- Responsive layout
- Rulers on canvas edges
- Grid overlay and snap-to-grid
- Skeleton loading states

## Tools

- Rectangle and ellipse tools
- Line tool
- Pen tool (point-click paths; bezier handles pending)
- Freehand pencil tool (path simplification pending)
- Close path on first point click
- Point text tool
- Selection with bounding box and resize handles
- Duplicate (Ctrl+D)

## Properties

- Fill and stroke color pickers
- Properties panel (x, y, width, height, rotation)
- Font selector and text properties
- Stroke dash array editor
- Stroke cap and join styles
- Opacity per object

## Layers & Symbols

- Layer panel with visibility and lock
- Create symbol from selection
- Symbol library panel
- Instance placement from library
- Edit master symbol (updates all instances)
- Detach symbol instance
- Component library (shared symbols across documents)

## Export & Platform

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

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
