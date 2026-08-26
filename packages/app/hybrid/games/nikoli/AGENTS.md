# Nikoli

Seven classic logic puzzle games from Nikoli publishers.

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "GameName"     # Run tests for a specific game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
src/
  app/
    (games)/
      page.tsx              # Home — game grid with GameCards
      <game>/page.tsx       # Per-game route
    (info)/
      about/page.tsx        # About page
      downloads/page.tsx    # Downloads page
      version/page.tsx      # Version page
    layout.tsx              # Root layout — theme, Header
  components/
    organisms/
      Header.tsx            # Nav header with theme toggle
    templates/
      AboutTemplate.tsx     # Reusable about layout
      DownloadsTemplate.tsx # Reusable downloads layout
      VersionTemplate.tsx   # Reusable version layout
      ErrorTemplate.tsx     # Error display
      NotFoundTemplate.tsx  # 404 display
  games/
    _shared/
      gameData.ts           # Game metadata, instructions, visualizations
      GameInstructions.tsx  # Modal with game instructions
    <Game>/
      index.tsx             # Entry component
      types.ts              # GAME_NAME, game-specific types
      use<Game>.ts          # Optional: game state hook
      utils.ts              # Optional: pure logic functions
      __tests__/            # Component and utils tests
  styles/
    globals.css             # Tailwind CSS 4 + DaisyUI 5
public/
  manifest.json             # PWA manifest
  icons/                    # PWA icons (16–512px)
src-tauri/
  tauri.conf.json           # Tauri 2 desktop config
  src/lib.rs                # Tauri Rust entry
```

## Games

| Slug        | Game      | Description                                                         |
| ----------- | --------- | ------------------------------------------------------------------- |
| `masyu`     | Masyu     | Draw a closed loop through pearls on a 7×7 grid                     |
| `norinori`  | Norinori  | Shade dominoes so each region has exactly two shaded cells          |
| `shikaku`   | Shikaku   | Divide the grid into rectangles, each containing one number         |
| `nurikabe`  | Nurikabe  | Paint islands connected by numbered cells, avoiding 2×2 pools       |
| `heyawake`  | Heyawake  | Shade cells so each room has the correct count and no 3 consecutive |
| `fillomino` | Fillomino | Fill the grid so each connected region matches its number           |
| `sudoku`    | Sudoku    | Classic 9×9 number placement puzzle                                 |

## Routes

```tsx
// src/app/(games)/page.tsx              — game grid
// src/app/(games)/<slug>/page.tsx       — per-game route
// src/app/(info)/about/page.tsx         — about
// src/app/(info)/downloads/page.tsx     — downloads
// src/app/(info)/version/page.tsx       — version
```

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. Game logic MUST be pure functions — zero UI imports
4. State management: Zustand for complex games, `useState`/`useReducer` for
   simple ones
5. TailwindCSS v4 + DaisyUI v5 — no CSS modules, no styled-components
6. Icons: `react-icons/pi` (Phosphor)
7. Each game exports `GAME_NAME` from `types.ts`
8. Keep files under 200 lines, functions under 30 lines
9. Test behaviour, not implementation — Jest + Testing Library
10. Mobile-first responsive design
