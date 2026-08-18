# Economics

Game theory playground — iterated Prisoner's Dilemma against AI strategies.

## Commands

| Command              | Description                               |
| -------------------- | ----------------------------------------- |
| `pnpm run dev`       | Start the development server              |
| `pnpm run build`     | Production build with type checking       |
| `pnpm run lint`      | ESLint and Prettier checks                |
| `pnpm run test`      | Unit tests with coverage (80% thresholds) |
| `pnpm run test:e2e`  | Playwright end-to-end tests               |
| `pnpm run tauri dev` | Run the Tauri desktop shell               |

## Key Conventions

- Features are self-contained under `src/components/features/prisoners-dilemma/`
  — colocate hooks, constants, helpers and tests.
- Pages are thin: they compose templates (`HomeTemplate`) and feature
  components.
- Path alias `@/*` maps to `./src/*`.
- DaisyUI themes are `economics` (light) and `economics-dark`; the theme init
  script in `layout.tsx` reads `localStorage['economics:theme']`.
- Shared infrastructure mirrors `education/lingo`: providers (`SWProvider`,
  `NativeProvider`, `QueryProvider`), atoms (`Badge`, `OfflineBadge`,
  `ThemeToggle`), hooks and libs live in the same locations.
- The Tauri shell registers dialog, notification and updater plugins; native
  bridges go through `src/lib/native/index.ts`.

## Documentation

| Document        | Description                                  |
| --------------- | -------------------------------------------- |
| [docs](./docs/) | Architecture notes and feature documentation |
