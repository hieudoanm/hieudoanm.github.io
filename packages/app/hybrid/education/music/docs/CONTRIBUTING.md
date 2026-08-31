# Contributing

## Setup

pnpm install # repo root pnpm dev --filter=@hieudoanm.github.io/music # dev
server on :3000

## Commands

| Command                               | Purpose                                   |
| ------------------------------------- | ----------------------------------------- |
| `pnpm dev`                            | Next.js dev server (Turbopack)            |
| `pnpm build`                          | Static export to `out/`                   |
| `pnpm test`                           | Jest unit tests (80% coverage thresholds) |
| `pnpm lint`                           | ESLint with auto-fix                      |
| `pnpm format`                         | Prettier                                  |
| `pnpm tauri dev` / `pnpm tauri build` | Desktop shell                             |

## Coding Conventions

- Arrow functions, `FC` type for components, `@/*` aliases
- DaisyUI component classes over bespoke CSS; theme tokens (`primary`,
  `secondary`, ...) from `themes.css`, no hardcoded colors
- Features are self-contained folders: pure logic in `utils.ts` (no React), UI
  in `index.tsx`. Pages never import feature internals besides the default
  export.
- Explicit types at boundaries; prefer interfaces for object shapes
- No comments unless explaining a non-obvious invariant

## Testing Conventions

- Break tests into small per-file suites: one `*.test.ts` / `*.test.tsx` per
  unit (component, page, hook, util, provider), colocated in a `__tests__/`
  directory — never merge multiple units into one file.
- App pages are tested under `src/app/__tests__/` with a `*.test.tsx` matching
  each page (`page.test.tsx`, `error.test.tsx`, `not-found.test.tsx`); pages in
  route groups (`(app)`, `(info)`) colocate `__tests__/page.test.tsx` in the
  same folder.
- Jest treats every file inside `__tests__/` as a suite: keep shared fixtures in
  `<feature>/testing/`, not in `__tests__/`.
- Name tests as behaviour specs; pure utils get exhaustive edge-case tests;
  component tests assert user-visible output via Testing Library queries.
- Keep global coverage >= 80% — enforced by `jest.config.ts`

## Docs

Update `docs/FEATURES.md` when shipping features.
