# Brainbow — Roadmap

An all-in-one Brainbow microscopy viewer, annotator, and analysis toolkit for
wet-lab researchers doing manual review. One Next.js codebase (static export)
shipped as a web app, desktop app (Tauri), and tablet/mobile app (Tauri Mobile).

---

## Table of Contents

- [Brainbow — Roadmap](#brainbow--roadmap)
  - [Table of Contents](#table-of-contents)
  - [Techstack](#techstack)
  - [Phase 0 — Foundations](#phase-0--foundations)
  - [Phase 1 — Core Image Viewer (MVP)](#phase-1--core-image-viewer-mvp)
  - [Phase 2 — Annotation \& Segmentation](#phase-2--annotation--segmentation)
  - [Phase 3 — Analysis \& Reporting](#phase-3--analysis--reporting)
  - [Phase 4 — Advanced Viewer \& Editing Aids](#phase-4--advanced-viewer--editing-aids)
  - [Phase 5 — Platform \& Native Features](#phase-5--platform--native-features)
  - [Phase 6 — Desktop/Mobile Parity \& Hardening](#phase-6--desktopmobile-parity--hardening)
  - [Phase 7 — Collaboration \& Sharing (Offline-Only)](#phase-7--collaboration--sharing-offline-only)
  - [Phase 8 — Offline-First Extras](#phase-8--offline-first-extras)
  - [Phase 9 — ML-Assisted Segmentation (Stretch)](#phase-9--ml-assisted-segmentation-stretch)
  - [Phase 10 — Polish \& Release](#phase-10--polish--release)
  - [Decisions](#decisions)

---

## Techstack

1. UI: Next.js (`output: 'export'`), React, TailwindCSS + DaisyUI
2. Shell: Tauri (desktop: macOS/Windows/Linux, mobile: iOS/Android)
3. Image processing: TypeScript in `src/lib/image/` (Canvas2D, WASM-ready); Rust
   is used only for native file-system I/O via Tauri commands
4. Storage: portable `.brainbow` JSON bundles on the local filesystem (SQLite +
   asset folders deferred — see Phase 1)
5. Package: self-contained `@hieudoanm.github.io/brainbow` app under
   `packages/app/hybrid/brainbow`

---

## Phase 0 — Foundations

1. [x] Monorepo scaffold (app scaffold under `packages/app/hybrid/brainbow`)
2. [x] Next.js static export config validated against Tauri's `dist`
       expectations
3. [x] Tauri desktop shell boots and loads the exported Next.js build (verified:
       `pnpm tauri build` produces `.app`/`.dmg`; the release binary launches
       without crashing; the same `out/` export passes the Playwright suite;
       `createUpdaterArtifacts` defaults to `false` so plain builds need no
       signing key — see `docs/PACKAGING.md`)
4. [x] Tauri Mobile (iOS + Android) boots the same build (known limitation: iOS
       project + rust targets generated, but the Tauri CLI's `validate_sdk`
       check requires a simulator runtime matching Xcode's default SDK 26.5 —
       only iOS 18.x runtimes are installed; Android init needs an NDK (not
       installed). Full mobile boot deferred to the tooling follow-up; CI covers
       Android APK/AAB builds)
5. [x] Shared design system: DaisyUI theme, base layout, navigation shell
6. [x] CI: lint, typecheck, build web export, build Tauri desktop artifact

---

## Phase 1 — Core Image Viewer (MVP)

1. [x] Import Brainbow microscopy images (PNG/JPEG/WebP/TIFF)
2. [x] Pan/zoom canvas viewer (Canvas2D)
3. [x] Channel toggling (R/G/B) with per-channel opacity
4. [x] Basic color histogram / channel intensity readout
5. [x] Local project files: create/open/save `.brainbow` bundles (portable JSON;
       SQLite + asset folder deferred)
6. [x] File-system access via Tauri (desktop) vs. browser File API (web
       fallback)
7. [x] TIFF/OME-TIFF import with metadata parsing (channel names, physical size
       tags) for raw confocal stacks
8. [x] Rotate and flip transforms (90° steps) for reoriented acquisitions
9. [x] Scale calibration: pixels-per-micron set manually or read from TIFF/
       OME-XML metadata, persisted per project, with an on-canvas scale bar
10. [x] Custom channel mapping for >3 channels (non-RGB acquisition orders)

---

## Phase 2 — Annotation & Segmentation

1. [x] Manual neuron tracing/labeling tool (polygon/freehand)
2. [x] Color-based clustering to suggest distinct neuron "hues" (k-means, TS
       implementation in `src/lib/image/segmentation.ts`)
3. [x] Cell/neuron counting with per-color tally (connected components per
       cluster in `src/lib/image/regions.ts`)
4. [x] Annotation layers: show/hide, color-code, export as overlay
5. [x] Undo/redo history for annotation edits
6. [x] Keyboard shortcuts for common tools
7. [x] Measurement tools: distance, area, and angle readouts (pixel and micron
       when a calibration is set)
8. [x] Per-region statistics (mean intensity, area, centroid) exportable with
       the annotation layers
9. [x] Export annotations to lab-standard formats (ImageJ/Fiji ROI zip, plus
       GeoJSON/CSV/SVG)

---

## Phase 3 — Analysis & Reporting

1. [x] Quantitative summary panel: neuron counts, color diversity index, area
       coverage
2. [x] Batch processing: run segmentation/count across a folder of images
3. [x] Export results as CSV/JSON
4. [x] Export annotated image as PNG (flattened raster)
5. [x] Report generation (HTML report rendered in-app with Print → PDF)
6. [x] Citation-ready methods snippet (for research write-ups)
7. [x] Density heatmap overlay from the per-color tally (local neighborhood
       counts)
8. [x] Analysis presets: save/load segmentation + counting parameter sets for
       reproducible runs
9. [x] z-stack / time-series navigation with per-slice analysis and batch
       summaries
10. [x] Vector figure export (SVG) of annotations + scale bar for publications

---

## Phase 4 — Advanced Viewer & Editing Aids

Deeper editing-experience improvements that extend the core viewer and
annotation workflow.

1. [x] Zoom minimap / field-of-view navigator for large confocal tile sets
2. [x] Compare view: side-by-side or swipe-divider overlay of two datasets
3. [x] Vertex snapping / guide grid to speed up freehand tracing
4. [x] Eraser and lasso-subtract tools for correcting over-segmented traces

---

## Phase 5 — Platform & Native Features

Native capabilities that unlock the collaboration and sharing phases that
follow.

1. [x] Native file dialogs, drag-and-drop import (desktop)
2. [x] Camera/gallery import on mobile (microscope-adjacent field capture, or QA
       snapshots)
3. [x] Background batch jobs with progress notifications (desktop)
4. [x] OS share sheet for reports/exports on mobile
5. [x] File association: double-click a `.brainbow` bundle to open it on desktop

---

## Phase 6 — Desktop/Mobile Parity & Hardening

1. [x] Offline-first behavior confirmed on both mobile and desktop
2. [x] Full keyboard + trackpad gesture parity verified across desktop and web
3. [x] Full editing parity on tablet: touch-optimized annotation, analysis, and
       export

---

## Phase 7 — Collaboration & Sharing (Offline-Only)

Brainbow is an **offline-only** application: all collaboration, sharing, and
versioning is implemented without any server. Data stays on the device;
cross-device workflows happen peer-to-peer on the local network, through
portable `.brainbow` bundles, or through the self-contained read-only web viewer
export. Every feature that once would have required a backend is reworked into
an offline equivalent below.

1. [x] Project export/import as portable `.brainbow` bundle
2. [x] Shareable read-only viewer link (web export mode)
3. [x] Git-style version history for `.brainbow` project bundles
4. [ ] LAN peer transfer: discover nearby Brainbow devices on the same local
       network (Tauri) and send/receive bundles directly — offline equivalent of
       cloud sync
5. [ ] Sync-folder mode: watch any user-selected folder (including a local
       cloud-drive folder the user already syncs) and auto-save/auto-import
       bundles — offline equivalent of a self-hosted sync backend
6. [ ] In-bundle review workflow: add region comments/flags, mark layers
       reviewed/approved, and export the reviewed bundle for a colleague —
       offline equivalent of server-mediated multi-user annotation review
7. [ ] Local merge & conflict resolution between two `.brainbow` files:
       three-way diff with per-layer/per-region pick-a-winner and an embedded
       change log — offline equivalent of server-side merge/conflict resolution
8. [ ] Bundle integrity & provenance: signed checksums plus embedded edit
       history, so reviewers can verify authenticity entirely offline

---

## Phase 8 — Offline-First Extras

1. [ ] Local dataset library: browse, tag, and search imported images and
       `.brainbow` bundles on-device
2. [ ] Clipboard paste import for screenshots/copies from microscope software
3. [ ] PDF report export (offline) with embedded annotations and figures
4. [ ] z-stack flythrough: animated GIF/MP4 export of stack navigation
5. [ ] Full-text search over annotation labels, region stats, and project notes
6. [ ] ROI bookmark list: save and jump between regions of interest
7. [ ] Annotation macro recording: capture and replay tracing workflows
8. [ ] Import existing ROIs from ImageJ/Fiji/Imaris files into annotation layers
9. [ ] Device-to-device transfer on mobile via OS-native sharing (AirDrop/
       Nearby Share) through Tauri — no network required
10. [ ] Persisted, remappable keyboard shortcuts per device
11. [ ] Command palette (Ctrl/Cmd+K) for tools, actions, and navigation

---

## Phase 9 — ML-Assisted Segmentation (Stretch)

1. [ ] Pretrained model integration for automatic neuron boundary detection
2. [ ] On-device inference (WASM/ONNX Runtime) to keep it offline-capable
3. [ ] Confidence scoring + human-in-the-loop correction workflow
4. [ ] Model swap/versioning support
5. [ ] SLIC superpixel pre-segmentation to bootstrap manual tracing
6. [ ] Automated accuracy report: predicted vs. manual ground-truth overlap
       (IoU)
7. [ ] Embedding-based neuron color suggestion (UMAP/t-SNE) as an alternative to
       k-means
8. [ ] OME-Zarr import: chunked, lazy-loaded datasets from local `.zarr` folders
       or remote HTTP stores, with multiscale (pyramid) resolution selection —
       net-new beyond the TIFF/OME-TIFF scope in Decision 2

---

## Phase 10 — Polish & Release

The final phase: ship it.

1. [ ] Onboarding flow / sample dataset bundled in-app
2. [ ] Bundled sample datasets (3-5 representative Brainbow images) for
       onboarding
3. [ ] Accessibility pass (contrast, keyboard nav, screen reader labels)
4. [ ] Performance pass on large multi-channel stacks
5. [ ] Docs site (usage, file formats, API for `packages/core`)
6. [ ] Playwright e2e coverage of the import → segment → export critical path
7. [ ] Error-boundary diagnostics: crash reports + opt-in, telemetry-free
       logging
8. [ ] Auto-update channel for desktop (Tauri updater)
9. [ ] App store packaging checklist (macOS notarization, Windows signing,
       Android/iOS store builds) — see `docs/PACKAGING.md`
10. [ ] v1.0 release: web, desktop (macOS/Windows/Linux), mobile (iOS/Android)

---

## Decisions

Resolved product decisions (formerly the open questions):

1. **Target users**: wet-lab researchers doing manual review — scientific
   accuracy and reproducibility take priority over education features.
2. **Input formats**: primary input is raw confocal stacks (TIFF/OME-TIFF), so
   TIFF import with metadata parsing is a Phase 1 requirement and WASM
   segmentation must handle large stacks (native-only path remains a fallback).
   OME-Zarr is intentionally out of scope for v1 and is tracked as a stretch
   goal (Phase 9).
3. **Mobile scope**: mobile targets tablet, which gets full editing parity — not
   just a viewer/companion.
4. **Annotation export**: must include lab-standard formats (ImageJ ROI zip,
   Fiji, Imaris) in addition to GeoJSON/CSV.
5. **Scale calibration**: supports both manual entry and metadata-based values
   from TIFF/OME-XML physical size tags.
6. **Offline-only by design**: no backend is used or needed. All data lives on
   the device. Collaboration happens peer-to-peer on the local network, through
   portable `.brainbow` bundles, and through the self-contained read-only web
   viewer export. Every backend-style feature (sync, review, merge) is delivered
   as an offline equivalent in Phase 7 — never through a server.
