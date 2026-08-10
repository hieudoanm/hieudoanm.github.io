# Apps / Education / DOI

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
DOI/
  index.tsx            # Entry component — DOI lookup form + reference list
  ReferenceCard.tsx    # APA-style reference card with delete
  ReferenceTable.tsx   # Tabular reference view with delete
```

## Overview

Fetches bibliographic metadata for a DOI via the shared `@api/ts` client and
renders the accumulated references as APA-style cards or a table view.
References can be deleted individually.

## Logic

- `onSubmit` runs `getId(doi)` from `@api/ts`; an invalid DOI sets the error
  state, otherwise `tryCatch(getWork(id))` fetches the `Reference`.
- Duplicates are skipped by `reference.id`; new refs are inserted sorted by
  first author family name (`localeCompare`).
- `ReferenceCard` formats authors as `Family, G.` joined with `, & ` and builds
  a `volume(issue), pages` citation; `ReferenceTable` renders the same fields in
  a table. `deleteRef` removes by index; `loading` drives the Fetch spinner.

## Routes

```tsx
// src/app/(products)/apps/education/page.tsx        — category listing
// src/app/(products)/apps/education/doi/page.tsx     — tool
```

## Registration

- `data/apps.csv` → `Education` section, `toolId: 'doi'`

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. State management: `useState`/`useReducer` for local, React Context for shared
4. TailwindCSS v4 + DaisyUI v5 — no CSS modules, no styled-components
5. Icons: `react-icons/pi` (Phosphor)
6. Each tool component receives `onClose: () => void` prop
7. Keep files under 200 lines, functions under 30 lines
8. Pure logic in `utils.ts` — never mix UI and business logic
9. Test behaviour, not implementation — Jest + Testing Library
10. `APP_SECTIONS` consumes `data/apps.json` — never hardcode app sections in
    components
