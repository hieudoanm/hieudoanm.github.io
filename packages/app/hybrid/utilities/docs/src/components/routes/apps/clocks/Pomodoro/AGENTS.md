# Apps / Clocks / Pomodoro

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
Pomodoro/
  index.tsx            # Entry component — timer UI, tick loop, beep
  utils.ts             # Preset/phase types + mm:ss formatter
```

## Overview

Pomodoro timer with work/break phases, three presets (25/5, 50/10 as default,
90/20) and a circular SVG progress ring. It tracks the current round, auto-
advances between focus and break phases, plays a WebAudio beep at transitions,
and mirrors the remaining time into the document title while running.

## Logic

- `PRESETS` defines the work/break pairs; `fmt` formats seconds as `mm:ss`.
- The tick effect (keyed on `running`/`preset`) decrements `remaining` every
  second; at 0 it calls `beep()` (an 880 Hz oscillator during work, 440 Hz
  during break), auto-advances the phase, increments `round` when returning to
  work, and stops the timer.
- `applyPreset` resets to the work phase of the chosen preset, `togglePhase`
  skips to the other phase, and `reset` restores the phase's full duration.
- Progress = `1 − remaining / total` drives `strokeDashoffset` on the SVG ring;
  `useEffect` sets `document.title = "<mm:ss> — <phase>"` only while running and
  restores it on cleanup.

## Routes

```tsx
// src/app/(products)/apps/clocks/page.tsx           — category listing
// src/app/(products)/apps/clocks/pomodoro/page.tsx  — tool
```

## Registration

- `data/apps.csv` → `Clocks` section, `toolId: 'pomodoro'`

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
