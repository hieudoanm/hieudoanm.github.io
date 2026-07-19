# Apps / Education / English

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
English/
  index.tsx            # Entry component — dictionary lookup (react-query)
  utils.ts             # Word interface (word + definition results)
```

## Overview

Dictionary tool that fetches a word's JSON definition from the repo's
`packages/data/english/words` raw GitHub path and groups the results by part of
speech. Synonym/antonym badges are clickable and re-query the new word.

## Logic

- `useQuery` keyed on `['english', word]` fetches `<base>/<word>.json`; empty
  words throw `'Empty Word'`, while failed fetches or JSON parses map to
  `'Fetch Error'` (rendered as "Word not found") and `'JSON Error'`.
- Results are grouped by `partOfSpeech` via `resultsByPartsOfSpeech`; clicking a
  synonym/antonym badge sets it as the next `word`.
- `Word` from `utils.ts` models
  `{ word, results: [{ definition, partOfSpeech, synonyms, anonyms, usageOf, typeOf }] }`.

## Routes

```tsx
// src/app/(products)/apps/education/page.tsx        — category listing
// src/app/(products)/apps/education/english/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Education` section, `toolId: 'english'`

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
