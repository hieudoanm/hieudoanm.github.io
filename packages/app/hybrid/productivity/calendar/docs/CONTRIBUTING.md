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
- Co-locate test files with source: `Component.tsx` → `Component.test.tsx`

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
