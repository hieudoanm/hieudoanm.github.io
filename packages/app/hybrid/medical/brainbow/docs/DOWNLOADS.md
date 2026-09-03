# Brainbow

> All-in-one microscopy image analysis for neuron reconstruction — trace, count,
> measure, and report, from your own microscope images. Runs everywhere your
> science does: phone, tablet, laptop, and desktop.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────────────────┐
│  image.tif            neuron count: 12       │
│  ┌────────────────┐  ▸ 4 neurons traced      │
│  │  ╭╮   ╭─╮     │  channels: R G B         │
│  │ ╭╯╰╮ ╭╯ │ ╭╮  │  area: 420 µm²           │
│  │ │  │ │  ╰─╯╰╮ │  density: high           │
│  │ ╰──╯─╯      │ │  color div: 0.74         │
│  │   ╭──╮      ╰─╯│  [ Export SVG ]          │
│  └────┴──┘─┴───┴──┘                         │
└──────────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-medical-brainbow-latest` — updates ship continuously.
- **What's new:** see the [roadmap](ROADMAP) and [CONTRIBUTING](CONTRIBUTING).

---

## Installation

Pick the right file for your device — Android phones install the `.apk`, and
Linux/macOS/Windows grab their native package below.

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
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-brainbow-latest/app-universal-release.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-brainbow-latest/app-universal-release.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-brainbow-latest/brainbow_amd64.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-brainbow-latest/brainbow_amd64.deb
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-brainbow-latest/brainbow_aarch64.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-brainbow-latest/brainbow_x64.msi

<br>

¹ `.aab` is for uploading to the Google Play Store — use the `.apk` to install
directly. ² `.dmg` is built for Apple Silicon.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-brainbow-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/medical/brainbow
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

## First Run

Per-platform launch tips:

- **macOS** — right-click the `.dmg` then **Open** to bypass Gatekeeper the
  first time, or find the app bundle inside.
- **Linux** — make it runnable: `chmod +x brainbow_amd64.AppImage` then
  double-click.
- **Windows** — SmartScreen may warn; choose **More info → Run anyway**.
- **Android** — if Play Protect warns, tap **Install anyway**.

---

## About

From import to publication-ready figures in one seat. Brainbow is an all-in-one
microscopy image analysis tool for neuron reconstruction — trace, count,
measure, annotate, and export from your own Brainbow images, on any screen.

---

## Features

A complete analysis pipeline — import, segment, annotate, export — plus robust
project handling.

### 🧱 Project Foundation

- Monorepo scaffold (app under `packages/app/hybrid/brainbow`)
- Next.js static export validated against Tauri's `dist`
- Tauri desktop shell boots and loads the exported Next.js build
- Tauri Mobile (iOS + Android) boots the same build
- Shared design system: DaisyUI theme, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact

### 🖼️ Image Handling

- Import Brainbow microscopy images (PNG/JPEG/WebP/TIFF)
- Pan/zoom canvas viewer (Canvas2D)
- Channel toggling (R/G/B) with per-channel opacity
- Basic color histogram / channel intensity readout
- Rotate and flip transforms (90° steps) for reoriented acquisitions
- Scale calibration: pixels-per-micron set manually or read from TIFF metadata
- Custom channel mapping for >3 channels (non-RGB acquisition orders)

### 🧬 Segmentation & Analysis

- Manual neuron tracing/labeling tool (polygon/freehand)
- Color-based clustering to suggest distinct neuron "hues" (k-means, TS)
- Cell/neuron counting with per-color tally (connected components per channel)
- Measurement tools: distance, area, and angle readouts (pixel and micron units)
- Per-region statistics (mean intensity, area, centroid) exportable with data
- Quantitative summary panel: neuron counts, color diversity index, area
- Density heatmap overlay from the per-color tally (local neighborhood density)
- Analysis presets: save/load segmentation + counting parameter sets
- z-stack / time-series navigation with per-slice analysis and batch

### 📝 Annotations

- Annotation layers: show/hide, color-code, export as overlay
- Undo/redo history for annotation edits
- Keyboard shortcuts for common tools
- Vertex snapping / guide grid to speed up freehand tracing
- Eraser and lasso-subtract tools for correcting over-segmented traces
- Export annotations to lab-standard formats (ImageJ/Fiji ROI zip, plus more)

### 🚀 Export & Reporting

- Export annotated image as PNG (flattened raster)
- Export results as CSV/JSON
- Batch processing: run segmentation/count across a folder of images
- Report generation (HTML report rendered in-app with Print → PDF)
- Citation-ready methods snippet (for research write-ups)
- Vector figure export (SVG) of annotations + scale bar for publications

### 📦 Projects & Platform

- Local project files: create/open/save `.brainbow` bundles (portable JSON)
- Project export/import as portable `.brainbow` bundle
- File-system access via Tauri (desktop) vs. browser File API (web)
- Native file dialogs, drag-and-drop import (desktop)
- Camera/gallery import on mobile
- Background batch jobs with progress notifications (desktop)
- OS share sheet for reports/exports on mobile
- File association: double-click a `.brainbow` bundle to open it on desktop
- Offline-first behavior confirmed on both mobile and desktop
- Full keyboard + trackpad gesture parity verified across desktop and web
- Full editing parity on tablet: touch-optimized annotation, analysis, and
  export

### 🔬 Workflows

- Zoom minimap / field-of-view navigator for large confocal tile sets
- Compare view: side-by-side or swipe-divider overlay of two datasets
- Shareable read-only viewer link (web export mode)
- Git-style version history for `.brainbow` project bundles
- Playwright e2e coverage of the import → segment → export critical path

---

## First run

---

## Next steps

- [CONTRIBUTING](CONTRIBUTING) — set up the dev environment and start tinkering.
- [ROADMAP](ROADMAP) — see what's coming next on the roadmap.

---

## License

See [LICENSE](LICENSE).
