# Docs

Personal documentation and portfolio site for Hieu Doan. Includes developer
tools, games, medical apps, and more — all accessible from a single docs-style
interface.

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "ToolName"     # Run tests for a specific tool
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
pnpm analyze                # Next.js bundle analysis
```

## File Structure

```text
src/
  app/
    (products)/
      page.tsx              # Home — category grid
      <category>/
        page.tsx            # Category listing
        <tool>/page.tsx     # Tool page
    layout.tsx              # Root layout
  components/
    routes/
      games/                # Game tools (Maze, Snake, DinoRun, etc.)
      medical/              # Medical tools (Eye charts, etc.)
      developer-tools/      # Dev tools (UUID generator, etc.)
    templates/              # Shared page templates
    organisms/              # Shared organisms (Header, etc.)
    data/
      games.csv             # Source of truth for game registry
      games.json            # Generated from CSV
      games.ts              # Loads JSON → GAME_SECTIONS with icon resolution
      scripts/
        convert-csv-to-json.ts  # CSV → JSON converter
  hooks/                    # Shared React hooks
  services/                 # API services
  utils/                    # Shared utilities
  styles/
    globals.css             # Tailwind CSS 4 + DaisyUI 5
public/
  manifest.json             # PWA manifest
  icons/                    # PWA icons (16–512px)
src-tauri/
  tauri.conf.json           # Tauri 2 desktop config
```

## Data Workflow

`data/games.csv` is the single source of truth for game registration. Edit it,
then regenerate:

```bash
ts-node --project scripts/tsconfig.json \
  src/components/routes/games/data/scripts/convert-csv-to-json.ts
```

- Never edit `data/games.json` by hand — it is generated from the CSV.
- `data/games.ts` maps icon name strings to `react-icons/pi` components.

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

## Note

Games originally in this package (Maze, Snake, DinoRun) have been migrated to
the standalone `games/8-bit` package. The source files remain here for
reference.
