# Eyes / SnellenChart

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
SnellenChart/
  index.tsx            # Entry — fullscreen modal chart + navigation
  utils.ts             # SNELLEN_LINES, LETTERS, randomLetters, generateChart
```

## Overview

Fullscreen Snellen visual acuity chart rendered as a modal. Ten lines from
20/200 down to 20/10 show a randomised letter count per line (1 up to 10);
letters stay dimmed until the user reveals the answer.

## Logic

- `generateChart` maps `SNELLEN_LINES` to lines with `line.count` random letters
  drawn from the `CDEFHKLNOPRSTUV` pool via `randomLetters`
- `goTo` clamps the current index to chart bounds and hides the revealed answer;
  arrow keys navigate through the window `keydown` handler
- A right-side dot navigator and Prev/Next buttons move between lines; `isFirst`
  / `isLast` disable navigation at the ends

## Routes

```tsx
// src/app/snellen/page.tsx — fullscreen chart modal
```

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
