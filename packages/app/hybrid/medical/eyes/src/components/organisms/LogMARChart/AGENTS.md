# Eyes / LogMARChart

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
LogMARChart/
  index.tsx            # Entry — fullscreen chart + per-line scoring
  constants.ts         # LOGMAR_LINES (14 acuity steps) + LETTERS pool
  utils/chart.ts       # randomLetters + generateChart
```

## Overview

Fullscreen LogMAR visual acuity chart. Fourteen lines from LogMAR 1.0 down to
−0.3 (20/200 to 20/10) show five randomised letters each; lines are dimmed until
the answer is revealed, and each line is scored 0–5.

## Logic

- `generateChart` maps `LOGMAR_LINES` to lines with 5 random letters from the
  `CDEFHKNPRSVZ` pool; `randomLetters` shuffles the pool and slices `count`
- `goTo` clamps navigation to chart bounds and hides the revealed answer; arrow
  keys navigate via a window `keydown` listener
- The running total is `Σ (line.score - (correct * 0.02 - 0.1))` over scored
  lines, displayed next to a dot navigator; `scores` keyed by line index, reset
  via the Reset button

## Routes

```tsx
// src/app/(app)/logmar/page.tsx — fullscreen chart
```

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. State management: `useState`/`useReducer` for local, React Context for shared
4. TailwindCSS v4 + DaisyUI v5 — no CSS modules, no styled-components
5. Icons: `react-icons/pi` (Phosphor)
6. Keep files under 200 lines, functions under 30 lines
7. Pure logic in `utils.ts` — never mix UI and business logic
8. Test behaviour, not implementation — Jest + Testing Library
9. `APP_SECTIONS` consumes `data/apps.json` — never hardcode app sections in
   components
