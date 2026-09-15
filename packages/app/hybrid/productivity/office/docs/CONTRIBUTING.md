# Contributing

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/)
- [Tauri CLI](https://tauri.app/) (for desktop builds)

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Run e2e tests
pnpm test:e2e
```

## Project Structure

Follow the directory structure in [ARCHITECTURE.md](./ARCHITECTURE.md).

## Code Style

- **TypeScript** — strict mode enabled
- **Prettier** — run `pnpm format` before committing
- **ESLint** — run `pnpm lint` and fix all errors
- **Conventional commits** — `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`
- **No `any`** — use `unknown` and type-narrow instead
- **No comments** — code should be self-documenting

## Component Guidelines

- Use Tailwind CSS for styling (no inline styles)
- Use DaisyUI component classes (`btn`, `card`, `select`, `badge`)
- Mark client components with `"use client"` only when needed (state, events)
- Break tests into small per-file suites colocated in `__tests__/`:
  `Component.tsx` → `__tests__/Component.test.tsx`; one `*.test.ts(x)` per unit
  (component, page, hook, util, provider) — never merge multiple units into one
  file. App pages are tested under `src/app/__tests__/`; route-group pages
  colocate `__tests__/page.test.tsx` in the same folder.

## Calendar Data

Calendar events are stored in `src/data/calendar/events.ts`. Each event has:

```typescript
{
  date: string;           // YYYY-MM-DD format
  description: string;    // Event description
  category: "holiday" | "cultural" | "seasonal" | "international";
}
```

## Running Tests

```bash
# Unit tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:coverage

# E2E tests (requires dev server running)
pnpm dev &
pnpm test:e2e
```

## Pull Requests

1. Create a feature branch from `main`
2. Make your changes with tests
3. Run `pnpm lint` and `pnpm test` — all must pass
4. Update docs if adding features
5. Open a PR with a clear title and description
