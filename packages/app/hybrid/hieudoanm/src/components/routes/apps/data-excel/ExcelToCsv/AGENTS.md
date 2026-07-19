# Apps / Data - Excel / ExcelToCsv

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
ExcelToCsv/
  index.tsx            # Entry component — Dropzone + spinner, converts and downloads
  utils.ts             # toCSV, readFile, downloadBlob (pure helpers)
```

## Overview

Converts an `.xlsx`/`.xls` file to CSV. The user drops a file into the
`Dropzone`; the first worksheet is read into an array of rows and serialized to
CSV, then downloaded with the original extension replaced by `.csv`.

## Logic

- `handleConvert(file)` lazily imports `xlsx`, reads the file as an
  `ArrayBuffer` via `readFile`, and reads the first sheet with
  `sheet_to_json(..., { header: 1 })`.
- `toCSV` quotes any field containing a comma, double-quote, or newline
  (doubling embedded quotes), joining rows with `\n`.
- Only the first sheet is converted; failures surface as
  `'Failed to convert Excel to CSV.'` through the `error` state.

## Routes

```tsx
// src/app/(products)/apps/data-excel/page.tsx       — category listing
// src/app/(products)/apps/data-excel/excel-to-csv/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Data - Excel` section, `toolId: 'excel-to-csv'`

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
