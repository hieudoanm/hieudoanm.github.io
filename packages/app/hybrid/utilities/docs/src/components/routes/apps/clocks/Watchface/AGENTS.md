# Apps / Clocks / Watchface

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
Watchface/
  index.tsx            # Entry component — Dot/Minimal faces + switcher
```

## Overview

Garmin-style watch face previews in two styles: Dot renders rotating dots as
hour, minute and second hands inside a circular face, and Minimal shows a large
monospaced `HH:MM:SS` readout. A DOT / MINIMAL button row switches between them.

## Logic

- `useClock` initializes `{ hours, minutes, seconds }` immediately (to avoid a
  layout flash) and re-updates it every 1000 ms via `setInterval`.
- `addZero` left-pads single-digit numbers for the Minimal face.
- Dot face angles: `hourAngle = (hours % 12) * 30 + minutes * 0.5`,
  `minuteAngle = minutes * 6 + seconds * 0.1`, `secondAngle = seconds * 6`; each
  hand is a dot rotated with a 1000 ms linear transition.
- `face` state toggles between `'dot' | 'minimal'`; `onClose` is accepted by the
  entry component as required but not rendered as a control.

## Routes

```tsx
// src/app/(products)/apps/clocks/page.tsx            — category listing
// src/app/(products)/apps/clocks/watchface/page.tsx  — tool
```

## Registration

- `data/apps.csv` → `Clocks` section, `toolId: 'watchface'`

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
