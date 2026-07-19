# Football Squad Manager — Contributing

## Setup

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## Development Commands

| Command          | Description                               |
| ---------------- | ----------------------------------------- |
| `pnpm dev`       | Start the dev server                      |
| `pnpm build`     | Production build                          |
| `pnpm lint`      | ESLint (with auto-fix)                    |
| `pnpm typecheck` | TypeScript type checking (`tsc --noEmit`) |
| `pnpm format`    | Prettier (`--write`)                      |
| `pnpm test`      | Jest unit tests with coverage             |
| `pnpm test:e2e`  | Playwright e2e tests                      |

## Coding Conventions

- Arrow functions for functions and component exports; `FC` for components
- `@/*` path aliases (e.g. `@/lib/squad`)
- `interface` for object shapes; `const` over `let`
- Explicit return types on exported functions
- Pure functions in `lib/` — no React, no globals, no side effects; tests
  exercise them directly
- DaisyUI component classes (`btn`, `input`, `select`, `badge`)
- Dark theme by default (`data-theme="dim"`)
- `prettier-plugin-tailwindcss` for class sorting
- Small focused files (≤ 200 lines) and short functions (≤ 30 lines)
- No comments unless they explain _why_, never _what_

## Testing Conventions

- Break tests into small per-file suites: one `*.test.ts` / `*.test.tsx` per
  unit (component, page, hook, util, provider), colocated in a `__tests__/`
  directory — never merge multiple units into one file.
- App pages are tested under `src/app/__tests__/` (e.g. `page.test.tsx`); pages
  in route groups colocate `__tests__/page.test.tsx` in the same folder.
- Test behaviour, not implementation — drive components through labels, roles,
  and visible text
- Arrange-Act-Assert in each test
- Isolated tests: clear `localStorage` in `beforeEach`
- Cover boundary conditions (empty rosters, invalid submissions, corrupt
  storage)
- Global coverage threshold is 90%

## Pull Requests

- Run `pnpm lint`, `pnpm typecheck`, `pnpm format` (write), and `pnpm test`
  before opening a PR
- Keep changes small and focused
- Update `docs/ROADMAP.md` when features land
