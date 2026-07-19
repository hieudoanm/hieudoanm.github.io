# Apps / Visualization / CalendarTracker

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
CalendarTracker/
  index.tsx            # Entry component — view switcher + year navigation
  constants.ts         # isLeapYear, day/month tables, years range, View enum
  components/
    Dot.tsx            # Single-day dot (past/today/future styling)
    Weekday.tsx        # S M T W T F S header row
    DailyView.tsx      # Full-year day grid in 4-week rows
    WeeklyView.tsx     # Month-by-month week grid with padding
    MonthlyView.tsx    # 12-month dot grid
    QuarterlyView.tsx  # Quarterly + Half grids
```

## Overview

GitHub-style activity tracker showing each day of a year as a dot colored by
past/today/future. Switch between daily, weekly, monthly, quarterly, and
half-year views and navigate any year from 1970–2100.

## Logic

- `Dot` classifies each date against today via `getTime()`: filled (past),
  pulsing (today), outlined (future), or a blank padding dot (`index === 0`)
- `isLeapYear`/`daysOfMonths` drive day counts; `WeeklyView` pads each month to
  full weeks and normalizes to 4–6 rows, trimming overflow rows when the month
  starts on Saturday or ends on Sunday
- `DailyView` lays out the full year in 4-week rows (3 rows on mobile, 4 on
  desktop); `MonthlyView`/`QuarterlyView`/`HalfView` aggregate by period
- The `View` enum powers the dropdown; the Weekday toggle only shows for
  daily/weekly views

## Routes

```tsx
// src/app/(products)/apps/visualization/page.tsx          — category listing
// src/app/(products)/apps/visualization/calendar-tracker/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Visualization` section, `toolId: 'calendar-tracker'`

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
