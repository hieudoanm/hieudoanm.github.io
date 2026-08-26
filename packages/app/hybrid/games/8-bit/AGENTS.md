# 8-Bit Games

Three classic 8-bit arcade games: Maze, Snake, and DinoRun.

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
      maze/page.tsx         # Maze route
      snake/page.tsx        # Snake route
      dino-run/page.tsx     # DinoRun route
    (info)/
      about/page.tsx        # About page
      downloads/page.tsx    # Downloads page
      version/page.tsx      # Version page
    layout.tsx              # Root layout — theme, Header
    not-found.tsx           # 404 page
    error.tsx               # Error boundary
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
    Maze/
      index.tsx             # Canvas renderer, size slider, solve animation
      maze.ts               # Pure logic — grid creation, maze generation, BFS solver
      constants.ts          # DEFAULT/MIN/MAX size, CELL_SIZE, WALL_THICKNESS
      types.ts              # GAME_NAME, Cell, Pos types
    Snake/
      index.tsx             # Grid render, game loop, input, HUD
      snake.ts              # Pure logic — randomFood, initSnake, direction helpers
      constants.ts          # GRID size, tick timing constants
      types.ts              # GAME_NAME, Cell, Dir, Pos types
    DinoRun/
      index.tsx             # Canvas game loop, input, HUD
      game.ts               # Pure simulation — spawn, tick, collision, drawing
      constants.ts          # Physics/tuning constants (gravity, speeds, sizes)
      types.ts              # GAME_NAME, Dino, Obstacle, Cloud, Star, Phase types
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

| Slug       | Game    | Description                                       |
| ---------- | ------- | ------------------------------------------------- |
| `maze`     | Maze    | Random perfect maze with BFS solver, 5×5 to 20×20 |
| `snake`    | Snake   | Classic snake on a 12×12 grid with speed control  |
| `dino-run` | DinoRun | Infinite runner with cacti, rocks, and birds      |

## Routes

```tsx
// src/app/(games)/page.tsx              — game grid
// src/app/(games)/maze/page.tsx         — maze
// src/app/(games)/snake/page.tsx        — snake
// src/app/(games)/dino-run/page.tsx     — dino run
// src/app/(info)/about/page.tsx         — about
// src/app/(info)/downloads/page.tsx     — downloads
// src/app/(info)/version/page.tsx       — version
```

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. Game logic MUST be pure functions — zero UI imports
4. State management: `useState`/`useReducer` for game state
5. TailwindCSS v4 + DaisyUI v5 — no CSS modules, no styled-components
6. Escape key navigates back via `useRouter().push('/')`
7. Keep files under 200 lines, functions under 30 lines
8. Test behaviour, not implementation — Jest + Testing Library
9. Mobile-first responsive design
10. Each game exports `GAME_NAME` from `types.ts`
