# Architecture

## What this application is

A **local-first desktop workbench for a post-stroke aphasia prediction
pipeline**. It browses finished run folders, launches a run from a
schema-generated form, streams a run's events, compares runs, and exports tables
and text artefacts for a write-up.

It is deliberately **not** a DICOM viewer, a PACS, a notebook, or a model
trainer. All science lives in `pipeline/`; this app reads the pipeline's output,
starts the pipeline when the CLI allows it, and records provenance by
construction.

Non-goals, restated because they constrain the design:

- no authentication, no uploads, no network calls for core workflows;
- no clinical claims — the app labels itself a research prototype;
- no training logic and no re-implementation of pipeline stages;
- no arbitrary code execution from the UI.

## Tech stack

| Layer    | Choice                                                      |
| -------- | ----------------------------------------------------------- |
| Shell    | Tauri 2 (`core` + `dialog` permissions only)                |
| Frontend | Next.js App Router, `output: 'export'`, client components   |
| Language | TypeScript (strict)                                         |
| Styling  | Tailwind CSS 4 + DaisyUI                                    |
| Tables   | TanStack Table 8                                            |
| Types    | Generated from the pipeline's JSON Schema, validated by zod |
| Backend  | Rust 2021 (filesystem, process manager, JSON parsing)       |
| Tests    | Jest + Testing Library (unit), Playwright (e2e)             |
| Linting  | ESLint 10 + Prettier                                        |
| Packages | pnpm                                                        |

There is no database. Run folders on disk are the source of truth.

## Layers

```txt
┌────────────────────────────────────────────┐
│ Next.js static export (React 19)           │
│ templates → molecules → atoms, lib/, hooks │
└───────────────────┬────────────────────────┘
                    │  typed invoke(), typed listen()
┌───────────────────▼────────────────────────┐
│ Rust                                        │
│ commands/   thin IPC handlers              │
│ services/   settings, paths, runs, dataset, │
│             doctor, launcher (command,      │
│             process, stream, registry)      │
│ domain/     manifest, run, metrics, events, │
│             config, cohort, rigour, doctor  │
└───────────────────┬────────────────────────┘
                    │  one validated program, structured args
              ┌─────▼─────┐
              │  pipeline │
              │   (uv /   │
              │  python)  │
              └───────────┘
```

The UI never builds a command string. `src/lib/ipc/api.ts` exposes typed
functions; the Rust side accepts only structured arguments, and
`services/launcher/command.rs` validates the program against an allow-list
(`uv`, `python*`) before spawning.

## Tauri commands

```txt
pick_project_folder()   get_settings()        update_settings()
check_setup()           list_configs()        list_configs_in()
launch_run()            launcher_status()     cancel_run()
list_runs()             read_run()            list_run_statuses()
list_participant_assets() read_cohort()       read_rigour()
read_text_file()        get_overview()        overview_of()
```

There is no generic `execute(command)`. Every command is explicit, typed and
documented; large data never crosses the boundary as serialized JSON, only paths
and summaries do.

## Directory layout

```txt
src/
├── app/                  # App Router pages, one folder per route
├── components/
│   ├── atoms/            # primitives
│   ├── molecules/        # DataTable, DeltaTable, charts of text artefacts
│   └── templates/        # Dashboard, Setup, Launch, Runs, RunDetail, …
├── hooks/                # data hooks over the IPC layer
└── lib/
    ├── contract/         # DTOs, zod schema, generated config types
    ├── runs/, analysis/, dataset/, config/, export/, format/
    ├── hooks/            # useResources, usePipelineEvents
    ├── ipc/              # the only place invoke() is called
    ├── query/            # typed query-string state
    └── ui/               # presentational helpers

src-tauri/src/
├── commands/             # IPC boundary, no business logic
├── domain/               # parsing + validation, pure functions
├── services/             # filesystem, processes, settings, orchestration
└── error.rs              # one typed error enum for the boundary
```

## Static export and routing

`next.config.ts` sets `output: 'export'`, so there are no API routes, no server
actions, and no build-time dynamic segments. Run detail is addressed by query
string:

