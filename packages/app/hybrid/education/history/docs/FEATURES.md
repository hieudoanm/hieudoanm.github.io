# Features

> History — Timeline-based history games as a hybrid web/desktop app.

## Project Foundation

- Monorepo scaffold following the lingo app conventions
  (`packages/app/hybrid/education/history`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `history` theme (light default) with
  `history-dark` toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

## Home & Navigation

- Card grid listing the tool with icon and description
- Tool route opened from home inside the shared `ToolTemplate`
- Theme toggle in template header; choice persisted in localStorage

## Through the Years

- Timeline-based history game: place historical events in chronological order
- 4 game modes: Practice (unlimited), Classic (20 events), Endless (first
  mistake ends), Hardcore (one life)
- 15 deck options across 6 continents (World, Egypt, US, China, India, Iraq,
  Vietnam, Greece, Italy, UK, South Africa, Mexico, Japan, France, Germany)
- Combo scoring system: 3-streak x2, 5-streak x3, 10-streak x5
- Speed bonus: up to +50 points for quick placement
- Hint system: century → decade → neighbouring event reveal
- Browse mode: compact (by century) or spread (year-by-year) view
- Compare mode: side-by-side deck comparison
- Game over stats: score, accuracy, correct count, best streak
- Responsive timeline: click-to-place with reveal animation
- BC year support (negative years sorted correctly)
