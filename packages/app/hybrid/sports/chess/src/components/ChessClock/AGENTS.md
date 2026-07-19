# Games / Chess / ChessClock

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "ChessClock"   # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
ChessClock/
  index.tsx            # Entry component — two tap-to-switch timers + controls
  types.ts             # ChessClockSide, DelayType, Stage, ClockState, Preset
  constants.ts         # ONE_SECOND, TICK, PRESETS, DEFAULT_PLAYER
  utils/clock.ts       # initClock, toTime, fmt, delayFor, formatElapsed
  components/
    icons.tsx          # Inline play/pause/rotate/undo/gear icons
```

## Gameplay

Two-player chess clock. Tap a side to start and to switch turns; the active
clock counts down in real time and a move counter tracks each side. Presets
cover Classic, Rapid, Blitz, Fischer, Bronstein, Hourglass, 1 Min, and 30 Sec,
plus a custom minutes + increment option. Reset and undo return to preview.

## Logic

- `initClock` — builds a `ClockState` from a preset, initialising both times
- `toTime` — remaining = stored ms minus elapsed wall time; `fmt` renders mm:ss
- `delayFor` — per-delay-type added time (fixed delay, or capped by Bronstein),
  added to the incoming side on switch
- `press` in `index.tsx` — starts from preview, and while running subtracts the
  outgoing side's elapsed time; Bronstein restores the used delay, Fischer adds
  the increment to the incoming side
- The interval ticker (33ms) detects expiry, sets the side to 0, declares the
  winner, and returns to setup stage

## Routes

```tsx
// src/app/(products)/games/chess/page.tsx          — category listing
// src/app/(products)/games/chess/chess-clock/page.tsx — tool
```

## Registration

- `data/games.csv` → `Chess` section, `toolId: 'chess-clock'`

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. Game logic MUST be pure functions in `utils.ts` — zero UI imports
4. State management: Zustand for complex games, `useState`/`useReducer` for
   simple ones
5. TailwindCSS v4 + DaisyUI v5 — no CSS modules, no styled-components
6. Icons: `react-icons/pi` (Phosphor)
7. Each game component receives `onClose: () => void` prop
8. Keep files under 200 lines, functions under 30 lines
9. Test behaviour, not implementation — Jest + Testing Library
10. Mobile-first responsive design
11. `GAME_SECTIONS` consumes `data/games.json` — never hardcode game sections in
    components
