# Apps / Editors / WordCounter

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
WordCounter/
  index.tsx            # Entry component — textarea + stats grid + text actions
  utils.ts             # computeStats() pure text statistics
```

## Overview

Counts characters, words, lines, sentences, and paragraphs of live text with an
estimated reading time, plus Lowercase, Uppercase, Trim Spaces, and Copy
actions.

## Logic

- `computeStats(text)` returns a `Stats` object: `chars` (raw length),
  `charsNoSpace` (whitespace removed), `words` (`trim().split(/\s+/)`), `lines`,
  `sentences` (split on `[.!?]+`), `paragraphs` (split on blank lines), and
  `readingTime` at 200 wpm — `<1 min` when under a minute.
- The UI memoizes `computeStats` on the text and applies the three text
  transforms directly to state; `Copy` writes the text to the clipboard.

## Routes

```tsx
// src/app/(products)/apps/editors/page.tsx          — category listing
// src/app/(products)/apps/editors/word-counter/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Editors` section, `toolId: 'word-counter'`

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
