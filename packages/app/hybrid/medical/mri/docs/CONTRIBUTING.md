# Contributing

Thanks for contributing to **MRI**, a hybrid MRI research workspace that
combines visualization, study intelligence, quantitative analysis, and
scientific-tool orchestration. It ships as a web app (browser), desktop app
(Tauri), and mobile app (Tauri Mobile).

## Getting Started

1. **Prerequisites**: Node.js (see `.nvmrc` at the repo root), `pnpm`, and a
   Rust toolchain for Tauri.
2. **Install dependencies** from the workspace root:

   ```bash
   pnpm install
   ```

3. **Run this app**:

   ```bash
   pnpm dev --filter=@hieudoanm.github.io/mri
   ```

## Development Commands

| Task       | Command                                            |
| ---------- | -------------------------------------------------- |
| Dev server | `pnpm dev --filter=@hieudoanm.github.io/mri`       |
| Build      | `pnpm build --filter=@hieudoanm.github.io/mri`     |
| Lint       | `pnpm lint --filter=@hieudoanm.github.io/mri`      |
| Format     | `pnpm format --filter=@hieudoanm.github.io/mri`    |
| Unit tests | `pnpm test --filter=@hieudoanm.github.io/mri`      |
| E2E tests  | `pnpm test:e2e --filter=@hieudoanm.github.io/mri`  |
| Desktop    | `pnpm tauri --filter=@hieudoanm.github.io/mri dev` |

Run `lint`, `format`, `test`, and `test:e2e` before pushing — CI enforces all of
them.

## Coding Conventions

The conventions below come from the repository-wide `AGENTS.md`. Follow them for
every change.

### General

1. **Explicit types over implicit** — annotate function signatures and exported
   symbols. A signature tells the reader more than a body.
2. **Flat over deeply nested** — short functions, minimal indentation, guard
   clauses (`if (!value) return`).
3. **Self-documenting identifiers** — `getStudyById(id)` needs no comment;
   `processData(x)` does.
4. **DRY** — when a pattern repeats, centralize it. Duplication is how bugs get
   missed.
5. **Small, focused files** — functions ≤ 30 lines, files ≤ 200 lines.
6. **Explicit error handling** — check errors and fail loudly; never let
   failures silently propagate.
7. **Test names as documentation** — `test("flags DWI missing b=0 volume")`.
8. **Consistent imports** — group by origin: stdlib, third-party, internal.
9. **Pure functions with explicit dependencies** — accept inputs, return
   outputs; no global/singleton state.
10. **Conventional layouts** — `src/`, `components/`, `lib/`, `e2e/`.

### TypeScript

1. Use arrow functions for all function declarations and component exports —
   `const fn = () => {}`, not `function fn() {}`.
2. Use `const` over `let` when a value is never reassigned.
3. Use `strict: true` in `tsconfig.json`.
4. Prefer `interface` over `type` for object shapes; use `type` for unions,
   intersections, and primitives.
5. Use branded types for domain primitives — `StudyId`, `SeriesId`.
6. Use discriminated unions for processing results.
7. Use `satisfies` over raw casts — `const config = {...} satisfies Config`.
8. Use `never` in exhaustive checks — `default: const _exhaustive: never = x;`.
9. Favour `zod` (or `io-ts`) for runtime validation at the IPC boundary.
10. No `any` for domain data.

### React

1. Prefer function components with hooks; never nest hooks inside conditionals
   or loops.
2. Extract custom hooks (`useX`) for reusable logic.
3. Use `useReducer` for complex state; colocate state with its consumers.
4. Use a stable `key` prop in lists — never array indices.
5. Memoise sparingly (`useMemo`/`useCallback`/`React.memo`) — profile first.
6. Run in `React.StrictMode` during development.

### Next.js

1. Use the App Router (`app/`) and prefer Server Components by default.
2. Mark files `"use client"` only when they need interactivity or hooks.
3. Use flat routes + `useSearchParams()` instead of dynamic segments where
   possible.
4. Use `loading.tsx`, `error.tsx`, `not-found.tsx` file conventions for
   fallbacks.
5. Use `next/link` for client-side navigation.

### Styling

1. Use Tailwind utility classes; compose, don't write custom CSS.
2. Use DaisyUI component classes (`btn`, `card`, `badge`, `input`).
3. Dark theme is the default.
4. `prettier-plugin-tailwindcss` sorts classes — keep class order consistent.
5. Use `react-icons` Feather (`Fi`) set for icons.

### Atomic Design

Structure components as atoms -> molecules -> organisms -> templates:

- `atoms/` — smallest building blocks (Button, Slider, Toggle)
- `molecules/` — combinations of atoms (MetadataPanel, SliceSlider)
- `organisms/` — complex UI sections (ViewerCanvas, StudyBrowser)
- `templates/` — page-level layouts (WorkspaceTemplate, ViewerTemplate)

## Rust & Tauri Conventions

1. Use `Result<T, E>` for fallible functions, never `panic!`; prefer `Option<T>`
   over sentinel values.
2. Use `thiserror` for domain error types; keep Tauri commands thin — delegate
   to application services:

   ```txt
   Tauri Command → Application Service → Domain Service → Infrastructure
   ```

3. Annotate IPC handlers with `#[tauri::command]` and register them via
   `generate_handler![]`; share state through `.manage()` + `State<'_, T>`.
4. Never construct tool commands by string concatenation — use structured
   arguments and validate everything derived from user input.
5. Run `cargo clippy --deny warnings` and `cargo fmt` before pushing.
6. Keep `unsafe` out of this codebase; native tool interaction goes through the
   process manager.

## MRI Domain Conventions

1. **Spatial correctness first** — always account for voxel spacing, affine,
   orientation, origin, coordinate systems, slice order, resampling, and
   registration. Tests must include rotated and differently oriented datasets.
2. **Preserve original metadata** — normalization adds canonical concepts but
   never discards source tags.
3. **Confidence over authority** — inferred classifications expose confidence
   and are visually distinguished from authoritative metadata.
4. **Provenance on every artifact** — any derived image, map, measurement, or
   report records inputs, operations, software, environment, and outputs.
5. **Machine-readable QC** — quality results are structured data, not prose.
6. **Privacy by default** — local processing, no patient data in logs, no
   automatic uploads to external services.

## Testing Conventions

### Unit tests (Jest)

1. Test behaviour, not implementation.
2. Use Arrange-Act-Assert.
3. Keep tests isolated — each test manages its own state.
4. Cover boundary conditions and error cases alongside happy paths.
5. Numerical routines have reference tests with explicitly defined tolerances.

### E2E tests (Playwright)

1. Use `locator`/`getByRole`/`getByText` over raw CSS/XPath.
2. Mock network via `page.route(...)` so tests don't need external services.
3. Assert on user-visible state (`toBeVisible`, `toHaveText`).
4. Cover every page-level flow (`pnpm test:e2e`).

### Imaging tests

1. Test against representative MRI datasets, including rotated and differently
   oriented volumes.
2. Verify DICOM metadata preservation after import/export round-trips.

## Before You Push

1. `pnpm lint --filter=@hieudoanm.github.io/mri`
2. `pnpm format --filter=@hieudoanm.github.io/mri`
3. `pnpm test --filter=@hieudoanm.github.io/mri`
4. `pnpm test:e2e --filter=@hieudoanm.github.io/mri`
5. `pnpm build --filter=@hieudoanm.github.io/mri`
