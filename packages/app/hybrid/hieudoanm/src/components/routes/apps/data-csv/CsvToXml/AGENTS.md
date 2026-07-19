# Apps / Data - CSV / CsvToXml

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
CsvToXml/
  index.tsx            # Entry component — textarea + preview + Download
  utils.ts             # csvToXml, downloadBlob (pure helpers)
```

## Overview

Converts CSV text into XML. The user pastes CSV (or drops a file into the
`Dropzone`), clicks _Convert to XML_, and sees the XML output in a preview pane
with a Download button.

## Logic

- `csvToXml` trims and splits on `\n`; returns `<root></root>` when fewer than 2
  lines. The first line provides headers; each data row becomes an `<item>` with
  one element per header.
- Tag names are sanitized (`[^a-zA-Z0-9_-]` → `_`); values are XML-escaped for
  `&`, `<`, `>`. Output starts with an XML declaration and wraps everything in
  `<root>`.
- Does not honour quoted fields — cells containing commas split naively.
- `handleConvert` catches failures and sets output to `'Error: invalid CSV'`.

## Routes

```tsx
// src/app/(products)/apps/data-csv/page.tsx       — category listing
// src/app/(products)/apps/data-csv/csv-to-xml/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Data - CSV` section, `toolId: 'csv-to-xml'`

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
