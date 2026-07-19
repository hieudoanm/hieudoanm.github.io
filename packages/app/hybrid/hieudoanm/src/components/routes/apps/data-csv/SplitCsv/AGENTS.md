# Apps / Data - CSV / SplitCsv

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
SplitCsv/
  index.tsx            # Entry component — rows-per-file input + Dropzone
  utils.ts             # parseCSV, toCSV, readFileAsText, downloadBlob
```

## Overview

Splits a large `.csv` file into multiple parts of a configurable row count. The
user sets _Rows per file_ (default 100, min 1), drops a file, and each chunk is
downloaded immediately as `{name}_part{N}.csv`.

## Logic

- `handleSplit(file)` parses the file with `parseCSV`, requires at least 2 rows,
  keeps the first row as the header, then chunks the data rows by `rowsPerFile`.
- Each chunk is re-serialized with `toCSV`, which quotes any field containing a
  comma, double-quote, or newline (`"` is doubled). The resulting file count is
  shown via the `fileCount` state; an empty/header-only file aborts silently.
- `parseCSV` is quote-aware (handles `""` escapes and `\r\n`); `readFileAsText`
  wraps `FileReader` in a promise; failures surface as
  `'Failed to split CSV file.'`.

## Routes

```tsx
// src/app/(products)/apps/data-csv/page.tsx       — category listing
// src/app/(products)/apps/data-csv/split-csv/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Data - CSV` section, `toolId: 'split-csv'`

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
