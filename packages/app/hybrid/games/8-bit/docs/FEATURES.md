# Features

> 8-Bit Games — classic arcade and puzzle games with retro pixel-art style.
> Three games: Maze (pathfinding puzzle), Snake (classic arcade), and DinoRun
> (infinite runner).

## Games

### Maze (迷路 / Labyrinth)

- Generate a random perfect maze on a 5×5 to 20×20 grid
- Recursive-backtracker algorithm carves passages via DFS
- BFS solver animates the shortest path from top-left to bottom-right
- Canvas-rendered with colour-coded cells: blue (start), green (path), red (end)
- Adjustable size slider
- Keyboard shortcuts: R (new maze), S (solve), Esc (close)

### Snake (スネーク / Serpent)

- Classic snake on a 12×12 grid
- Arrow keys steer; eating food grows the snake and adds a point
- Hitting a wall or your own body ends the game
- Speed slider (1–5) adjusts tick rate from 180ms to 60ms
- Space/P toggles pause
- Score tracking and game-over detection
- Head and food are colour-coded on a responsive grid

### DinoRun (ディノロッター / Dino Runner)

- Infinite runner on a 320×320 canvas
- Dino auto-runs and gains speed over time (up to 10×)
- Jump over cacti, rocks, and birds (Space / click / ArrowUp)
- AABB collision detection with forgiving 6px hitbox shrink
- Night sky with twinkling stars, drifting clouds, and moon
- Score (frames/10) and best score tracking
- Press R to restart after game over

## Shared Features

- "How to Play" instructions modal for each game with visual examples
- Responsive layout (desktop and mobile)
- Dark theme by default (dracula), light theme option (bumblebee)
- Sticky header with theme toggle
- Back navigation to home page via Escape key
- Game card grid on home page with descriptions
- Bilingual game names (English + Japanese)

## Platform & UX

- Static export for offline-first PWA support
- Service worker caches all pages for offline play
- Tauri desktop app build (bundling configured; signing not yet)
- PWA manifest for installability

---

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.
