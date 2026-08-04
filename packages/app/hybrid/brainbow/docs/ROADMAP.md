# Brainbow — Roadmap

An all-in-one Brainbow microscopy viewer, annotator, and analysis toolkit. One
Next.js codebase (static export) shipped as a web app, desktop app (Tauri), and
mobile app (Tauri Mobile).

--

## Table of Contents

- [Brainbow — Roadmap](#brainbow--roadmap)
  - [Table of Contents](#table-of-contents)
  - [Techstack](#techstack)
  - [Phase 0 — Foundations](#phase-0--foundations)
  - [Phase 1 — Core Image Viewer (MVP)](#phase-1--core-image-viewer-mvp)
  - [Phase 2 — Annotation \& Segmentation](#phase-2--annotation--segmentation)
  - [Phase 3 — Analysis \& Reporting](#phase-3--analysis--reporting)
  - [Phase 4 — Desktop/Mobile Parity \& Native Features](#phase-4--desktopmobile-parity--native-features)
  - [Phase 5 — Collaboration \& Sync (Optional/Stretch)](#phase-5--collaboration--sync-optionalstretch)
  - [Phase 6 — ML-Assisted Segmentation (Stretch)](#phase-6--ml-assisted-segmentation-stretch)
  - [Phase 7 — Polish \& Release](#phase-7--polish--release)
  - [Open Questions](#open-questions)

---

## Techstack

- UI: Next.js (`output: 'export'`), React, TailwindCSS + DaisyUI
- Shell: Tauri (desktop: macOS/Windows/Linux, mobile: iOS/Android)
- Image processing: Rust (Tauri commands) for heavy lifting, WASM/Canvas/WebGL
  fallback for web-only mode
- Storage: SQLite (via Tauri `sql` plugin) for local projects/annotations,
  filesystem for raw image assets
- Package: `@hieudoanm.github.io/brainbow-*` monorepo packages (core, ui, cli)

---

## Phase 0 — Foundations

- [x] Monorepo scaffold (app scaffold under `packages/app/hybrid/brainbow`)
- [x] Next.js static export config validated against Tauri's `dist` expectations
- [ ] Tauri desktop shell boots and loads the exported Next.js build
- [ ] Tauri Mobile (iOS + Android) boots the same build
- [x] Shared design system: DaisyUI theme, base layout, navigation shell
- [x] CI: lint, typecheck, build web export, build Tauri desktop artifact

---

## Phase 1 — Core Image Viewer (MVP)

- [x] Import Brainbow microscopy images (PNG/JPEG/WebP; TIFF pending)
- [x] Pan/zoom canvas viewer (Canvas2D)
- [x] Channel toggling (R/G/B) with per-channel opacity
- [x] Basic color histogram / channel intensity readout
- [x] Local project files: create/open/save project bundles (implemented as a
      portable JSON `.brainbow` bundle; SQLite + asset folder deferred)
- [x] File-system access via Tauri (desktop) vs. browser File API (web fallback)

---

## Phase 2 — Annotation & Segmentation

- [x] Manual neuron tracing/labeling tool (polygon/freehand)
- [x] Color-based clustering to suggest distinct neuron "hues" (k-means, TS
      implementation in `src/lib/image/segmentation.ts`)
- [x] Cell/neuron counting with per-color tally (connected components per
      cluster in `src/lib/image/regions.ts`)
- [x] Annotation layers: show/hide, color-code, export as overlay
- [x] Undo/redo history for annotation edits
- [x] Keyboard shortcuts for common tools

---

## Phase 3 — Analysis & Reporting

- [x] Quantitative summary panel: neuron counts, color diversity index, area
      coverage
- [x] Batch processing: run segmentation/count across a folder of images
- [x] Export results as CSV/JSON
- [x] Export annotated image as PNG (flattened raster)
- [x] Report generation (HTML report rendered in-app with Print → PDF)
- [x] Citation-ready methods snippet (for research write-ups)

---

## Phase 4 — Desktop/Mobile Parity & Native Features

- [x] Native file dialogs, drag-and-drop import (desktop)
- [x] Camera/gallery import on mobile (microscope-adjacent field capture, or QA
      snapshots)
- [x] Background batch jobs with progress notifications (desktop)
- [x] Offline-first behavior confirmed on both mobile and desktop
- [x] Auto-update channel for desktop (Tauri updater)
- [x] App store packaging checklist (macOS notarization, Windows signing,
      Android/iOS store builds) — see `docs/PACKAGING.md`

---

## Phase 5 — Collaboration & Sync (Optional/Stretch)

- [x] Project export/import as portable `.brainbow` bundle
- [ ] Optional cloud sync (self-hosted or lightweight backend) for cross-device
      projects
- [ ] Shareable read-only viewer link (web export mode)
- [ ] Multi-user annotation review (comments/flags on regions)

---

## Phase 6 — ML-Assisted Segmentation (Stretch)

- [ ] Pretrained model integration for automatic neuron boundary detection
- [ ] On-device inference (WASM/ONNX Runtime) to keep it offline-capable
- [ ] Confidence scoring + human-in-the-loop correction workflow
- [ ] Model swap/versioning support

---

## Phase 7 — Polish & Release

- [ ] Onboarding flow / sample dataset bundled in-app
- [ ] Accessibility pass (contrast, keyboard nav, screen reader labels)
- [ ] Performance pass on large multi-channel stacks
- [ ] Docs site (usage, file formats, API for `packages/core`)
- [ ] v1.0 release: web, desktop (macOS/Windows/Linux), mobile (iOS/Android)

---

## Open Questions

- Target users: wet-lab researchers doing manual review, or a broader
  science-communication/education tool?
- Expected image sizes/formats (raw confocal stacks vs. exported PNG/JPEG) —
  affects whether WASM segmentation is fast enough or if a native-only path is
  required.
- Does mobile need full editing, or is it primarily a viewer/companion app to
  the desktop workflow?
