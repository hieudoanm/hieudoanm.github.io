# Features

> MRI — a research workspace and orchestration layer for MRI data: study
> intelligence, quantitative analysis, and scientific-tool orchestration.

## Project Foundation

- Monorepo scaffold (app under `packages/app/hybrid/medical/mri`)
- Next.js static export validated against Tauri's `dist`
- Tauri desktop shell boots and loads the exported Next.js build
- Tauri Mobile (iOS + Android) boots the same build
- Shared design system: DaisyUI theme, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact

## Workspace & Data Management

- Local workspace with dataset management (import, organize, search)
- DICOM import: files, series, DICOMweb (QIDO-RS/WADO-RS/STOW-RS)
- NIfTI support with full header inspection
- MRI study browser organized around studies, series, and acquisitions
- Metadata viewer preserving original tags alongside normalized concepts
- Filesystem abstraction via logical IDs (`dataset://`, `series://`)
- Local embedded database for metadata and references — volumes stay on disk
- Provenance system recording inputs, operations, software, environment, and
  outputs for every derived artifact

## Study Intelligence

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

## Visualization

- Basic 2D slice viewer with window/level controls
- Synchronized views and MPR
- Overlay rendering for segmentations and maps
- Comparison mode for baseline vs. follow-up studies
- QC visualization with per-sequence status
- Metadata panel always inspectable next to the image

## Quantitative MRI

- First-class quantitative domain: T1/T2/T2\* mapping, ADC, DTI metrics (FA/MD),
  perfusion, ASL, susceptibility, relaxometry
- Tool integrations: qMRLab and the scientific model ecosystem
- Exposed analysis pipeline: input → preprocessing → model → parameters → QC →
  map → statistics → export — never hidden

## Pipelines & Jobs

- Pipeline builder: compose tools into stored, versioned pipeline definitions
- Same pipeline runnable through GUI, CLI, API, and AI agent
- Rust process manager: argument validation, stdout/stderr capture,
  cancellation, timeouts, progress, resource limits
- Background job system: queue, run, progress, complete/fail with logs, retries,
  outputs, and provenance
- Scientific-tool integration: dcm2niix, ANTs, FSL/MRtrix, MONAI, qMRLab —
  orchestrated, not reimplemented

## Interoperability

- BIDS as a first-class integration: import, validation, DICOM → BIDS,
  subject/session/task navigation, sidecar inspection, dataset QC
- DICOM metadata preservation — no silently discarded tags
- Standards-based segmentation export
- Dataset export in research-friendly formats

## Segmentation & AI

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

## Privacy & Security

- Local-first: full functionality offline; cloud services optional
- De-identification workflow: original → de-identify → validate → export
- No patient data in logs; no automatic uploads to AI services
- Hardened boundaries against malformed DICOM, decompression bombs, path
  traversal, command injection, and oversized files

## Workflows

- Longitudinal biomarkers across studies
- Experiment tracking with reproducible parameters
- Dataset diff between timepoints
- Collaborative review workflows
- Automated research reports
- Playwright e2e coverage of the import → review → export critical path

---

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.