```txt
/runs?run=r_20260101_120000_000001
/compare?a=r_…&b=r_…
```

`src/lib/query/` parses and serializes those parameters, and every template
reads them through `useSearchParams`.

## Run folder contract

The pipeline owns the format; the app is a strict reader.

```txt
runs/r_<timestamp>_<microseconds>/
├── manifest.json          # schema_version, stages, counts, model, seed
├── config.yaml            # the configuration the run was launched with
├── events.jsonl           # stage_start | progress | metric | stage_end | error
├── metrics.json           # metrics with confidence intervals
├── predictions.parquet   # per-participant predictions (read lazily)
└── artifacts/             # generated images and tables
```

`domain/manifest.rs` refuses an unknown major `schema_version` with a readable
error instead of guessing. `domain/events.rs` keeps the raw event alongside the
parsed, known-shape events, so an event type this app does not know yet still
round-trips into the log view.

## Configuration contract

`config.yaml`/`config.json` files are read through `domain/config.rs`, which
returns two things: a _view_ for the launch form (typed fields, defaults, enums)
and the _original parsed document_. The UI edits the view but always submits the
merged result against the original, so unknown keys and comments survive a round
trip. Form field types are generated from the pipeline's JSON Schema:

```bash
cd pipeline && uv run pipeline export-schemas --output-dir ../schemas
cp schemas/config_schema.json ../src/lib/contract/generated/config.schema.json
pnpm generate:contract
```

## Launching and streaming

1. The UI writes the edited config into a run folder it created.
2. Rust builds `run_command()` —
   `uv run --project <root> pipeline run --config … --output-dir … [--run-id …]`,
   or `<python> -m pipeline …`.
3. `services/launcher/stream.rs` reads stdout as JSON Lines and re-emits typed
   Tauri events; the frontend updates the log, the progress bar and the metric
   list without polling.
4. `cancel_run()` terminates the child process; the launcher registry tracks one
   active run per project so a GPU slot cannot be oversubscribed silently.
5. Failures keep the child's stdout, stderr and exit code, and surface them in
   the UI.

The pipeline CLI currently exposes no `run` subcommand. Rather than pretending
otherwise, `check_setup()` reads the CLI's own `--help` and reports `canLaunch`;
the Setup screen says so plainly and the workbench never offers a launch it
cannot perform.

## Reading data

Runs are summarised, not loaded. `list_runs()` returns rows for the table;
`read_run()` loads manifest, config, events, metrics and an artefact listing on
demand; `read_text_file()` is the only way text artefacts are opened, and it
refuses paths that escape the project folder (`services/paths.rs` rejects
absolute paths and `..`).

## Security and privacy

- **Scoped filesystem.** Every read resolves inside the project root; `..`,
  absolute paths and symlink escapes are refused before any byte is read.
- **One spawnable program.** Only `uv` or a Python interpreter may be started,
  and its arguments are validated as a list — never interpolated into a shell
  string.
- **Untrusted input.** Manifests, events, configs and metrics are parsed
  defensively: unknown shapes are preserved or reported, malformed files produce
  errors with a path and a reason, and no patient data is written to logs.
- **Least privilege.** Tauri grants only `core:default` and `dialog:default`;
  there is no `fs` plugin and no `shell` plugin, because all access goes through
  Rust.
- **Local only.** No telemetry, no uploads, no remote inference.

## Performance

- Volume-scale files are never read for a summary; `predictions.parquet` and
  image artefacts stay on disk until requested.
- The run table sorts and filters on rows that already contain only small
  fields.
- Long-running work happens in the Rust process manager; the UI thread only
  receives events.
- Charts are rendered from tables of already-fetched metrics, so no per-frame
  parsing happens in React.

## Testing

- Jest + Testing Library cover domain libraries, hooks and every template, with
  an 80% global threshold over `src/**/*.{ts,tsx}`; the Rust side is covered by
  `cargo test` for parsing, path validation and command construction.
- Contract tests fail when the generated config types drift from the schema, so
  pipeline/app drift surfaces in CI rather than at runtime.
