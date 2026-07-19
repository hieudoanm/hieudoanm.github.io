# Apps / Data - CSV / CsvToExcel

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
CsvToExcel/
  index.tsx            # Entry component — Dropzone + spinner, converts and downloads
  utils.ts             # parseCSV, readFileAsText, downloadBlob (pure helpers)
```

## Overview

Converts a `.csv` file to `.xlsx`. The user drops a file into the `Dropzone`,
the parser turns the text into an array of rows, and the `xlsx` library
(lazy-loaded on demand) writes a workbook that is downloaded with the `.csv`
extension replaced by `.xlsx`.

## Logic

- `handleConvert(file)` reads the file as text, runs `parseCSV`, builds a sheet
  via `XLSX.utils.aoa_to_sheet`, then downloads the serialized array buffer.
- `parseCSV` is a quote-aware parser: fields wrapped in `"` are kept verbatim,
  `""` inside quotes unescapes to `"`, and both `\n` and `\r\n` terminate rows.
  Blank rows (all empty fields) are skipped.
- `readFileAsText` wraps `FileReader` in a promise; failures surface as
  `'Failed to convert CSV to Excel.'` through the `error` state.

## Routes

```tsx
// src/app/(products)/apps/data-csv/page.tsx       — category listing
// src/app/(products)/apps/data-csv/csv-to-excel/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Data - CSV` section, `toolId: 'csv-to-excel'`

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
