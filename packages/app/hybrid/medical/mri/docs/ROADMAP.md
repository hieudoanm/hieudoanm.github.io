# MRI — Roadmap

An MRI research workspace and orchestration layer: study intelligence,
quantitative analysis, pipelines, and reproducible research workflows. One
Next.js codebase (static export) shipped as a web app, desktop app (Tauri), and
mobile app (Tauri Mobile).

---

## Table of Contents

- [MRI — Roadmap](#mri--roadmap)
  - [Table of Contents](#table-of-contents)
  - [Techstack](#techstack)
  - [Phase 0 — Foundations](#phase-0--foundations)
  - [Phase 1 — Foundation](#phase-1--foundation)
  - [Phase 2 — MRI Intelligence](#phase-2--mri-intelligence)
  - [Phase 3 — Research Workflow](#phase-3--research-workflow)
  - [Phase 4 — AI](#phase-4--ai)
  - [Phase 5 — Advanced](#phase-5--advanced)
  - [Decisions](#decisions)

---

## Techstack

1. UI: Next.js (`output: 'export'`), React, TailwindCSS + DaisyUI
2. Shell: Tauri 2 (desktop: macOS/Windows/Linux, mobile: iOS/Android)
3. Core: Rust owns filesystem, database, process management, background jobs,
   pipeline engine, and security boundaries; the UI never executes native
   commands directly
4. Scientific tools: dcm2niix, ANTs, FSL/MRtrix, MONAI/PyTorch, qMRLab invoked
   through a controlled Rust process manager — orchestrated, not reimplemented
5. Storage: local embedded database for metadata + references; volumes stay on
   disk addressed via logical IDs (`dataset://`, `series://`, `artifact://`)
6. Package: self-contained `@hieudoanm.github.io/mri` app under
   `packages/app/hybrid/medical/mri`

---

## Phase 0 — Foundations

1. [x] Monorepo scaffold (app under `packages/app/hybrid/medical/mri`)
2. [x] Next.js static export config validated against Tauri's `dist`
       expectations
3. [ ] Tauri desktop shell boots and loads the exported Next.js build
4. [ ] Tauri Mobile (iOS + Android) boots the same build
5. [x] Shared design system: DaisyUI theme, base layout, navigation shell
6. [x] CI: lint, typecheck, build web export, build Tauri desktop artifact

---

## Phase 1 — Foundation

> Core data plane: import, browse, inspect, view, and trace provenance

1. [x] Workspace: local project container with dataset management (import,
       organize, search)
2. [x] DICOM import: files and series with full metadata preservation (no
       silently discarded tags)
3. [ ] DICOMweb (QIDO-RS/WADO-RS/STOW-RS)
4. [x] NIfTI support with header inspection
5. [x] Filesystem abstraction: logical IDs (`dataset://`, `series://`,
       `artifact://`) over local/mounted storage
6. [x] Local embedded database for metadata and references — no volumes in the
       relational store
7. [x] MRI study browser organized around studies, series, acquisitions
8. [x] Metadata viewer: original tags alongside normalized concepts
9. [x] Basic 2D slice viewer with window/level controls
10. [x] Provenance system: inputs, operations, software, environment, outputs
        recorded for every derived artifact

---

## Phase 2 — MRI Intelligence

> The differentiator: the system understands studies rather than listing files

1. [x] Automatic study analysis: modality, sequence, anatomical region,
       orientation, voxel size, slice thickness, field strength, scanner,
       manufacturer, acquisition/diffusion parameters, temporal dimensions
2. [x] Sequence classifier (T1, T2, FLAIR, DWI, ADC, DTI, SWI, GRE, TOF, ASL,
       BOLD, perfusion, spectroscopy, T1/T2/T2* mapping, Dixon, qSM) exposing
       confidence — inferred information never presented as authoritative
3. [x] Study normalization: scanner naming (MPRAGE/BRAVO/T1 3D/...) mapped to
       canonical concepts, originals preserved
4. [x] Protocol validation: user-defined protocols (required sequences,
       constraints) checked automatically on import
5. [x] Automated machine-readable QC: motion, noise, SNR, intensity
       non-uniformity, ghosting, artifacts, coverage, spacing, metadata
       consistency, missing sequences, corruption
6. [x] Cross-study comparison: registration, synchronized navigation, linked
       crosshairs, overlays, difference maps, segmentation/measurement
       comparison, longitudinal statistics

---

## Phase 3 — Research Workflow

> Orchestration: the manual tool-hopping gap becomes a managed pipeline

1. [x] Pipeline builder: stored, versioned pipeline definitions runnable through
       GUI, CLI, API, and AI agent
2. [x] Rust process manager: structured arguments, validation, stdout/stderr
       capture, cancellation, timeouts, progress, resource limits
3. [x] Background job system: queue → run → progress → complete/fail with logs,
       retries, outputs, provenance; UI never blocks
4. [ ] Scientific-tool integration: dcm2niix (DICOM → NIfTI), ANTs
       (registration), FSL/MRtrix (diffusion), qMRLab (quantitative MRI)
5. [ ] DICOM → BIDS conversion with BIDS validation and dataset QC
6. [ ] Quantitative MRI domain: T1/T2/T2* mapping, ADC, DTI (FA/MD), perfusion,
       ASL, susceptibility, relaxometry with exposed analysis pipelines
7. [ ] Segmentation as structured data (source, labels, geometry, model,
       statistics, review state, provenance) with standards-based export

---

## Phase 4 — AI

> Models are first-class citizens, output is always reviewable

1. [x] Model registry: id, name, version, task, input/output, runtime, source,
       license
2. [x] Local model execution: ONNX, PyTorch, MONAI; containerized models;
       external inference services optional
3. [ ] AI segmentation with model provenance recorded per inference
4. [ ] AI review workflow: prediction → human review → correction → approval →
       export; original result and human modifications tracked separately
5. [ ] Agent API: typed tools (`list_studies`, `inspect_study`, `find_sequence`,
       `compare_studies`, `run_qc`, `run_pipeline`, ...) — no unrestricted shell
       access
6. [ ] Natural-language interface compiling into explicit operations with intent
       shown before execution

---

## Phase 5 — Advanced

> Longitudinal research at scale

1. [ ] Longitudinal biomarkers across studies
2. [ ] Experiment tracking with reproducible parameters
3. [ ] Dataset diff between timepoints
4. [ ] Collaborative review workflows
5. [ ] Automated research reports
6. [ ] De-identification workflow hardening: original → de-identify → validate →
       export with honest anonymity guarantees

---

## Decisions

Resolved product decisions (from `AGENTS.md`):

1. **Not a generic viewer**: generic DICOM viewer/PACS/image-editor/chatbot/
   notebook features are explicitly out of scope — every feature must serve
   MRI-specific research workflows.
2. **The gap is orchestration**: researchers can already do almost everything
   with OHIF, 3D Slicer, ANTs, FSL, FreeSurfer, MONAI, qMRLab, dcm2niix — but
   must manually move data between tools, repeatedly configure them, lose
   metadata and provenance, and cannot reproduce workflows. The product is the
   missing workflow layer.
3. **Local-first by design**: full functionality offline; cloud services are
   optional. No uploading MRI data to external services for core functionality.
   Patient data is never sent to AI services automatically.
4. **Prefer mature tools**: scientific tools are integrated through the process
   manager, never rewritten in-app.
5. **Provenance is mandatory**: any feature producing derived artifacts is not
   done until provenance capture works.
6. **Spatial correctness is non-negotiable**: tests must include rotated and
   differently oriented datasets; numerical tolerances are explicit.
