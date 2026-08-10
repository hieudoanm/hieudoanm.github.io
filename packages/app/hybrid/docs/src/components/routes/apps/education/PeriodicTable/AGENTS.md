# Apps / Education / PeriodicTable

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
PeriodicTable/
  index.tsx            # Entry component — table grid + category filter
```

## Overview

Interactive periodic table rendered from
`@hieudoanm.github.io/data/ periodic-table`. Elements are color-coded by
`specificName` category and can be filtered; the layout adapts from an 18-column
grid on desktop to a 3-column card grid on mobile.

## Logic

- `elements` is `Object.entries(periodicTable)`; `PeriodicGridView` positions
  each element via CSS grid — f-block elements (`group === 0`) are placed on
  rows 8/9 using offsets from `element.number`, others use `period`/`group`.
- `Block` greys out (`opacity-20`, `bg-gray-100/10`) any element whose
  `specificName` differs from `selectedType`; the active filter button gets a
  `ring-2`.
- Clicking an active filter toggles `selectedType` back to `null`; `onClose` is
  accepted as a prop but the component itself has no close UI.

## Routes

```tsx
// src/app/(products)/apps/education/page.tsx        — category listing
// src/app/(products)/apps/education/periodic-table/page.tsx — tool
```

## Registration

- `data/apps.csv` → `Education` section, `toolId: 'periodic-table'`

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
