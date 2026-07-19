# MRI Imaging Software — AI Agent Development Guide

## Table of Contents

- [MRI Imaging Software — AI Agent Development Guide](#mri-imaging-software--ai-agent-development-guide)
  - [Table of Contents](#table-of-contents)
  - [Documentation](#documentation)
  - [1. Mission](#1-mission)
  - [2. Technology Stack](#2-technology-stack)
    - [Frontend](#frontend)
  - [3. Desktop Runtime](#3-desktop-runtime)
  - [4. Architecture](#4-architecture)
  - [5. Frontend / Rust Boundary](#5-frontend--rust-boundary)
  - [6. Domain Architecture](#6-domain-architecture)
  - [7. What the Application Is](#7-what-the-application-is)
  - [8. Existing Software Landscape](#8-existing-software-landscape)
  - [9. Primary Product Gap](#9-primary-product-gap)
  - [10. MRI Study Intelligence](#10-mri-study-intelligence)
  - [11. Sequence Classification](#11-sequence-classification)
  - [12. Study Normalization](#12-study-normalization)
  - [13. Cross-Study Comparison](#13-cross-study-comparison)
  - [14. MRI Quality Control](#14-mri-quality-control)
  - [15. MRI Protocol Validation](#15-mri-protocol-validation)
  - [16. Quantitative MRI](#16-quantitative-mri)
  - [17. Scientific Tool Integration](#17-scientific-tool-integration)
  - [18. Rust Process Manager](#18-rust-process-manager)
  - [19. Python Integration](#19-python-integration)
  - [20. Pipeline Engine](#20-pipeline-engine)
  - [21. Background Jobs](#21-background-jobs)
  - [22. Provenance](#22-provenance)
  - [23. Local-First Architecture](#23-local-first-architecture)
  - [24. Database](#24-database)
  - [25. Filesystem Abstraction](#25-filesystem-abstraction)
  - [26. BIDS](#26-bids)
  - [27. DICOM](#27-dicom)
  - [28. Segmentation](#28-segmentation)
  - [29. AI Integration](#29-ai-integration)
  - [30. AI Review Workflow](#30-ai-review-workflow)
  - [31. Agent Interface](#31-agent-interface)
  - [32. Natural Language Interface](#32-natural-language-interface)
  - [33. Security Boundary](#33-security-boundary)
  - [34. Privacy](#34-privacy)
  - [35. De-identification](#35-de-identification)
  - [36. Spatial Correctness](#36-spatial-correctness)
  - [37. Numerical Correctness](#37-numerical-correctness)
  - [38. Visualization](#38-visualization)
  - [39. UI Architecture](#39-ui-architecture)
  - [40. TypeScript Rules](#40-typescript-rules)
  - [41. Rust Rules](#41-rust-rules)
  - [42. IPC Rules](#42-ipc-rules)
  - [43. Performance](#43-performance)
  - [44. Feature Prioritization](#44-feature-prioritization)
  - [45. Highest-Priority Features](#45-highest-priority-features)
    - [Phase 1 — Foundation](#phase-1--foundation)
    - [Phase 2 — MRI Intelligence](#phase-2--mri-intelligence)
    - [Phase 3 — Research Workflow](#phase-3--research-workflow)
    - [Phase 4 — AI](#phase-4--ai)
    - [Phase 5 — Advanced](#phase-5--advanced)
  - [46. Features to Avoid](#46-features-to-avoid)
  - [47. Definition of Done](#47-definition-of-done)
  - [48. Agent Workflow](#48-agent-workflow)
  - [49. Golden Rule](#49-golden-rule)
  - [50. North Star](#50-north-star)

## Documentation

Reference docs live in `docs/`:

| Doc                    | Covers                                              |
| ---------------------- | --------------------------------------------------- |
| `docs/ARCHITECTURE.md` | Tech stack, system layers, IPC boundary, data flow  |
| `docs/ROADMAP.md`      | Phased feature roadmap with progress tracking       |
| `docs/CONTRIBUTING.md` | Setup, dev commands, coding and testing conventions |
| `docs/PACKAGING.md`    | Packaging checklist per platform                    |
| `docs/DOWNLOADS.md`    | Download links per platform                         |

## 1. Mission

This project is an **MRI-first medical imaging and research application** built
with:

- **Next.js**
- **React**
- **TypeScript**
- **Tauri**
- **Rust**

The goal is **not** to build another generic DICOM viewer.

The goal is to fill meaningful gaps in the existing MRI software landscape by
creating a modern desktop application that combines:

- MRI visualization
- MRI-specific intelligence
- quantitative analysis
- research workflows
- AI/ML tooling
- DICOM/BIDS interoperability
- reproducibility
- provenance
- automation

The application should become an **MRI research workspace and orchestration
layer**, rather than simply an image viewer.

---

## 2. Technology Stack

### Frontend

```text
Next.js
React
TypeScript
Tailwind CSS
```

The frontend is responsible for:

- application UI;
- study navigation;
- visualization;
- workflow editors;
- metadata inspection;
- measurements;
- segmentation review;
- reports;
- configuration;
- user interaction.

Use React components for reusable UI.

Use Next.js primarily as the application UI framework.

Do not introduce a separate frontend framework.

---

## 3. Desktop Runtime

Use:

```text
Tauri
Rust
```

Tauri is responsible for capabilities that should not live in the browser layer.

Examples:

- filesystem access;
- native dialogs;
- process management;
- local databases;
- native application state;
- secure credentials;
- invoking imaging tools;
- invoking Python;
- invoking containers;
- hardware/GPU integration where appropriate;
- background jobs;
- local model execution;
- IPC.

---

## 4. Architecture

Use a layered architecture:

```text
┌──────────────────────────────────────────┐
│                Next.js UI                │
│                                          │
│ React / TypeScript / Visualization       │
└───────────────────┬──────────────────────┘
                    │
              Tauri IPC
                    │
┌───────────────────▼──────────────────────┐
│              Rust Core                   │
│                                          │
│ Application services                     │
│ Filesystem                               │
│ Database                                 │
│ Process manager                          │
│ Pipeline engine                          │
│ Job manager                              │
│ Security                                 │
└───────────────────┬──────────────────────┘
                    │
          Native / scientific tools
                    │
       ┌────────────┼─────────────┐
       ▼            ▼             ▼
     Python       CLI tools     Models
       │
       ├── NumPy
       ├── SciPy
       ├── NiBabel
       ├── MONAI
       ├── PyTorch
       └── scientific libraries
```

The UI must not directly execute arbitrary native commands.

The Rust layer should mediate native capabilities.

---

## 5. Frontend / Rust Boundary

Treat the Tauri IPC boundary as a public API.

Do not allow arbitrary UI code to execute shell commands.

Prefer explicit commands:

```text
open_dataset()
list_studies()
get_study()
get_series()
read_metadata()
run_pipeline()
run_qc()
run_segmentation()
calculate_measurement()
get_provenance()
export_dataset()
```

Avoid generic APIs such as:

```text
execute(command)
runShell(command)
```

unless they are strictly internal and inaccessible to untrusted UI input.

---

## 6. Domain Architecture

The application should be organized around MRI concepts rather than generic CRUD
entities.

Recommended domains:

```text
src/
├── studies/
├── series/
├── images/
├── acquisitions/
├── datasets/
├── segmentations/
├── measurements/
├── pipelines/
├── models/
├── experiments/
├── provenance/
├── quality/
├── reports/
└── integrations/
```

The Rust backend should mirror the domain where appropriate.

---

## 7. What the Application Is

Think of the product as:

> **MRI Workspace + Scientific Analysis Environment + Workflow Orchestrator**

Not:

> DICOM Viewer

The core workflow is:

```text
Import
  ↓
Understand
  ↓
Validate
  ↓
Compare
  ↓
Analyze
  ↓
Review
  ↓
Reproduce
  ↓
Export
```

---

## 8. Existing Software Landscape

Before implementing functionality, investigate existing solutions including:

- OHIF
- 3D Slicer
- OsiriX
- Horos
- Weasis
- ImageJ/Fiji
- ITK
- VTK
- ANTs
- FSL
- FreeSurfer
- MONAI
- qMRLab
- PyRadiomics
- dcm2niix
- BIDS tooling

Do not duplicate mature functionality without a clear product reason.

The question is:

> What workflow remains painful even when these tools are available?

That workflow is a potential product opportunity.

---

## 9. Primary Product Gap

The central product opportunity is **orchestration**.

A researcher often needs to combine:

```text
DICOM
 ↓
dcm2niix
 ↓
NIfTI
 ↓
FSL / ANTs
 ↓
Python
 ↓
MONAI
 ↓
3D Slicer
 ↓
CSV
 ↓
Jupyter
```

The user should not have to manually coordinate all of this.

Our application should provide a unified environment around these tools.

---

## 10. MRI Study Intelligence

Automatically analyze an imported study.

Identify:

- modality;
- sequence;
- anatomical region;
- orientation;
- voxel size;
- slice thickness;
- field strength;
- scanner;
- manufacturer;
- acquisition parameters;
- diffusion parameters;
- temporal dimensions;
- quantitative maps;
- derived images.

Example UI:

```text
MRI Study

Structural
  ✓ T1 MPRAGE
  ✓ T2
  ✓ FLAIR

Diffusion
  ✓ DWI
  ✓ ADC
  ✓ DTI

Functional
  ✓ BOLD

Quantitative
  ✓ T1 Map
```

The system should understand the study rather than merely list files.

---

## 11. Sequence Classification

Build an MRI-specific sequence classifier.

Support identification of:

- T1;
- T2;
- FLAIR;
- DWI;
- ADC;
- DTI;
- SWI;
- GRE;
- TOF;
- ASL;
- BOLD;
- perfusion;
- spectroscopy;
- T1 mapping;
- T2 mapping;
- T2\* mapping;
- Dixon;
- qSM;
- etc.

Classification must expose confidence.

Never represent inferred information as authoritative metadata.

---

## 12. Study Normalization

Different scanners use different naming conventions.

Normalize them into canonical concepts.

Example:

```text
MPRAGE
BRAVO
T1 3D
T1 SAG
```

could become:

```yaml
modality: MRI
contrast: T1
sequence_family: structural
dimensionality: 3D
```

Always preserve the original metadata.

---

## 13. Cross-Study Comparison

This is a major product feature.

Allow:

```text
Baseline MRI
      ↓
Follow-up MRI
      ↓
Registered comparison
      ↓
Change analysis
```

Support:

- synchronized navigation;
- linked crosshairs;
- registration;
- overlays;
- difference maps;
- segmentation comparison;
- measurement comparison;
- longitudinal statistics.

The user should be able to ask:

> What changed between these MRI studies?

---

## 14. MRI Quality Control

Provide automated QC.

Check:

- motion;
- noise;
- SNR;
- intensity non-uniformity;
- ghosting;
- artifacts;
- incomplete coverage;
- incorrect spacing;
- inconsistent metadata;
- missing sequences;
- corrupted datasets.

Example:

```text
Study QC

✓ T1
✓ T2
⚠ FLAIR
✕ DWI

Issues

⚠ FLAIR: significant motion
✕ DWI: missing b=0 volume
```

QC must be machine-readable.

---

## 15. MRI Protocol Validation

Allow users to define MRI protocols.

Example:

```yaml
protocol:
  name: Brain MRI Research Protocol

  required:
    - T1
    - T2
    - FLAIR
    - DWI

  constraints:
    T1:
      max_voxel_size: 1mm

    DWI:
      required_b_values:
        - 0
        - 1000
```

Then automatically validate imported studies.

---

## 16. Quantitative MRI

Quantitative MRI is a first-class domain.

Support integrations for:

- T1 mapping;
- T2 mapping;
- T2\*;
- ADC;
- DTI;
- FA;
- MD;
- perfusion;
- ASL;
- susceptibility;
- relaxometry.

Each analysis should expose:

```text
Input
 ↓
Preprocessing
 ↓
Model
 ↓
Parameters
 ↓
QC
 ↓
Map
 ↓
Statistics
 ↓
Export
```

Never hide the analysis pipeline.

---

## 17. Scientific Tool Integration

Prefer calling mature scientific tools instead of rewriting them.

Examples:

```text
Registration
→ ANTs

Diffusion
→ FSL / MRtrix

Segmentation
→ MONAI / model ecosystem

Quantitative MRI
→ qMRLab

DICOM → NIfTI
→ dcm2niix

Visualization
→ appropriate WebGL / VTK / imaging libraries
```

The application provides the orchestration layer.

---

## 18. Rust Process Manager

Native tools must be executed through a controlled Rust process manager.

Responsibilities:

- process creation;
- argument validation;
- environment setup;
- stdout/stderr capture;
- exit code handling;
- cancellation;
- timeout;
- progress;
- resource limits;
- logging;
- provenance.

Never construct commands using string concatenation.

Prefer structured arguments:

```rust
Command {
    executable: "dcm2niix",
    args: [
        "-z",
        "y",
        input_path
    ]
}
```

Arguments derived from user input must be validated.

---

## 19. Python Integration

Python should be treated as an external scientific execution environment.

Possible architecture:

```text
Tauri
  ↓
Rust Job Manager
  ↓
Python Environment
  ↓
MRI Processing
```

Do not embed arbitrary Python execution directly into the frontend.

Python jobs should have:

- environment;
- dependency information;
- input files;
- parameters;
- outputs;
- logs;
- status;
- provenance.

---

## 20. Pipeline Engine

Users should be able to create:

```text
DICOM
 ↓
NIfTI
 ↓
Bias Correction
 ↓
Registration
 ↓
Brain Extraction
 ↓
Segmentation
 ↓
ROI Statistics
 ↓
Report
```

Pipelines should be stored as data.

Example:

```yaml
pipeline:
  version: 1

  steps:
    - id: convert
      tool: dcm2niix

    - id: bias
      tool: ants_n4

    - id: segmentation
      model: brain-segmentation

    - id: statistics
      tool: roi-statistics
```

The same pipeline should be runnable through:

- GUI;
- CLI;
- API;
- AI agent.

---

## 21. Background Jobs

MRI processing can take seconds to hours.

Never block the UI.

Use a Rust job system.

Example:

```text
Queued
  ↓
Running
  ↓
Progress
  ↓
Completed
```

or:

```text
Queued
  ↓
Running
  ↓
Failed
```

Jobs must support:

- cancellation;
- retry;
- logs;
- progress;
- outputs;
- provenance.

---

## 22. Provenance

Every derived artifact must have provenance.

Record:

```yaml
provenance:
  inputs:
    - ...

  operations:
    - operation: registration
      algorithm: rigid
      parameters: ...

  software:
    application: ...
    version: ...

  environment:
    python: ...
    tool: ...

  outputs:
    - ...
```

A user must always be able to answer:

> How was this image produced?

---

## 23. Local-First Architecture

The application should work offline.

Prefer:

```text
Desktop
 ├── Next.js UI
 ├── Tauri
 ├── Rust
 ├── Local Database
 ├── Local Files
 ├── Local Scientific Tools
 └── Local Models
```

Cloud services should be optional.

Do not require uploading MRI data to external services for core functionality.

---

## 24. Database

Use a local embedded database where structured state is needed.

Possible responsibilities:

- projects;
- studies;
- datasets;
- jobs;
- provenance;
- measurements;
- models;
- pipeline definitions;
- experiment metadata.

Do not store huge MRI volumes directly in the relational database.

Store metadata and references.

---

## 25. Filesystem Abstraction

Do not make the application dependent on hardcoded filesystem paths.

Represent datasets through logical IDs:

```text
workspace://study/123
dataset://abc
series://xyz
artifact://result-123
```

The underlying storage may be:

- local filesystem;
- external drive;
- mounted dataset;
- future remote storage.

---

## 26. BIDS

BIDS should be a first-class integration.

Support:

- BIDS import;
- BIDS validation;
- DICOM → BIDS;
- metadata inspection;
- subject/session navigation;
- task/run navigation;
- sidecar inspection;
- dataset QC.

Do not treat BIDS as simply a folder naming convention.

---

## 27. DICOM

Support:

- DICOM files;
- DICOM series;
- DICOMweb;
- QIDO-RS;
- WADO-RS;
- STOW-RS.

Preserve DICOM metadata.

Do not silently discard tags.

---

## 28. Segmentation

Treat segmentation as structured data.

Represent:

```text
Segmentation
├── Source
├── Labels
├── Geometry
├── Model
├── Model Version
├── Statistics
├── Review State
└── Provenance
```

Support standards-based export.

AI segmentation must always be reviewable.

---

## 29. AI Integration

Support:

- ONNX;
- PyTorch;
- MONAI;
- local models;
- containerized models;
- external inference services.

Models should be registered.

Example:

```yaml
model:
  id:
  name:
  version:
  task:
  input:
  output:
  runtime:
  source:
  license:
```

Record model provenance for every inference.

---

## 30. AI Review Workflow

Never treat model output as automatically correct.

Use:

```text
AI Prediction
      ↓
Human Review
      ↓
Correction
      ↓
Approval
      ↓
Export
```

Track:

```text
original AI result
+
human modifications
=
final result
```

---

## 31. Agent Interface

The application should eventually expose typed tools to AI agents.

Examples:

```text
list_studies
inspect_study
inspect_metadata
find_sequence
compare_studies
run_qc
register_images
run_segmentation
calculate_measurement
run_pipeline
get_provenance
export_dataset
generate_report
```

The agent must never have unrestricted shell access.

---

## 32. Natural Language Interface

Potential commands:

```text
"Show the latest T1 scan."

"Compare the last two studies."

"Find studies missing FLAIR."

"Run the brain segmentation model."

"Calculate hippocampal volume."

"Explain how this segmentation was generated."

"Export this project as BIDS."
```

Natural language commands must compile into explicit operations.

The UI should show what the agent intends to execute.

---

## 33. Security Boundary

Treat MRI files and metadata as untrusted.

Protect against:

- malformed DICOM;
- decompression bombs;
- path traversal;
- malicious metadata;
- command injection;
- oversized files;
- unsafe external tools.

Never pass metadata directly into shell commands.

---

## 34. Privacy

Default to:

- local processing;
- no patient data in logs;
- explicit network access;
- secure credentials;
- de-identification workflows.

Do not send patient data to AI services automatically.

---

## 35. De-identification

Provide DICOM de-identification.

The workflow should clearly show:

```text
Original Dataset
      ↓
De-identification
      ↓
Validation
      ↓
Export
```

Never claim a dataset is anonymous without appropriate guarantees.

---

## 36. Spatial Correctness

This is one of the most important technical requirements.

Always consider:

- voxel spacing;
- affine;
- orientation;
- origin;
- coordinate systems;
- slice order;
- resampling;
- registration.

Never assume:

```text
array[0] == anatomical left/right/front/back
```

Tests must include rotated and differently oriented datasets.

---

## 37. Numerical Correctness

MRI calculations must have reference tests.

Test:

- volume;
- intensity;
- transformations;
- segmentation metrics;
- quantitative maps;
- resampling;
- ROI statistics.

Define numerical tolerances explicitly.

---

## 38. Visualization

The frontend should be optimized for medical imaging.

Potential capabilities:

- 2D slice viewer;
- synchronized views;
- MPR;
- overlays;
- segmentation;
- measurements;
- metadata panel;
- comparison mode;
- QC visualization.

Do not spend development resources recreating every feature of mature viewers
unless it supports the product's unique workflows.

---

## 39. UI Architecture

Recommended structure:

```text
app/
├── workspace/
├── studies/
├── datasets/
├── viewer/
├── compare/
├── pipelines/
├── segmentation/
├── quantitative/
├── qc/
├── experiments/
├── reports/
└── settings/
```

Keep domain logic out of UI components.

Prefer:

```text
UI
 ↓
Application hooks/services
 ↓
Typed Tauri API
 ↓
Rust
```

---

## 40. TypeScript Rules

Use strict TypeScript.

Avoid:

```typescript
any;
```

for domain data.

Prefer explicit domain types:

```typescript
type StudyId = string;
type SeriesId = string;

interface Study {
  id: StudyId;
  subjectId: string;
  date: string;
  series: Series[];
}
```

Use discriminated unions for processing results.

---

## 41. Rust Rules

Rust should own:

- native resources;
- filesystem;
- processes;
- background jobs;
- secure operations;
- database access;
- scientific-tool orchestration.

Keep Tauri commands thin.

Prefer:

```text
Tauri Command
      ↓
Application Service
      ↓
Domain Service
      ↓
Infrastructure
```

Do not put complex business logic directly in Tauri command handlers.

---

## 42. IPC Rules

All IPC messages must be:

- typed;
- validated;
- versionable;
- documented.

Avoid sending massive MRI volumes through IPC unnecessarily.

Prefer:

```text
Rust
 ↓
file / memory-mapped resource
 ↓
frontend viewer
```

rather than copying gigabytes of image data through serialized JSON.

---

## 43. Performance

MRI datasets can be extremely large.

Use:

- lazy loading;
- chunking;
- caching;
- memory mapping;
- background processing;
- progressive rendering;
- GPU acceleration where useful.

Avoid unnecessary serialization.

Avoid copying large arrays between:

```text
Rust → JSON → JavaScript
```

---

## 44. Feature Prioritization

Use:

```text
User Value × Workflow Frequency × Differentiation
-------------------------------------------------
Implementation Cost × Risk
```

Prioritize features that:

- remove manual work;
- integrate multiple tools;
- improve reproducibility;
- improve interoperability;
- provide MRI-specific intelligence;
- enable automation.

---

## 45. Highest-Priority Features

### Phase 1 — Foundation

1. [ ] Workspace
2. [ ] Dataset management
3. [ ] DICOM import
4. [ ] NIfTI support
5. [ ] MRI study browser
6. [ ] Metadata viewer
7. [ ] Basic 2D viewer
8. [ ] Provenance system

### Phase 2 — MRI Intelligence

1. [ ] Sequence classification
2. [ ] Study normalization
3. [ ] Protocol validation
4. [ ] MRI QC
5. [ ] Cross-study comparison

### Phase 3 — Research Workflow

1. [ ] Pipeline builder
2. [ ] Background job system
3. [ ] DICOM → BIDS
4. [ ] Scientific-tool integration
5. [ ] Quantitative MRI
6. [ ] Segmentation review

### Phase 4 — AI

1. [ ] Model registry
2. [ ] Local model execution
3. [ ] AI segmentation
4. [ ] AI review
5. [ ] Agent API
6. [ ] Natural-language workflow interface

### Phase 5 — Advanced

1. [ ] Longitudinal biomarkers
2. [ ] Experiment tracking
3. [ ] Dataset diff
4. [ ] Collaborative review
5. [ ] Automated research reports

---

## 46. Features to Avoid

Do not prioritize:

- generic DICOM viewer functionality;
- generic PACS;
- generic image editor;
- generic AI chatbot;
- generic notebook;
- generic cloud storage;
- generic project management.

Build MRI-specific workflows instead.

---

## 47. Definition of Done

A feature is complete when:

- [ ] Problem is documented
- [ ] Existing solutions were investigated
- [ ] Gap is clearly identified
- [ ] Architecture is documented
- [ ] TypeScript types exist
- [ ] Rust APIs are typed
- [ ] IPC is validated
- [ ] Tests exist
- [ ] Imaging edge cases are tested
- [ ] Provenance is captured
- [ ] Errors are handled
- [ ] Documentation exists
- [ ] Privacy implications are reviewed
- [ ] Security implications are reviewed
- [ ] Performance implications are considered

---

## 48. Agent Workflow

Before coding:

```text
1. Read AGENTS.md
2. Inspect repository
3. Search for existing implementation
4. Identify existing scientific libraries
5. Identify the actual product gap
6. Write implementation plan
```

During coding:

```text
1. Keep UI and native responsibilities separate
2. Keep IPC typed
3. Keep domain logic outside React
4. Keep native logic outside UI
5. Prefer existing scientific tools
6. Record provenance
7. Add tests
```

After coding:

```text
1. Run tests
2. Run type checking
3. Run Rust checks
4. Run linting
5. Test representative MRI datasets
6. Review spatial correctness
7. Review security
8. Update documentation
```

---

## 49. Golden Rule

Before implementing any feature, ask:

> Why can't a researcher accomplish this today using OHIF, 3D Slicer, ANTs, FSL,
> FreeSurfer, MONAI, qMRLab, dcm2niix and BIDS tooling?

If the answer is:

> They already can.

Do not build it.

If the answer is:

> They can, but they must manually move data between several applications,
> repeatedly configure tools, lose metadata, lose provenance, and cannot easily
> reproduce the workflow.

That is the gap.

**Build the missing layer.**

---

## 50. North Star

The final product should provide:

```text
                     MRI DATA
                        │
                        ▼
              ┌──────────────────┐
              │ Understand Study │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │   MRI QC         │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Normalize        │
              │ DICOM / BIDS     │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Analyze          │
              └────────┬─────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
      Register      Segment      Quantify
          │            │            │
          └────────────┼────────────┘
                       ▼
              ┌──────────────────┐
              │ Human Review     │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Reproduce        │
              │ & Compare        │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │ Report / Export  │
              └──────────────────┘
```

The application should ultimately become:

> **A native MRI research workspace that unifies imaging data, scientific tools,
> AI models, analysis pipelines, and reproducible results.**

The differentiator is not the renderer.

The differentiator is the **workflow layer connecting everything together**.
