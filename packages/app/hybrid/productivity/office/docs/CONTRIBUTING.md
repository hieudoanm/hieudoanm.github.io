# Contributing

## Prerequisites

- [Node.js](https://nodejs.org/) 26.x (see `.nvmrc`)
- [pnpm](https://pnpm.io/) 11.x
- [Tauri CLI](https://tauri.app/) (for desktop builds)

## Getting Started

The office package is part of a pnpm workspace. From the repo root:

```bash
# Install dependencies
pnpm install

# Start dev server (filtered to this package)
pnpm --filter @hieudoanm.github.io/office dev

# Typecheck
pnpm --filter @hieudoanm.github.io/office typecheck

# Build for production
pnpm --filter @hieudoanm.github.io/office build

# Lint + fix
pnpm --filter @hieudoanm.github.io/office lint

# Unit tests
pnpm --filter @hieudoanm.github.io/office test

# E2E tests
pnpm --filter @hieudoanm.github.io/office test:e2e
```

Run scripts directly from `packages/app/hybrid/productivity/office` without the
filter prefix if you prefer.

## Project Structure

Follow the directory structure in [ARCHITECTURE.md](./ARCHITECTURE.md).
Each feature (calendar, csv, md, tasks) is confined to its own `src/components/<feature>/`,
`src/lib/<feature>/`, and `src/data/<feature>/` folders.

## Code Style

- **TypeScript** — strict mode enabled
- **Prettier** — run `pnpm format` before committing
- **ESLint** — run `pnpm lint` and fix all errors
- **Conventional commits** — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`
- **No `any`** — use `unknown` and type-narrow instead
- **No comments** — code should be self-documenting

## Component Guidelines

- Use arrow functions and the `FC` type for all components
- Use `@/*` path aliases for imports
- Use Tailwind CSS for styling (no inline styles beyond dynamic values such as
  card cover colours)
- Use DaisyUI component classes (`btn`, `card`, `select`, `badge`, `table`)
- Mark client components with `"use client"` only when needed (state, events)
- Break tests into small per-file suites colocated in `__tests__/`:
  `Component.tsx` → `__tests__/Component.test.tsx`; one `*.test.ts(x)` per unit
  (component, page, hook, util, provider) — never merge multiple units into one
  file. App pages are tested under `src/app/__tests__/`; route-group pages
  colocate `__tests__/page.test.tsx` in the same folder. Unit tests live in
  `src/lib/<feature>/__tests__/` and component tests under the component folder.

## Feature Data

- Calendar events live in `src/data/calendar/events.ts`
- Tasks seed data lives in `src/data/tasks/` (`models.ts`, `seed.ts`)
- Markdown seed content lives in `src/data/md/seed.ts`
- The Tasks sub-app persists to IndexedDB under the `office-db` database

## Running Tests

```bash
# Unit tests
pnpm test

# E2E tests (requires dev server running)
pnpm dev &
pnpm test:e2e
```

## Pull Requests

1. Create a feature branch from `main`
2. Make your changes with tests
3. Run `pnpm lint`, `pnpm typecheck`, and `pnpm test` — all must pass
4. Update docs if adding features
5. Open a PR with a clear title and description
