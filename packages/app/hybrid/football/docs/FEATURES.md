# Football Squad Manager — Features

## Pitch & Formations

- Formation catalogue for 11-, 7-, and 5-a-side teams (e.g. 4-4-2, 4-3-3, 3-5-2,
  5-3-2, 2-2, etc.)
- 11-a-side formations grouped by defensive line (Back 4, Back 3, Back 5)
- Interactive pitch with positional markers, grouped by line (GK / defence /
  midfield / attack)
- Switch formation size and formation from the selector

## Squad Management

- Multiple named squads: save, switch, rename, duplicate, and remove
- Add and remove players (name, shirt number, role)
- Edit players inline in the roster (name, shirt number, role, preferred
  position)
- Duplicate shirt-number detection: blocks conflicting adds/edits and warns in
  the roster
- Assign a preferred position per player; unassigned players auto-place there
- Assign players to positions via the position picker (checkbox-based)
- Auto-places a new player into a matching empty position when one exists
- `localStorage` persistence across reloads
- Example squads (e.g. Liverpool 2019-2020, Barcelona 2008-2009, Manchester City
  2022-2023) loadable onto the pitch

## Tactics

- Swap players between two positions from the picker (choose target position +
  swap)
- Drag-and-drop reordering of positions: drag a player marker onto another
  position to swap
- Team stats panel: formation strength, position coverage per role, filled/total
  positions, unassigned players

## Data Exchange

- Export squad as CSV
- Import squad from CSV (players only)
- Export squad as JSON (players, formation, assignments)
- Import squad from JSON (replaces players, formation, and assignments)
- Downloads use a filename derived from the squad name

## Matchday

- Mark starters vs. substitutes with a bench toggle in the roster
- Bench list rendered below the pitch in the picker
- In-match substitution flow: bring a bench player on for a starter (and swap
  back)
- Match clock: 90 minutes plus half-time, with start/pause/reset and phase
  display
- Formation reminders: warns about empty positions, unassigned players, and
  available bench players

## Tooling & Quality

- Unit tests (lib + components) with coverage ≥ 90% (statements, branches,
  functions, lines)
- Playwright e2e smoke tests covering the core flows
- TypeScript with strict mode, ESLint, Prettier
