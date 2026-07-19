# Apps / Clocks / Countdown

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
Countdown/
  index.tsx            # Entry component — editable countdown + progress bar
  utils.ts             # Pure time-diff/progress helpers (no UI imports)
```

## Overview

Countdown timer to a user-set target date. The title, start and end dates are
editable via an Edit mode; the display shows the remaining time broken into
years, months, days, hours, minutes and seconds, refreshed every second, plus a
progress bar between start and end.

## Logic

- `diffParts` computes a calendar-aware difference: it derives whole months from
  year/month fields and backs off one month if `tempDate > end`, then fills
  days, hours, minutes and seconds from the remaining ms difference.
- `calcProgress` returns 0 before start, 100 after end, and
  `(now − start) / (end − start) × 100` in between.
- `toDateInputValue` slices an ISO string to `YYYY-MM-DD` for the date inputs.
- A 1s interval effect (keyed on `start`/`end`) recomputes `timeLeft`; before
  the start it counts down to start, after the end it counts up from end.
- `handleSave` ignores empty date inputs.

## Routes

```tsx
// src/app/(products)/apps/clocks/page.tsx           — category listing
// src/app/(products)/apps/clocks/countdown/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Clocks` section, `toolId: 'countdown'`

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
