# Desktop Workbench Roadmap

Project: local-first workbench for the post-stroke aphasia prediction pipeline.
Stack: Tauri 2 + Next.js (static export) + TypeScript + Rust. Status: v0.2,
2026-10-05. Companion document: `pipeline/docs/ROADMAP.md` (the pipeline this
app drives).

The workbench is a **client**, never a second implementation of the science. It
reads run folders, launches runs the CLI supports, streams events, compares runs
and exports results. Every phase below is marked with what actually exists in
the repository.

---

## 1. Purpose

A local-first desktop workbench to browse data, launch pipeline runs, compare
experiments, inspect generated artefacts, and export dissertation-ready tables.

It is a thin client:

- it never trains models,
- it never re-implements pipeline logic,
- it works on finished run folders even when no Python process is running.

## 2. Non-goals

- Clinical decision support or any clinical claim. The app states that it is a
  research prototype.
- Uploading patient data anywhere. Everything stays on the local machine.
- User accounts or authentication.
- Editing or running arbitrary code.
- In-app training logic.
- A general DICOM/NIfTI viewer. The pipeline produces images as artefacts; the
  app lists them, opens the text ones, and leaves volume rendering out.

## 3. Principles

- Files first: the app reads run folders directly. Starting processes is a
  separate, optional capability that is offered only when the CLI advertises it.
- The contract is files + JSON Lines + JSON Schema, nothing else.
- Least privilege: filesystem access is scoped to the project folder, and only
  the pipeline interpreter may be spawned.
- Works offline.
- Fail with a clear message: unknown schema versions, missing environments,
  missing commands and missing files each get a readable explanation.

## 4. Stack

| Layer    | Choice                                                                        |
| -------- | ----------------------------------------------------------------------------- |
| Shell    | Tauri 2, `core` + `dialog` permissions only                                   |
| Frontend | Next.js static export, TypeScript, client-side rendering only                 |
| Styling  | Tailwind CSS 4 + DaisyUI                                                      |
| Tables   | TanStack Table                                                                |
| Types    | Generated from the pipeline's JSON Schema, validated at the boundary with zod |
| Backend  | Rust: filesystem, process manager, JSON/JSONL/YAML parsing                    |
| Tests    | Jest + Testing Library with an 80% coverage threshold, plus Playwright smoke  |
| Icons    | Text, emoji or CSS shapes; no icon or charting dependency                     |

Constraints from static export:

- no Next.js API routes and no server-side data fetching at runtime,
- all data comes through typed Tauri commands and events,
- routing uses client-side navigation with query parameters rather than
  build-time dynamic routes (`/runs?run=…`, `/compare?a=…&b=…`).

## 5. Contract with the pipeline

The app depends only on these, all defined in `pipeline/`:

- run folder layout (`manifest.json`, `config.yaml`, `events.jsonl`,
  `metrics.json`, `predictions.parquet`, `artifacts/`),
- JSON Lines event types (`stage_start`, `progress`, `metric`, `stage_end`,
  `error`),
- config schemas (used to render the launch form),
- a `schema_version` in every manifest. The app refuses an unknown major version
  with a clear message.

Settings the app stores: project root folder, path to the Python environment (or
`uv`), default config folder. "Check setup" runs `pipeline doctor`, reads the
CLI's `--help`, and reports both the environment and whether a run can be
launched.

## 6. Screens

| Screen     | Purpose                                                    | State      |
| ---------- | ---------------------------------------------------------- | ---------- |
| Overview   | Recent runs, launch status, rigour summary, open problems  | shipped    |
| Setup      | Environment report, dependencies, available CLI commands   | shipped    |
| Settings   | Project folder, interpreter path, config folder            | shipped    |
| Launch     | Choose a config, edit parameters, start or stop a run      | shipped\*  |
| Runs       | Table of all runs with filters and sorting                 | shipped    |
| Run detail | Config, manifest, live or final events, metrics, artefacts | shipped    |
| Analysis   | Per-participant predictions and exported metric tables     | shipped    |
| Compare    | Side-by-side metrics with confidence-interval overlap      | shipped    |
| Datasets   | Cohort table, outcome distribution, data quality flags     | shipped    |
| Rigour     | Leakage checks and lock-box access log                     | shipped    |
| Viewer     | Generated images and text artefacts per participant        | metadata\* |

\* The launcher is capability-gated: the pipeline CLI has no `run` subcommand
yet, so Setup says so and no launch is offered. Everything around it is wired
and tested.

\* The viewer lists artefacts and opens text ones; volume rendering is out of
scope until a use case justifies the dependency.

## 7. Phases

### Phase A0: Scaffold — shipped

- [x] Tauri 2 + Next.js static export project.
- [x] Types generated from the pipeline JSON Schema as a build step
      (`pnpm generate:contract`).
- [x] Scoped path access, minimal Tauri permissions, settings and setup screens.
- [x] CI builds, lints, type-checks and tests.

### Phase A1: Run browser — shipped

- [x] Runs table with filters (status, model, date, tags) and sorting.
- [x] Run detail: config, manifest, events, metrics, artefact listing.
- [x] Graceful handling of corrupt or incomplete runs (problems list, unknown
      event shapes preserved).

### Phase A2: Launcher — built, gated on the pipeline

- [x] Form generated from the config schema, with defaults and validation.
- [x] Structured command construction; events streamed to a live log and
      progress view.
- [x] Cancel a run cleanly.
- [x] One active run per project, tracked in a launcher registry.
- [ ] The pipeline exposes
      `pipeline run --config … --output-dir … [--run-id …]`. Until then Setup
      reports `canLaunch: false` and the button stays honest.

