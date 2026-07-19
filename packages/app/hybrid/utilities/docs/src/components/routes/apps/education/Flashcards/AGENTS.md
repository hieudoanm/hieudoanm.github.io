# Apps / Education / Flashcards

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
Flashcards/
  index.tsx            # Entry component — flip-card deck + keyboard nav
  utils.ts             # FlashCard interface (language, front, back)
```

## Overview

Flashcard deck built from `words.json`, filtered by the selected language and
shuffled on load or language change. Cards flip between the foreign word and its
English back.

## Logic

- `words.json` provides `FlashCard`s (`{ language, front, back }`); the
  `<select>` options derive from the unique `language` values.
- Changing language re-shuffles the deck (`.sort(() => Math.random() - 0.5)`)
  and resets `currentIndex`/`flipped`.
- `nextCard`/`prevCard` wrap modulo the deck length; the keyboard handler maps
  ArrowRight/ArrowLeft to next/prev, Space/Enter to flip, and Escape to
  `onClose`.
- The empty-deck case is guarded with "No flashcards available for ...".

## Routes

```tsx
// src/app/(products)/apps/education/page.tsx        — category listing
// src/app/(products)/apps/education/flashcards/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Education` section, `toolId: 'flashcards'`

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
