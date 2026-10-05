# Desktop App Roadmap and Features

Project: local workbench for the post-stroke aphasia prediction pipeline Stack:
Tauri 2 + Next.js (static export) + TypeScript Status: draft v0.1, 2026-10-05
Companion document: ROADMAP-pipeline.md (the pipeline this app drives)

Week numbers assume a 20-week project, and the app starts only after the
pipeline run format is stable. Suggested time budget: about a quarter of total
project effort, because the dissertation is judged mainly on the science.

---

## 1. Purpose

A local-first desktop workbench to browse data, launch pipeline runs, compare
experiments, inspect images, and export dissertation-ready tables and figures.

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

## 3. Principles

- Files first: the app reads run folders directly. Starting processes is a
  separate, optional capability.
- The contract is files + JSON Lines + JSON Schema, nothing else.
- Least privilege: filesystem access is scoped to the project folder, and only
  the pipeline command may be spawned.
- Works offline.
- Fail with a clear message: unknown schema versions, missing environments and
  missing files each get a readable explanation.

## 4. Stack

| Layer       | Choice                                                                           |
| ----------- | -------------------------------------------------------------------------------- |
| Shell       | Tauri 2 with the shell, fs and dialog plugins                                    |
| Frontend    | Next.js static export, TypeScript, client-side rendering only                    |
| Styling     | Tailwind CSS                                                                     |
| Tables      | TanStack Table                                                                   |
| Charts      | ECharts                                                                          |
| MRI viewing | Niivue (WebGL NIfTI viewer)                                                      |
| Types       | Generated from the pipeline's JSON Schemas; optional runtime validation with zod |
| Tests       | Vitest + Testing Library, plus one end-to-end smoke test                         |
| Icons       | Text, emoji or CSS shapes; no inline SVG icon library                            |

Constraints from static export:

- no Next.js API routes and no server-side data fetching at runtime,
- all data comes through Tauri commands, events or the fs plugin,
- routing uses client-side navigation with query parameters rather than
  build-time dynamic routes.

## 5. Contract with the pipeline

The app depends only on these, all defined in `pipeline/schemas/`:

- run folder layout (`config.yaml`, `manifest.json`, `events.jsonl`,
  `metrics.json`, `predictions.parquet`, `artifacts/`),
- JSON Lines event types (`stage_start`, `progress`, `metric`, `stage_end`,
  `error`),
- config schemas (used to render the launch form),
- a `schema_version` field in every manifest. The app refuses an unknown major
  version with a clear message.

Settings the app stores: project root folder, path to the Python environment (or
`uv`), default config folder. A "Check setup" button runs `pipeline doctor` and
shows the result.

## 6. Screens

| Screen     | Purpose                                                  |
| ---------- | -------------------------------------------------------- |
| Runs       | Table of all runs with filters and sorting               |
| Run detail | Config, manifest, live or final logs, metrics, artefacts |
| Compare    | Side-by-side metrics and significance for selected runs  |
| Datasets   | Cohort table, outcome distribution, data quality flags   |
| Viewer     | Scans, lesion masks, atlas overlays, generated images    |
| Launch     | Choose a config, edit parameters, start or stop a run    |
| Rigour     | Leakage checks and lock-box access log                   |
| Settings   | Project folder, environment path, setup check            |

## 7. Phases

### Phase A0: Scaffold (weeks 4-5)

Needs: pipeline P-04, P-05 in draft form.

- [ ] Tauri 2 + Next.js static export project in `app/`.
- [ ] Type generation from the pipeline JSON Schemas as a build step.
- [ ] Scoped fs permissions and a settings screen.
- [ ] CI builds the app.

Done when: the app opens, reads the project folder and shows a "setup OK"
status.

### Phase A1: Run browser (weeks 5-7)

Needs: pipeline run folders from Phase 1.

- [ ] Runs table with filters (status, model, date, tags).
- [ ] Run detail: config, manifest, metrics, artefact list.
- [ ] Graceful handling of corrupt or incomplete runs.

Done when: every run folder produced by the pipeline appears and opens without
Python running.

### Phase A2: Launcher (weeks 7-9)

Needs: pipeline CLI events (Phase 1).

- [ ] Form generated from the config schema, with validation.
- [ ] Spawn the pipeline command through the shell plugin, stream events to a
      live log and progress view.
- [ ] Cancel a run cleanly.
- [ ] One-run-at-a-time queue for GPU jobs.

Done when: a baseline run can be launched, watched and cancelled from the app.

### Phase A3: Dashboard and comparison (weeks 8-11)

Needs: pipeline metrics and report tables (Phase 2).

- [ ] Metrics with confidence intervals across seeds.
- [ ] Compare view with the corrected test and FDR results.
- [ ] Export tables as CSV and LaTeX, and charts as PNG.

Done when: the main results table in the dissertation can be exported from the
app and matches the CLI report exactly.

### Phase A4: Dataset explorer (weeks 9-11)

