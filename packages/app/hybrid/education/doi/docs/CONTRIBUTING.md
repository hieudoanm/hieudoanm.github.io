# Contributing

## Setup

```sh
pnpm install    # repo root
pnpm dev        # Next.js dev server on :3000
```

## Commands

| Command            | Purpose                                   |
| ------------------ | ----------------------------------------- |
| `pnpm dev`         | Next.js dev server (Turbopack)            |
| `pnpm build`       | Static export to `out/`                   |
| `pnpm test`        | Jest unit tests (80% coverage thresholds) |
| `pnpm lint`        | ESLint with auto-fix                      |
| `pnpm format`      | Prettier                                  |
| `pnpm tauri dev`   | Tauri desktop shell (dev)                 |
| `pnpm tauri build` | Tauri platform bundles                    |

## Coding Conventions

- Arrow functions, `FC` type for components, `@/*` aliases (`@/` → `./src/`).
- DaisyUI component classes over bespoke CSS; theme tokens from `themes.css`, no
  hardcoded colors.
- Keep pure logic (SQL queries, d3-force layout helpers) free of React;
  components stay thin.
- Explicit types at boundaries; prefer interfaces for object shapes.
- No comments unless explaining a non-obvious invariant.

## Testing Conventions

- Break tests into small per-file suites: one `*.test.ts` / `*.test.tsx` per
  unit (component, page, hook, util), colocated in a `__tests__/` directory —
  never merge multiple units into one file.
- App pages are tested under `src/app/__tests__/` with a `*.test.tsx` matching
  each page (`page.test.tsx`, `error.test.tsx`, `not-found.test.tsx`).
- Name tests as behaviour specs; query/logic functions get exhaustive edge-case
  tests (empty db, no search matches, stub works).
- Component tests assert user-visible output via Testing Library queries.
- Keep global coverage >= 80% — enforced by `jest.config.ts`.

## Docs

Update `docs/FEATURES.md` when shipping features.
