# Games / Chess / ChessBoard

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "ChessBoard"   # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
ChessBoard/
  index.tsx                     # Entry component — board + 4 side panels
  constants.ts                  # INITIAL_FEN / INITIAL_ID (chess960 id 518)
  types.ts                      # BoardMode ('explore' | 'play'), SidePanel
  hooks/
    useChessBoard.ts            # Main hook wiring reducer, engine, export
    boardReducer.ts             # useReducer board state + build960
    useEngineIntegration.ts     # Stockfish play-mode integration + eval
    useEcoData.ts               # ECO openings browser state
    useExport.ts                # PNG / animated GIF export
  utils/eco.ts                  # ECO groupings, replayPGN, downloadGIF
  components/
    Header.tsx                  # Mode switch, 960 id picker, reset
    BoardSection.tsx            # Interactive chessboard
    PositionPanel.tsx           # FEN / PGN editing
    EnginePanel.tsx             # Stockfish evaluation display
    ExportPanel.tsx             # PNG / GIF export buttons
    EcoPanel.tsx                # Openings browser (group/subgroup/opening)
```

## Gameplay

Interactive chess board with two modes: explore (drag any piece freely) and play
(White vs Stockfish). Four side panels switch via tabs — position (FEN/PGN),
engine (live eval), export (PNG/GIF), and openings (ECO browser). Supports
Chess960 starting positions via the 960 ID selector or randomize.

## Logic

- `boardReducer` — actions `SET_FEN`, `SET_BOARD_MODE`, `SET_PANEL`,
  `SYNC_GAME`, etc.; `build960(id)` constructs a game from the `chess960` table
- `useChessBoard` — validates drops with `getLegalMoves`/`makeMove` from
  `@chess/ts`, rejects moves in the openings panel, and auto-promotes queens
- `useEngineIntegration` — calls `analyze(fen, 15)` on Black's turn in play mode
  and applies the returned `bestMove`; `evalPercent` = 50 + eval/20 clamped to
  ±1000; statuses for check, checkmate, draw, and thinking
- `replayPGN` — replays SAN moves from a PGN string
- `downloadGIF` — encodes board frames (via `html2canvas`) into an animated GIF

## Routes

```tsx
// src/app/(products)/games/chess/page.tsx          — category listing
// src/app/(products)/games/chess/chess-board/page.tsx — tool
```

## Registration

- `data/games.csv` → `Chess` section, `toolId: 'chess-board'`

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
