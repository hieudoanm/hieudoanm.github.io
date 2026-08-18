# Brainbow

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

### Checksums

SHA-256 digests for every asset are published alongside the release in
[SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-brainbow-latest/SHA256SUMS.txt

## About

Brainbow — all-in-one microscopy image analysis for neuron reconstruction.

## Features

## Project Foundation

- Monorepo scaffold (app under `packages/app/hybrid/brainbow`)
- Next.js static export validated against Tauri's `dist`
- Tauri desktop shell boots and loads the exported Next.js build
- Tauri Mobile (iOS + Android) boots the same build
- Shared design system: DaisyUI theme, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact

## Image Handling

- Import Brainbow microscopy images (PNG/JPEG/WebP/TIFF)
- Pan/zoom canvas viewer (Canvas2D)
- Channel toggling (R/G/B) with per-channel opacity
- Basic color histogram / channel intensity readout
- Rotate and flip transforms (90° steps) for reoriented acquisitions
- Scale calibration: pixels-per-micron set manually or read from TIFF metadata
- Custom channel mapping for >3 channels (non-RGB acquisition orders)

## Segmentation & Analysis

- Manual neuron tracing/labeling tool (polygon/freehand)
- Color-based clustering to suggest distinct neuron "hues" (k-means, TS)
- Cell/neuron counting with per-color tally (connected components per channel)
- Measurement tools: distance, area, and angle readouts (pixel and micron units)
- Per-region statistics (mean intensity, area, centroid) exportable with data
- Quantitative summary panel: neuron counts, color diversity index, area
- Density heatmap overlay from the per-color tally (local neighborhood density)
- Analysis presets: save/load segmentation + counting parameter sets
- z-stack / time-series navigation with per-slice analysis and batch

## Annotations

- Annotation layers: show/hide, color-code, export as overlay
- Undo/redo history for annotation edits
- Keyboard shortcuts for common tools
- Vertex snapping / guide grid to speed up freehand tracing
- Eraser and lasso-subtract tools for correcting over-segmented traces
- Export annotations to lab-standard formats (ImageJ/Fiji ROI zip, plus more)

## Export & Reporting

- Export annotated image as PNG (flattened raster)
- Export results as CSV/JSON
- Batch processing: run segmentation/count across a folder of images
- Report generation (HTML report rendered in-app with Print → PDF)
- Citation-ready methods snippet (for research write-ups)
- Vector figure export (SVG) of annotations + scale bar for publications

## Projects & Platform

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

## Workflows

- Zoom minimap / field-of-view navigator for large confocal tile sets
- Compare view: side-by-side or swipe-divider overlay of two datasets
- Shareable read-only viewer link (web export mode)
- Git-style version history for `.brainbow` project bundles
- Playwright e2e coverage of the import → segment → export critical path

## Requirements

- Android 14+
- Linux (Ubuntu) 22.04+
- Linux (Debian) 13+
- macOS 13+
- Windows 10+

## LICENSE

See [LICENSE](LICENSE).
