# Contributing

## Setup

pnpm install # repo root pnpm dev --filter=@hieudoanm.github.io/economics # dev
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
- Features are self-contained folders: pure logic in `utils/game.ts` (no React),
  types in `types.ts`, constants in `constants.ts`, UI in `index.tsx`.
- Explicit types at boundaries; prefer interfaces for object shapes
- No comments unless explaining a non-obvious invariant
- Game logic MUST be pure functions — zero UI imports
- Exhaustive `never` check in reducer switch/case

## Testing Conventions

- Unit tests colocated in `__tests__/`; name tests as behaviour specs
- Pure utils get exhaustive edge-case tests
- Component tests assert user-visible output via Testing Library queries
- Keep global coverage >= 80% — enforced by `jest.config.ts`

## Docs

Update `docs/FEATURES.md` when shipping features.
