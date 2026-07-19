# Apps / Utilities / LoremIpsum

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
LoremIpsum/
  index.tsx            # Entry component — paragraph count, textarea, copy button
  utils.ts             # WORDS + sentence/paragraph/generate generators
```

## Overview

Lorem ipsum generator producing 1–20 paragraphs with live character and word
counts and one-click copy to the clipboard.

## Logic

- `sentence(wordCount)` slices a random contiguous window of `WORDS`,
  capitalizes the first character, and appends a period
- `paragraph(sentences)` joins 8–13 word sentences; `generate(paragraphs)` joins
  paragraphs with blank lines
- The count steppers clamp to 1–20 (`handleCount`), with `x1`/`x3`/`x5` presets;
  text is memoized via `useMemo` on `count`
- `copy` writes the generated text and flashes a "Copied" success state for 1500
  ms

## Routes

```tsx
// src/app/(products)/apps/utilities/page.tsx          — category listing
// src/app/(products)/apps/utilities/lorem-ipsum/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Utilities` section, `toolId: 'lorem-ipsum'`

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
