# Apps / Editors / Resume

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
Resume/
  index.tsx            # Entry component — YAML editor + live PDF preview
  useCodeMirror.ts     # CodeMirror editor hook for the YAML pane
  constants.ts         # YAML_TEMPLATE seed + ParseResult union
```

## Overview

Resume builder written in YAML and rendered as a live PDF via pdfmake inside an
iframe, with a 500ms debounce and an Export PDF button. Invalid YAML shows the
parse error and blocks the preview/download.

## Logic

- `YAML_TEMPLATE` seeds the editor; `debouncedYaml` (via `useDebounce`) feeds
  `yaml2pdfMake` from `src/services/yaml2pdfmake`.
- `parseResult` is a `ParseResult` — `{ ok: true, doc }` or
  `{ ok: false, error }` — memoized on the debounced YAML.
- When valid, `pdfMake.createPdf(...).getBlob()` becomes an object URL shown in
  the iframe; a `cancelled` flag prevents stale renders after unmount.
- `Export PDF` calls `pdfMake.createPdf(...).download('resume.pdf')` and is
  disabled while the document is invalid.

## Routes

```tsx
// src/app/(products)/apps/editors/page.tsx          — category listing
// src/app/(products)/apps/editors/resume/page.tsx   — tool
```

## Registration

- `data/apps.csv` → `Editors` section, `toolId: 'resume'`

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
