# Visualization / Football

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```text
Football/
  components/         # Shared UI (Breadcrumbs, PageShell, PageHeader, ErrorState, KnockoutLink)
  data/               # Pure data by competition (no UI imports)
    shared.ts         # Flag rendering, team standing helpers
    tournament.ts     # Tournament metadata config
    club/             # Club competitions (la-liga, premier-league, bundesliga, champions-league)
    international/    # International competitions (world-cup, euro, copa, afcon, afc, asean, concacaf)
  pages/              # View pages
    tournaments/      # Tournament listing
    years/            # Year selection for a tournament
    group-stage/      # Group standings
    knock-out/        # Bracket tree (Header, BracketBoard, RingsLayer, etc.)
      components/     # Knock-out-specific sub-components
```

## Routes

```tsx
// src/app/(products)/apps/visualization/football/page.tsx          — tournament listing
// src/app/(products)/apps/visualization/football/[tournament]/page.tsx       — year selection
// src/app/(products)/apps/visualization/football/[tournament]/[year]/page.tsx     — group stage
// src/app/(products)/apps/visualization/football/[tournament]/[year]/knock-out/page.tsx — bracket
```

## Data Conventions

- Each competition folder has `types.ts` and an `index.ts` re-exporting every
  edition plus aggregate maps (`ALL_*`, `KNOCKOUT_DATA`)
- Year files export typed objects: `<LEAGUE>_<YEAR>: <League>YearData` (groups)
  and `KNOCKOUT: KnockoutYearData | null` (bracket)
- `shared.ts` provides helper functions (flag rendering, standing creation)

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. Data files are pure — zero React imports
4. TailwindCSS v4 + DaisyUI v5
5. Icons: `react-icons/pi`
6. Keep files under 200 lines, functions under 30 lines
