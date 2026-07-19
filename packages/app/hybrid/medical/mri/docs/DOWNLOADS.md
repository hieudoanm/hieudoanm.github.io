# MRI

> A research workspace and orchestration layer for MRI data — study
> intelligence, quantitative analysis, and scientific-tool orchestration, all
> local-first. Powerful enough for the lab, flexible enough for phone, tablet,
> laptop, and desktop.

![Android 14+](https://img.shields.io/badge/Android-14%2B-green)
![Linux](https://img.shields.io/badge/Linux-22.04%2B-blue)
![macOS](https://img.shields.io/badge/macOS-13%2B-lightgrey)
![Windows](https://img.shields.io/badge/Windows-10%2B-blue)

```txt
┌──────────────────────────────────────────────┐
│  Study: T1 MPRAGE       ROI ███  QC ✓        │
│  ┌────────────────┐                         │
│  │ ╭───────╮  ◐   │  T1   74%  ✓            │
│  │ │  ╭───╮ │     │  T2   88%  ✓            │
│  │ │  ╰───╯ │     │ FLAIR 92%  ✓            │
│  │ │    ◧   │  ╭╮ │  DWI  61%  ⚠ motion     │
│  │ ╰───────╯  │ │ │                        │
│  └────────────┴─┴─┘                        │
│  window 400/1300  zoom 1.2x  slice 34/120   │
└──────────────────────────────────────────────┘
```

---

## Latest release

- **Version:** `app-hybrid-medical-mri-latest` — updates ship continuously.
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
| 4   | Linux    | Fedora | amd64        | 40.+         | [Download `.rpm`][download-rpm]            |                  |
| 5   | Linux    | Debian | amd64        | 13.+         | [Download `.deb`][download-deb]            |                  |
| 6   | macOS    |        | aarch64      | 13.+         | [Download `.dmg`][download-dmg]²           | Apple Silicon    |
| 7   | Windows  |        | x64          | 10.+         | [Download `.msi`][download-msi]            |                  |
| 8   | Windows  |        | x64          | 10.+         | [Download `.exe`][download-exe]            | Portable         |

[download-apk]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-mri-latest/mri.apk
[download-aab]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-mri-latest/mri.aab
[download-app-image]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-mri-latest/mri.AppImage
[download-deb]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-mri-latest/mri.deb
[download-rpm]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-mri-latest/mri.rpm
[download-dmg]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-mri-latest/mri.dmg
[download-msi]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-mri-latest/mri.msi
[download-exe]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-mri-latest/mri.exe

¹ The `.aab` bundle is used when submitting to the Google Play Store; install
the `.apk` directly on devices instead. ² The `.dmg` is built for Apple Silicon
(M-series) Macs.

### Checksums

> 🛡️ **Verify your download.** Every asset is published with a SHA-256 digest so
> you can confirm the file you got is exactly the file we shipped. See
> [SHA256SUMS.txt][checksums].

[checksums]:
  https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-medical-mri-latest/SHA256SUMS.txt

### Build from Source

Prefer to build it yourself? Clone, install, and build in three steps:

```bash
git clone https://github.com/hieudoanm/hieudoanm.github.io.git
cd packages/app/hybrid/medical/mri
pnpm install
pnpm tauri build
```

See [PACKAGING](PACKAGING) for per-platform build checklists and
[CONTRIBUTING](CONTRIBUTING) for setup and dev commands.

## First Run

Per-platform launch tips:

- **macOS** — right-click the `.dmg` then **Open** to bypass Gatekeeper the
  first time, or find the app bundle inside.
- **Linux** — make it runnable: `chmod +x mri.AppImage` then double-click.
- **Windows** — SmartScreen may warn; choose **More info → Run anyway**.
- **Android** — if Play Protect warns, tap **Install anyway**.

---

## About

Import, understand, validate, compare, analyze — then reproduce and export. MRI
is a research workspace and orchestration layer for MRI data: study
intelligence, quantitative analysis, and scientific-tool orchestration, all
local-first and ready wherever you work.

---

## Features

An MRI-first workspace that treats your studies as data — not just files.

### 🧱 Project Foundation

- Monorepo scaffold (app under `packages/app/hybrid/medical/mri`)
- Next.js static export validated against Tauri's `dist`
- Tauri desktop shell boots and loads the exported Next.js build
- Tauri Mobile (iOS + Android) boots the same build
- Shared design system: DaisyUI theme, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact

### 🗂️ Workspace & Data Management

- Local workspace with dataset management (import, organize, search)
- DICOM import: files, series, DICOMweb (QIDO-RS/WADO-RS/STOW-RS)
- NIfTI support with full header inspection
- MRI study browser organized around studies, series, and acquisitions
- Metadata viewer preserving original tags alongside normalized concepts
- Filesystem abstraction via logical IDs (`dataset://`, `series://`)
- Local embedded database for metadata and references — volumes stay on disk
- Provenance system recording inputs, operations, software, environment, and
  outputs for every derived artifact

### 🧠 Study Intelligence

- Automatic study analysis: modality, sequence, anatomical region, orientation,
  voxel size, slice thickness, field strength, scanner, manufacturer
- MRI sequence classifier (T1, T2, FLAIR, DWI, ADC, DTI, SWI, GRE, TOF, ASL,
  BOLD, perfusion, spectroscopy, mapping, Dixon, qSM) with confidence scores
- Study normalization: scanner-specific naming mapped to canonical concepts
- Protocol validation: user-defined protocols checked automatically on import
- Automated QC: motion, noise, SNR, intensity non-uniformity, ghosting,
  artifacts, coverage, spacing, metadata consistency — machine-readable results
- Cross-study comparison: registration, linked crosshairs, overlays, difference
  maps, segmentation/measurement comparison, longitudinal statistics

### 🖼️ Visualization

- Basic 2D slice viewer with window/level controls
- Synchronized views and MPR
- Overlay rendering for segmentations and maps
- Comparison mode for baseline vs. follow-up studies
- QC visualization with per-sequence status
- Metadata panel always inspectable next to the image

### 📊 Quantitative MRI

- First-class quantitative domain: T1/T2/T2\* mapping, ADC, DTI metrics (FA/MD),
  perfusion, ASL, susceptibility, relaxometry
- Tool integrations: qMRLab and the scientific model ecosystem
- Exposed analysis pipeline: input → preprocessing → model → parameters → QC →
  map → statistics → export — never hidden

### ⚙️ Pipelines & Jobs

- Pipeline builder: compose tools into stored, versioned pipeline definitions
- Same pipeline runnable through GUI, CLI, API, and AI agent
- Rust process manager: argument validation, stdout/stderr capture,
  cancellation, timeouts, progress, resource limits
- Background job system: queue, run, progress, complete/fail with logs, retries,
  outputs, and provenance
- Scientific-tool integration: dcm2niix, ANTs, FSL/MRtrix, MONAI, qMRLab —
  orchestrated, not reimplemented

### 🔗 Interoperability

- BIDS as a first-class integration: import, validation, DICOM → BIDS,
  subject/session/task navigation, sidecar inspection, dataset QC
- DICOM metadata preservation — no silently discarded tags
- Standards-based segmentation export
- Dataset export in research-friendly formats

### ✨ Segmentation & AI

- Segmentation as structured data: source, labels, geometry, model + version,
  statistics, review state, provenance
- Model registry: id, name, version, task, input/output, runtime, source,
  license
- Local model execution (ONNX/PyTorch/MONAI) plus containerized models
- AI review workflow: prediction → human review → correction → approval →
  export; original AI result and human modifications tracked separately
- Agent interface: typed tools (`list_studies`, `run_qc`, `compare_studies`,
  `run_pipeline`, ...) with no unrestricted shell access
- Natural-language commands compiled into explicit operations with intent shown
  before execution

### 🔒 Privacy & Security

- Local-first: full functionality offline; cloud services optional
- De-identification workflow: original → de-identify → validate → export
- No patient data in logs; no automatic uploads to AI services
- Hardened boundaries against malformed DICOM, decompression bombs, path
  traversal, command injection, and oversized files

### 🔬 Workflows

- Longitudinal biomarkers across studies
- Experiment tracking with reproducible parameters
- Dataset diff between timepoints
- Collaborative review workflows
- Automated research reports
- Playwright e2e coverage of the import → review → export critical path

---

## First run

---

## Next steps

- [CONTRIBUTING](CONTRIBUTING) — set up the dev environment and start tinkering.
- [ROADMAP](ROADMAP) — see what's coming next on the roadmap.

---

## License

See [LICENSE](LICENSE).