Needs: pipeline cohort builder (Phase 1).

- [ ] Cohort table with filters and outcome distribution.
- [ ] Data quality flags (missing mask, missing scan, duplicate sessions).
- [ ] Split view showing train, validation and lock-box membership.

Done when: the usable sample size and the exclusion reasons are visible at a
glance.

### Phase A5: Image viewer (weeks 10-13)

Needs: pipeline image generators (Phase 3).

- [ ] Niivue viewer for scan + lesion mask + atlas overlays.
- [ ] Gallery of stitched, ROI and hybrid images for a chosen participant.
- [ ] Quick alignment check (overlay toggle).

Done when: a participant's scan, mask and generated hybrid image can be
inspected side by side.

### Phase A6: Rigour panel (weeks 11-12)

Needs: pipeline P-02, P-03.

- [ ] Automatic leakage check display (participant overlap between splits).
- [ ] Lock-box access log with a warning when it is evaluated more than planned.
- [ ] Protocol file viewer (the pre-written evaluation protocol).

Done when: the panel shows pass or fail for each check and links to the
evidence.

### Phase A7: Analysis views (weeks 13-16)

Needs: pipeline Phase 6.

- [ ] Per-participant predictions and misclassified cases.
- [ ] Calibration plots and subgroup performance.
- [ ] Saliency and ROI importance overlays on the viewer.

Done when: the dissertation's analysis figures can be browsed in the app and
exported.

### Phase A8: Hybrid designer and ablation launcher (stretch, weeks 15-17)

- [ ] Interactive editor for symbol encodings with a live preview.
- [ ] One-click ablation runs (blank symbols, shuffled tabular features).

### Phase A9: Remote mode (stretch)

Needs: pipeline Phase 7.

- [ ] Connect to `pipeline serve` over localhost or an SSH tunnel.
- [ ] Monitor a remote run and sync finished run folders.

### Phase A10: Packaging (optional)

- [ ] Installers for the platforms actually used.
- [ ] Decide between "bring your own Python environment" and a bundled pipeline
      sidecar. Bundling PyTorch is large and fragile, so defer unless the app is
      distributed to other people.

## 8. Feature list

| ID   | Feature                                   | Priority | Phase | Pipeline dependency  |
| ---- | ----------------------------------------- | -------- | ----- | -------------------- |
| A-01 | Project settings and setup check          | MVP      | A0    | `pipeline doctor`    |
| A-02 | Runs table and run detail                 | MVP      | A1    | run folder format    |
| A-03 | Launcher with live logs and cancel        | MVP      | A2    | CLI events           |
| A-04 | Metrics dashboard with intervals          | MVP      | A3    | metrics.json         |
| A-05 | Compare view with significance            | MVP      | A3    | report tables        |
| A-06 | Table and figure export (CSV, LaTeX, PNG) | MVP      | A3    | report tables        |
| A-07 | Dataset explorer and quality flags        | Should   | A4    | cohort builder       |
| A-08 | Niivue image viewer                       | Should   | A5    | image generators     |
| A-09 | Rigour panel and lock-box log             | Should   | A6    | splitter, access log |
| A-10 | Error analysis and calibration views      | Should   | A7    | predictions.parquet  |
| A-11 | Saliency and ROI importance overlays      | Should   | A7    | explainability       |
| A-12 | Hybrid image designer                     | Stretch  | A8    | image generators     |
| A-13 | Ablation launcher                         | Stretch  | A8    | ablation runner      |
| A-14 | Remote mode                               | Stretch  | A9    | `pipeline serve`     |
| A-15 | Packaged installers                       | Optional | A10   | none                 |

## 9. Cut order if time is short

Drop in this order: A10, A9, A8, A7, A5. The smallest version still worth having
is A0 + A1 + A2 + A3 (runs, launcher, dashboard, export), which already supports
the dissertation workflow.

## 10. Risks

| Risk                                                                | Mitigation                                                              |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Tauri permission scopes block the pipeline command or folder access | Configure scopes early in A0 and test on a clean machine                |
| Python environment not found                                        | `pipeline doctor` check and a clear setup screen                        |
| Static export limits routing                                        | Use query-parameter routing from the start                              |
| Niivue cannot load local files as expected                          | Prototype local file loading in A0 before committing to A5              |
| Large files make the UI slow                                        | Read metrics and summaries by default, lazy-load predictions and images |
| Schema drift between pipeline and app                               | Generate types from the schemas and add a contract test                 |
| App work crowds out the research                                    | Time-box to about a quarter of effort; follow the cut order             |
| Differences between operating systems (paths, process handling)     | Test on each platform actually used                                     |

## 11. Definition of done

- The main results table and the key figures can be exported directly from the
  app.
- A run can be launched, watched, cancelled and compared without touching the
  terminal.
- The app works on finished runs with no Python process running.
- Contract tests pass against the current pipeline schemas.
- The app clearly labels itself as a research prototype, not a clinical tool.
