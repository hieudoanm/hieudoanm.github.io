# Football Squad Manager — Architecture

## Overview

A Next.js (App Router) web app for picking football formations, building a squad
roster, and assigning players to pitch positions. The squad is persisted locally
in `localStorage`.

## Tech Stack

- **Next.js** (App Router, static export) with TypeScript
- **Tailwind CSS** + **DaisyUI** (dark `dim` theme)
- **react-icons/fi** (Feather) for icons
- **Jest** + **React Testing Library** for unit tests
- **Playwright** for e2e tests

## Directory Structure

```
src/
├── app/            # Next.js routes (layout, page)
├── components/
│   ├── atoms/      # Smallest primitives (ShirtBadge)
│   ├── molecules/  # Composition units (Pitch, selectors, picker, roster)
│   └── organisms/  # Feature composition (SquadManager)
├── hooks/          # Client-side state (useSquad)
├── lib/            # Pure, dependency-free logic (formations, squad, pitch)
├── styles/         # Tailwind + DaisyUI theme files
├── test/           # Shared test fixtures
└── types/          # Domain types
```

## Data Model

- `Formation` — id, name, size (`5 | 7 | 11`), and a list of `FormationSlot`s.
  Each slot carries a stable `id`, a label (`GK`, `ST`, …), a shirt `number`,
  and a `line` index used for pitch positioning.
- `Player` — id, name, number, role (`GK | DEF | MID | FWD`), and an optional
  `bench` flag marking substitutes.
- `Squad` — name, `formationId`, a list of `Player`s, and `assignments` mapping
  slot id → player id list.

## Logic Layers

`src/lib/` is intentionally free of React and side effects:

- `formations.ts` — formation catalogue, lookups, slot→line grouping, and
  percentage-based pitch coordinates (`pitchPosition`).
- `squad.ts` — pure CRUD over a `Squad` value (add/update/remove players,
  assign/unassign/clear slots, bench toggles, substitutions) plus `localStorage`
  persistence with safe fallbacks.
- `pitch.ts` — label → role mapping and role badge styling helpers.
- `clock.ts` — match-clock helpers (`formatMatchTime`, `matchPhase`,
  `phaseLabel`) for the 90-minute match day.
- `reminders.ts` — lineup checks that produce formation reminders (empty
  positions, unassigned players, bench availability).

State lives in `src/hooks/useSquad.ts`: a single `Squad` value is held in
`useState`, initialised from storage, and saved on every change via `useEffect`.
No global/singleton state.

## UI Flow

1. `SquadManager` renders the `FormationSelector`, `Pitch`, `PlayerPicker`,
   `PlayerRoster`, `MatchClock`, and `FormationReminder`.
2. Clicking a pitch position selects a slot and shows the `PlayerPicker`.
3. Checkboxes assign/unassign players to that position; `PlayerRoster` adds and
   removes squad members and toggles bench status.
4. Changing formation or size clears assignments (slot ids are
   formation-specific).
5. The `MatchClock` runs the match timer locally; `FormationReminder` surfaces
   lineup warnings from `reminders.ts`.
