# Contributing

**MRI** is a local-first desktop workbench for a post-stroke aphasia prediction
pipeline. It reads finished run folders, launches runs through the pipeline CLI,
streams a run's events, compares runs, and exports tables and text artefacts. It
is a research prototype: no clinical claims, no uploads, no accounts, no
training logic.

The science lives in `pipeline/`. This package owns the interface, the
filesystem boundary and the process boundary.

## Prerequisites

- Node.js (see `.nvmrc` at the repo root) and `pnpm`
- A Rust toolchain, only if you need the desktop shell or to run `cargo test`
- A Python project that satisfies `pipeline doctor`, only if you need to launch
  runs

## Getting started

Install from the workspace root:

```bash
pnpm install
```

Then work in this package:

```bash
pnpm --filter=@hieudoanm.github.io/mri dev      # Next.js dev server
pnpm --filter=@hieudoanm.github.io/mri tauri dev
```

## Commands

Run these from the workspace root with the `--filter` flag, or run them directly
in this package.

| Task                    | Command                                                 |
| ----------------------- | ------------------------------------------------------- |
| Dev server              | `pnpm dev`                                              |
| Desktop dev             | `pnpm tauri dev`                                        |
| Build (static export)   | `pnpm build`                                            |
| Types                   | `pnpm typecheck`                                        |
| Lint (auto-fixing)      | `pnpm lint`                                             |
| Format                  | `pnpm format`                                           |
| Tests with coverage     | `pnpm test`                                             |
| One suite, no coverage  | `pnpm jest <path> --coverage=false`                     |
| E2E                     | `pnpm test:e2e`                                         |
| Regenerate config types | `pnpm generate:contract`                                |
| Rust tests / lint       | `cargo test`, `cargo fmt`, `cargo clippy --all-targets` |

`pnpm test` enforces an 80% global threshold over `src/**/*.{ts,tsx}`, so new
code needs new tests in the same change. When iterating on a single suite, pass
`--coverage=false` or the global threshold will fail for unrelated reasons.

### Regenerating the configuration contract

The launch form is generated from the pipeline's JSON Schema. When the
pipeline's config changes:

```bash
cd pipeline && uv run pipeline export-schemas --output-dir ../schemas
cp schemas/config_schema.json ../src/lib/contract/generated/config.schema.json
cd .. && pnpm generate:contract
```

Commit the schema **and** the generated types together; CI compares them.

## Coding conventions

The repository-wide rules in `AGENTS.md` apply. The notes below are the ones
that bite hardest in this package.

### General

1. **Explicit types** on exported functions and components; no `any` for domain
   data.
2. **Flat over nested** — guard clauses, functions under ~30 lines, files under
   ~200.
3. **Self-documenting names** — `readRun`, `listConfigs`, `metricDelta`; no
   comments restating the name.
4. **Explicit error handling** — every `invoke` failure reaches the UI.
   Swallowing an error is a bug; `SettingsTemplate` failed this way once
   already.
5. **Test names as documentation** —
   `test('says nothing can be compared when neither run has metrics')`.

### TypeScript

1. Arrow functions for declarations and components; `const` unless reassigned.
2. `interface` for object shapes, `type` for unions and primitives; `satisfies`
   over casts; `never` in exhaustive switches.
3. Validate anything crossing the IPC boundary with `zod`
   (`src/lib/contract/schema.ts`).
4. Domain logic lives in `src/lib`, not in a component. Templates orchestrate;
   they do not parse.

### React

1. Hooks at the top level; reusable logic in `src/lib/hooks` or a feature hook.
2. Stable `key`s, no array indices.
3. Memoise only after profiling.
4. Colocate state with the component that owns it; do not lift it into context
   without a reason.

### Next.js

1. App Router; `"use client"` only where interactivity or hooks are required.
2. `output: 'export'` means no API routes, no server actions, and no dynamic
   segments. Address a run with a query string: `/runs?run=<runId>`,
   `/compare?a=<runId>&b=<runId>`, read through `useSearchParams`.
3. One page folder per route, one template in `src/components/templates` behind
   it.
4. `next/link` for navigation.

### Styling and components

1. Tailwind utilities, DaisyUI component classes (`card`, `btn`, `badge`,
   `table`).
2. `prettier-plugin-tailwindcss` owns class order — do not hand-sort.
3. No icon library: use text, CSS shapes or emoji.
4. Atomic structure: `atoms` → `molecules` → `templates`. Keep templates thin
   and put the branch-heavy parts in a molecule.
5. No charting or volume-rendering dependency. Tables of numbers, text artefacts
   and plain ASCII summaries are the supported presentation; adding a heavy
   viewer needs a written justification first.

## Rust and Tauri conventions

1. `Result<T, AppError>` for fallible work, `thiserror` for the error enum, no
   `unwrap`/`panic!` outside tests.
2. Commands stay thin: `#[tauri::command] → services/ → domain/`. No parsing or
   business logic in a command.
3. **Never concatenate a command.** Build `CommandSpec { program, args }`,
   validate the program against the interpreter allow-list, and reject arguments
   containing NUL.
4. Resolve every path with `services::paths::resolve_in(root, relative)`;
   absolute paths, `..` and anything resolving outside the project root are
   refused.
5. Treat pipeline output as untrusted input: parse defensively, keep unknown
   event shapes, and never log patient data.
6. Keep Tauri permissions minimal — `core:default` and `dialog:default` only.
   All filesystem and process access goes through Rust, not plugins.
7. `cargo fmt`, `cargo clippy --all-targets` and `cargo test` must be clean.

## Run-folder conventions

1. **The contract is the files.** `manifest.json`, `config.yaml`,
   `events.jsonl`, `metrics.json`, `predictions.parquet`, `artifacts/` — see
   `docs/ARCHITECTURE.md`.
2. An unknown major `schema_version` is an error, never a guess.
3. Unknown keys survive a round trip: the config view is for editing, the raw
   document is for saving.
4. Never load `predictions.parquet` or image artefacts to answer a summary
   question.
5. Only offer a capability the pipeline actually exposes — `check_setup()` reads
   the CLI's `--help` and reports `canLaunch`.

## Testing conventions

1. One suite per unit, colocated in `__tests__/`, named after the unit under
   test.
2. Arrange–Act–Assert; assert on user-visible text and roles (`getByRole`,
   `findByText`).
3. Cover the failure path next to the happy path. Most real defects here were
   silent failures, not wrong values.
4. `jest.setup.ts` mocks the Tauri modules globally; a suite that needs real
   behaviour overrides the mock.
5. Rust: unit-test parsers, path validation and command construction. No test
   needs a real Python environment.
6. E2E (`pnpm test:e2e`) covers the static pages only; anything requiring the
   desktop shell belongs in Jest.

## Before you push

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
cd src-tauri && cargo fmt && cargo clippy --all-targets && cargo test
```

Update `docs/` when you change the contract, a command, or the roadmap status.
