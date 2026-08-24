# Contributing

## Setup

```bash
pnpm install                      # repo root
pnpm dev --filter=@hieudoanm.github.io/lingo   # dev server on :3000
```

## Commands

| Command                               | Purpose                                   |
| ------------------------------------- | ----------------------------------------- |
| `pnpm dev`                            | Next.js dev server (Turbopack)            |
| `pnpm build`                          | Static export to `out/`                   |
| `pnpm test`                           | Jest unit tests (80% coverage thresholds) |
| `pnpm test:e2e`                       | Playwright e2e tests                      |
| `pnpm lint`                           | ESLint with auto-fix                      |
| `pnpm format`                         | Prettier                                  |
| `pnpm tauri dev` / `pnpm tauri build` | Desktop shell                             |

## Coding Conventions

- Arrow functions, `FC` type for components, `@/*` aliases
- DaisyUI component classes over bespoke CSS; theme tokens (`primary`,
  `secondary`, …) from `themes.css`, no hardcoded colors
- Atomic design: `atoms/` → `features/` → `templates/`
- Features are self-contained folders: pure logic in `utils.ts` (no React), UI
  in `index.tsx`. Pages never import feature internals besides the default
  export.
- Explicit types at boundaries; prefer interfaces for object shapes
- No comments unless explaining a non-obvious invariant

## Testing Conventions

- Unit tests colocated in `__tests__/`; name tests as behaviour specs
- Pure utils get exhaustive edge-case tests; component tests assert user-
  visible output via Testing Library queries
- IndexedDB is available in Jest through `fake-indexeddb` (auto-loaded in
  `jest.setup.ts`)
- Keep global coverage ≥ 80% — enforced by `jest.config.ts`

## Docs

Update `docs/FEATURES.md` when shipping features and regenerate
`docs/DOWNLOADS.md` after touching packaging config:

```bash
python3 packages/app/hybrid/scripts/generate-downloads-md.py
```
