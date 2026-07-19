# Games / Chess / ChessStats

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "ChessStats"   # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
ChessStats/
  index.tsx                     # Entry component — Chess.com lookup + stats
  types.ts                      # Analysis, PlayerRatings, TitleKey, DB types
  constants.ts                  # Title lists, comparison tabs, sql.js CDNs
  utils/
    percentile.ts               # calcPercentile, buildChartData
    sql.ts                      # useSQLite — sql.js database loader
  components/
    StatCard.tsx                # Total players card
    SearchBar.tsx               # Username search input + status
    Analysis.tsx                # Title/rating distribution section
    TitleSection.tsx            # Per-title rating histograms
    HistogramBar.tsx            # Chart.js stacked histogram
    Percentile.tsx              # Percentile comparison panel
  data/
    analysis.json               # Static player distribution data
```

## Gameplay

Chess Insights shows the player distribution by title and rating from a bundled
SQLite database. Search a Chess.com username; the tool fetches their
bullet/blitz/rapid stats from the public API and compares each best rating
against all players or against a specific title, showing the percentile.

## Logic

- `useSQLite` — injects sql.js from a CDN, fetches `/db/chess.db`, and
  instantiates the `DB` (with cancelled-flight cleanup on unmount)
- `calcPercentile` — runs COUNT queries against `players` for a format column
  (`<format>_rating_best`), optionally filtered by title; percentile is
  `betterThan / total`
- `buildChartData` — assembles stacked chart.js datasets from the static
  `analysis.json` histogram keyed by title and time control
- `handleSearch` in `index.tsx` maps the Chess.com `/stats` response into
  `PlayerRatings` (last + best per format) and builds one `COMPARISON_TABS`
  entry per title plus the all-players tab

## Routes

```tsx
// src/app/(products)/games/chess/page.tsx          — category listing
// src/app/(products)/games/chess/chess-stats/page.tsx — tool
```

## Registration

- `data/games.csv` → `Chess` section, `toolId: 'chess-stats'`

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
