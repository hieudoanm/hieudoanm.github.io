# Apps / Clocks / DaysCount

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
DaysCount/
  index.tsx            # Entry component — from/to date pickers + result
  utils.ts             # daysBetween pure logic (no UI imports)
  __tests__/           # Component + utils tests
```

## Overview

Date-difference tool. Pick a From and To date (each with a Today shortcut) to
get the total number of days between them plus a calendar-aware duration broken
into years, months and days.

## Logic

- `daysBetween` swaps `from`/`to` when reversed so the result is always
  non-negative, computes `totalDays` as the rounded ms difference, then derives
  years/months/days by calendar subtraction, borrowing from the previous month
  via `daysInMonth` when `days < 0`.
- In the component, `result` is `null` until both dates parse, and the duration
  display omits zero `years`/`months` parts (always showing `d`).

## Routes

```tsx
// src/app/(products)/apps/clocks/page.tsx            — category listing
// src/app/(products)/apps/clocks/days-count/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Clocks` section, `toolId: 'days-count'`

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
