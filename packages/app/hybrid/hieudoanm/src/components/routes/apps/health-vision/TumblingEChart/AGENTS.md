# Apps / Health - Vision / TumblingEChart

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
TumblingEChart/
  index.tsx            # Entry — fullscreen modal chart + direction quiz
  constants.ts         # TUMBLING_E_LINES, DIRECTIONS, labels, ROTATION
  types.ts             # Direction union type
  utils/chart.ts       # randomDirections + generateChart
```

## Overview

Fullscreen Tumbling E visual acuity chart rendered as a modal. Ten lines from
20/200 to 20/10 show a random number of E optotypes, each rotated to point
right, down, left, or up. For single-E lines the user picks a direction and is
graded correct/incorrect.

## Logic

- `generateChart` maps `TUMBLING_E_LINES` to lines with random `directions` via
  `randomDirections` (each picked uniformly from the `DIRECTIONS` array)
- `ROTATION` maps each `Direction` to a Tailwind rotate class applied to the E
- On `count === 1` lines, the arrow keys answer the direction (stored in the
  `answers` record); `correct` compares the answer to `directions[0]`, and the
  left panel shows a running correct/total score
- Arrow keys navigate lines only while the answer is hidden; Reset clears all
  answers

## Routes

```tsx
// src/app/(products)/apps/health-vision/page.tsx         — category listing
// src/app/(products)/apps/health-vision/tumbling-e/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Health - Vision` section, `toolId: 'tumbling-e'`

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
