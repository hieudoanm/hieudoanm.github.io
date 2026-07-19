# Contributing

Thanks for helping with Free Resume Builder. This app is **fully offline**, so
every contribution must respect the offline-first, keep-it-simple constraints
from `AGENTS.md`. This page is the checklist for how code and tests are written.

## Code conventions

Follow the repository-root and package `AGENTS.md` rules. The ones that matter
most here:

### TypeScript & React

- **TypeScript strict.** No `any`, no untyped escape hatches.
- Prefer `interface` for object shapes, `type` for unions/intersections.
- Arrow functions with `const`; never `function` declarations for components or
  helpers.
- Explicit parameter and return types on every exported function.
- `FC` for components, `type FC` imports (`import type { FC } from 'react'`).
- Client components start with `'use client';`.
- Hooks only at the top level; extract custom hooks (`src/hooks/`) when an
  effect has a clear single responsibility (see `usePreviewScale`,
  `useOverflowDetect`).

### Sizing rules

- **Functions ≤ 30 lines**, **files ≤ 200 lines**. If a file grows past that,
  split it by responsibility.
- Hand-rolled helpers are preferred over new libraries when the logic stays
  under ~30 lines. No new npm dependencies without a strong reason (check the
  workspace lockfile first).

### Structure & style

- Flat directory trees; group related components in a
  `components/resume/<area>/` folder (`preview/`, `editor/`, `data/`,
  `template/`, `templates/`).
- Import order: third-party first, then `@`-aliased/internal, then relative.
- No comments unless asked. Names should be self-documenting.
- Explicit error handling: return/surface errors, never silently swallow them.
- Templates render with **inline styles only** — no Tailwind inside
  `templates/*.tsx` (they must print and export standalone HTML correctly).
- Do not touch network APIs (`fetch`, remote images/fonts) anywhere — offline is
  a hard constraint.

### Accessibility

- Every interactive control needs a distinct accessible name. If several buttons
  show the same text (e.g. `JSON` under Export _and_ Copy), add an `aria-label`
  (`"Export JSON"`, `"Copy JSON"`) — this also prevents ambiguous test queries.

## Testing conventions

### Unit tests (Jest + Testing Library)

- Break tests into small per-file suites — one `*.test.ts` / `*.test.tsx` per
  unit (component, page, hook, util, provider), colocated in a `__tests__/`
  directory; never merge multiple units into one file. App pages are tested
  under `src/app/__tests__/` and route-group pages (`(app)`, `(info)`) colocate
  `__tests__/page.test.tsx` in the same folder.
- Name tests as specifications: `it('exports the resume as JSON', ...)`.
- Use Arrange–Act–Assert; keep each test isolated (own fixtures, no shared
  mutable state). Prefer `it.each` for data-driven cases.
- Render the component under test directly with realistic fixtures
  (`seedResumeData` from `src/data/seed.ts`).
- Query by behavior, not implementation:
  - `getByRole` / `getByLabel` / `getByText` for interactive + visible text.
  - Scope ambiguous queries (multiple buttons with the same visible text) with
    an anchored name regex (`/^export json$/i`) or `within()`.
  - Use `getAllBy*` when a value legitimately appears several times (e.g. the
    name rendered in every template thumbnail).
- Cover the happy path, empty states, and error paths — the 90% global coverage
  gate is enforced on the full suite.
- Fast iteration:

```sh
pnpm exec jest src/components/resume --coverage=false
```

### E2E tests (Playwright)

- Specs live in `e2e/`; they boot the dev server via `webServer` config.
- Use `getByRole` / `getByLabel` locators. Anchor template-name assertions
  (`/^Classic/`) so they never match a substring of another template's
  description.
- Prefer visible-behavior assertions (`toHaveText`, `toBeVisible`).

### Quality gates

Before submitting, all must pass:

```sh
pnpm exec tsc --noEmit
pnpm lint         # eslint . --fix
pnpm format       # prettier --cache --write .
pnpm test         # jest, incl. 90% coverage gate
pnpm test:e2e     # playwright
pnpm build        # static export must succeed
```

## Common changes

- **Add a template** → copy an existing `*Template.tsx`, restyle with inline
  styles/primitives, register in `templates/index.ts`, update the count
  assertions in tests and e2e specs. See `docs/templates.md`.
- **Add a form field** → extend the type in `types/resume.ts`, the matching
  editor form, the template section, and the JSON Schema
  (`public/resume.schema.json`).
- **Change import/export** → `utils/io.ts` owns serialization, parsing, and
  validation; `DataPanel` is the only UI entry point. Keep the two in sync.
