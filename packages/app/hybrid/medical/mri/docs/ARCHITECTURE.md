# Architecture

## Goals

- An **MRI research workspace and orchestration layer** — not another generic
  DICOM viewer
- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Local-first: full functionality offline, no MRI data leaves the device for
  core workflows
- Orchestration of mature scientific tools (dcm2niix, ANTs, FSL, MONAI) instead
  of reimplementing them
- Reproducibility through provenance capture on every derived artifact
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer            | Technology                                |
| ---------------- | ----------------------------------------- |
| Framework        | Next.js (App Router, static export)       |
| Language         | TypeScript (strict)                       |
| Styling          | Tailwind CSS + DaisyUI                    |
| Icons            | react-icons (Fi set)                      |
| Desktop          | Tauri 2 (Rust backend)                    |
| Core services    | Rust (filesystem, jobs, DB, processes)    |
| Storage          | Embedded database + filesystem assets     |
| Scientific tools | dcm2niix, ANTs, FSL/MRtrix, MONAI, qMRLab |
| Testing          | Jest + Playwright                         |
| Linting          | ESLint + Prettier                         |
| Package Manager  | pnpm                                      |

## System Layers

```txt
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
```

The UI must not directly execute arbitrary native commands — the Rust layer
mediates all native capabilities.

## Directory Structure

```txt
src/
├── app/             # App Router pages and layouts
├── components/      # Atomic design components
│   ├── atoms/       # Smallest building blocks (Button, Slider)
│   ├── molecules/   # Combinations of atoms (MetadataPanel, SliceSlider)
│   ├── organisms/   # Complex UI sections (ViewerCanvas, StudyBrowser)
│   └── templates/   # Page-level layouts (WorkspaceTemplate, ViewerTemplate)
├── hooks/           # Custom React hooks (useStudy, useViewer)
├── lib/             # Domain logic (types, IPC client, formatting)
├── providers/       # Context providers
├── styles/          # Global CSS (Tailwind base layer)
└── types/           # Shared TypeScript types

src-tauri/
├── src/
│   ├── commands/    # Thin Tauri command handlers (IPC boundary)
│   ├── services/    # Application services (studies, pipelines, jobs)
│   ├── domain/      # Domain logic (classification, validation, QC)
│   ├── infra/       # Database, filesystem, process manager
│   └── security/    # Validation, sanitization, limits
└── capabilities/    # Tauri permission configuration
```

Domain modules mirror MRI concepts rather than generic CRUD entities: `studies`,
`series`, `images`, `acquisitions`, `datasets`, `segmentations`, `measurements`,
`pipelines`, `models`, `experiments`, `provenance`, `quality`, `reports`,
`integrations`.

## IPC Boundary

The Tauri IPC surface is a public API. Explicit typed commands only:

```txt
open_dataset()          list_studies()         get_study()
get_series()            read_metadata()        run_pipeline()
run_qc()                run_segmentation()     calculate_measurement()
get_provenance()        export_dataset()
```

Generic execution APIs (`execute(command)`, `runShell(command)`) are forbidden
at the boundary. All IPC messages are typed, validated, versionable, and
documented. Large volumes never cross IPC as serialized JSON — the frontend
receives file or memory-mapped resource references instead.

## Rendering Strategy

- **Static export** (`output: 'export'`) — all pages rendered at build time
- **Server Components** by default; `"use client"` only where interactivity,
  browser APIs, or hooks are required
- No server actions, no API routes — pure static
- Flat routes with `useSearchParams()` over dynamic segments

## State Management

- **Local state** with `useState` / `useReducer` — viewer state (orientation,
  zoom, window/level) is component-scoped
- **Custom hooks** encapsulate study navigation and viewer state transitions
- **Context providers** wrap the app in `layout.tsx`
- Domain logic stays out of UI components:

```txt
UI → Application hooks/services → Typed Tauri API → Rust
```

## Data Flow

1. Datasets are imported via Tauri file dialogs (desktop) or the browser File
   API (web fallback)
2. Rust ingests DICOM/NIfTI, preserves original metadata, and stores logical
   references in the local database
3. The study intelligence layer classifies sequences, normalizes naming, and
   runs QC — inferred information is flagged with confidence, never presented as
   authoritative metadata
4. Volumes are streamed to the viewer via file/memory-mapped resources
5. Pipelines execute as background jobs through the Rust process manager; every
   derived artifact records provenance

### Filesystem Abstraction

Datasets are addressed by logical IDs, never hardcoded paths:

```txt
workspace://study/123
dataset://abc
series://xyz
artifact://result-123
```

Underlying storage may be local disk, an external drive, or a mounted dataset.

## Performance

- Lazy loading, chunking, caching, memory mapping for large volumes
- Background processing keeps the UI responsive — jobs report progress and
  support cancellation
- Progressive rendering for slice stacks
- GPU acceleration where useful
- No `Rust → JSON → JavaScript` copies of large arrays

## Security & Privacy

- MRI files and metadata are treated as untrusted: malformed DICOM,
  decompression bombs, path traversal, command injection, and oversized files
  are defended at the Rust boundary
- Commands are built from structured arguments, never string concatenation
- Default to local processing, no patient data in logs, explicit network access,
  de-identification workflows
- Patient data is never sent to AI services automatically

## Spatial & Numerical Correctness

- Voxel spacing, affine, orientation, origin, coordinate systems, slice order,
  resampling, and registration are always considered — never assume `array[0]`
  maps to an anatomical direction
- Numerical results (volume, intensity, transforms, segmentation metrics,
  quantitative maps) have reference tests with explicit tolerances
