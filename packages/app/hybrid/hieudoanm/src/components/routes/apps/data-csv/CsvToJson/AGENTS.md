# Apps / Data - CSV / CsvToJson

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
CsvToJson/
  index.tsx            # Entry component — textarea + preview + Download
  utils.ts             # csvToJson, downloadBlob (pure helpers)
```

## Overview

Converts CSV text into an array of JSON objects. The user pastes CSV (or drops a
file into the `Dropzone` to populate the textarea), clicks _Convert to JSON_,
and sees pretty-printed JSON in a preview pane with a Download button.

## Logic

- `csvToJson` trims and splits on `\n`; returns `'[]'` when fewer than 2 lines.
  The first line provides headers (trimmed); each data line maps to an object
  keyed by header, with missing cells defaulting to `''`. Result is
  `JSON.stringify(obj, null, 2)`.
- Does not honour quoted fields — cells containing commas split naively.
- `handleConvert` catches parse/stringify failures and sets output to
  `'Error: invalid CSV'`; the convert button is disabled until input is
  non-empty.

## Routes

```tsx
// src/app/(products)/apps/data-csv/page.tsx       — category listing
// src/app/(products)/apps/data-csv/csv-to-json/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Data - CSV` section, `toolId: 'csv-to-json'`

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