### Phase A3: Dashboard and comparison — shipped

- [x] Metrics with confidence intervals across seeds.
- [x] Compare view with overlap-based significance indication.
- [x] Export tables as CSV, Markdown and LaTeX; text artefacts viewable in-app.

### Phase A4: Dataset explorer — shipped

- [x] Cohort table with filters and outcome distribution.
- [x] Data quality flags (missing mask, missing scan, duplicate sessions).
- [x] Participant asset listing from the run folders.

### Phase A5: Image viewer — deliberately minimal

- [x] Gallery of generated images and text artefacts for a chosen participant.
- [ ] Volume rendering of scan + lesion mask + atlas overlays. Deferred: no use
      case has justified a WebGL NIfTI dependency, and a partial viewer is worse
      than an honest list of what the pipeline produced.

### Phase A6: Rigour panel — shipped

- [x] Leakage check display (participant overlap between splits).
- [x] Lock-box access log with a warning when it is evaluated more than planned.
- [x] Raw report and lock-box list available as text artefacts.

### Phase A7: Analysis views — shipped

- [x] Per-participant predictions and exported metric tables.
- [x] Calibration and subgroup tables as exported artefacts.
- [ ] Interactive saliency overlays. Stays in the pipeline's export path.

### Phase A8: Hybrid designer and ablation launcher — not planned

- Interactive symbol encoding would duplicate pipeline config. Out of scope
  while the app stays a client.

### Phase A9: Remote mode — not planned

Local-first is a requirement, not a stage. `pipeline serve` integration would
add network paths the app does not need.

### Phase A10: Packaging — deferred

Installers matter only if the app is distributed. Bringing your own Python
environment stays the default; bundling PyTorch is large and fragile.

## 8. Feature list

| ID   | Feature                                | Priority | Phase | Pipeline dependency   | State    |
| ---- | -------------------------------------- | -------- | ----- | --------------------- | -------- |
| A-01 | Project settings and setup check       | MVP      | A0    | `pipeline doctor`     | shipped  |
| A-02 | Runs table and run detail              | MVP      | A1    | run folder format     | shipped  |
| A-03 | Launcher with live events and cancel   | MVP      | A2    | CLI `run` command     | gated    |
| A-04 | Metrics dashboard with intervals       | MVP      | A3    | `metrics.json`        | shipped  |
| A-05 | Compare view                           | MVP      | A3    | report tables         | shipped  |
| A-06 | Table and text export (CSV, MD, LaTeX) | MVP      | A3    | report tables         | shipped  |
| A-07 | Dataset explorer and quality flags     | Should   | A4    | cohort builder        | shipped  |
| A-08 | Artefact gallery                       | Should   | A5    | image generators      | shipped  |
| A-09 | Rigour panel and lock-box log          | Should   | A6    | splitter, access log  | shipped  |
| A-10 | Error analysis and prediction tables   | Should   | A7    | `predictions.parquet` | shipped  |
| A-11 | Volume rendering                       | Stretch  | A5    | image generators      | deferred |
| A-12 | Remote mode                            | Stretch  | A9    | `pipeline serve`      | dropped  |
| A-13 | Packaged installers                    | Optional | A10   | none                  | deferred |

## 9. Open items

1. **`pipeline run` does not exist yet.** The workbench builds the command,
   streams and cancels correctly, but nothing can be launched until the CLI
   grows a `run` subcommand that honours `--config`, `--output-dir` and
   `--run-id` and emits the event JSONL. Setup reports this state instead of
   hiding it.
2. **Schema regeneration is manual.** The generated config types drift silently
   until someone runs `pnpm generate:contract`; CI only checks what is
   committed.
3. **Artefact rendering.** PNG artefacts are listed, not displayed. Any future
   viewer must load bytes through a Rust command — no filesystem plugin — and
   must justify the dependency size.
4. **Paper-facing exports** (LaTeX tables, figures) need a check against the
   pipeline's own report output to guarantee they match.

## 10. Risks

| Risk                                                            | Mitigation                                                  |
| --------------------------------------------------------------- | ----------------------------------------------------------- |
| Tauri permission scopes block needed access                     | Only `core` + `dialog` are granted; all access is Rust-side |
| Python environment not found                                    | `pipeline doctor` check and a clear setup screen            |
| Pipeline CLI lacks a command the app expects                    | Setup reads `--help` and reports `canLaunch`                |
| Static export limits routing                                    | Query-parameter routing from the start                      |
| Large files make the UI slow                                    | Summaries by default; lazy-load predictions and artefacts   |
| Schema drift between pipeline and app                           | Generate types from the schema; commit both together        |
| App work crowds out the research                                | Time-box to about a quarter of effort; the cut order below  |
| Differences between operating systems (paths, process handling) | Test on each platform actually used                         |

## 11. Cut order if time is short

Everything in the shipped set is load-bearing for the dissertation workflow. If
time disappears: drop artefacts before the rigour panel, and the rigour panel
before run detail. Never drop the run browser — the app must stay useful with no
Python running.

## 12. Definition of done

- The main results table and the key text artefacts can be exported from the
  app.
- A run's config, events, metrics and artefacts can be inspected without
  touching the terminal.
- The app works on finished runs with no Python process running.
- The launcher never offers a capability the pipeline does not expose.
- Contract tests pass against the current pipeline schemas.
- The app clearly labels itself as a research prototype, not a clinical tool.
