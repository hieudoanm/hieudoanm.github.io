# Apps / Data - JSON / JsonToCsv

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
JsonToCsv/
  index.tsx            # Entry component — textarea + preview + Download
  utils.ts             # jsonToCsv, downloadBlob (pure helpers)
```

## Overview

Converts a JSON array into CSV. The user pastes JSON (or drops a file into the
`Dropzone` to populate the textarea), clicks _Convert to CSV_, and sees the CSV
output in a preview pane with a Download button.

## Logic

- `jsonToCsv` parses the input and wraps a non-array value into a single-element
  array; an empty array returns `''`. Column keys come from the first object,
  and every row maps each key through `String(item[k] ?? '')`.
- Values are not quoted or escaped — a value containing a comma will break the
  CSV columns.
- `handleConvert` catches parse failures and sets output to
  `'Error: invalid JSON'`; the convert button is disabled until input is
  non-empty.

## Routes

```tsx
// src/app/(products)/apps/data-json/page.tsx       — category listing
// src/app/(products)/apps/data-json/json-to-csv/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Data - JSON` section, `toolId: 'json-to-csv'`

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
