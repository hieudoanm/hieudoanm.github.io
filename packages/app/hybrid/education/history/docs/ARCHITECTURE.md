# Architecture

## Tech Stack

| Layer     | Choice                                          |
| --------- | ----------------------------------------------- |
| Framework | Next.js 16 App Router (static export), React 19 |
| Language  | TypeScript strict                               |
| Styling   | Tailwind CSS 4 + DaisyUI 5 custom themes        |
| State     | Zustand (game store)                            |
| Desktop   | Tauri 2 (updater, dialog, notification plugins) |
| Testing   | Jest (+ React Testing Library)                  |

## Directory Structure

```
src/
├── app/        # Routes: home hub, through-the-years tool
├── components/
│   ├── features/   # through-the-years/ — engine, store, screens, components, data
│   └── templates/  # HomeTemplate, ToolTemplate
└── styles/     # globals.css, base.css, themes.css
```

## Routing

App Router with static export:

- `/` — home hub with tool card
- `/through-the-years` — timeline history game

All routes prerender as static content.

## State Management

- Zustand store (`store.ts`) manages all game state: mode, deck, timeline,
  current card, stats, hints, rounds
- Pure game engine (`engine.ts`) for scoring, placement, hints, date formatting
- No UI logic in the store — only state transitions

## Theming

- Two custom DaisyUI v5 themes in `themes.css`: `history` (light, default) and
  `history-dark`
- `<html data-theme="history">` server-rendered; an inline script in
  `layout.tsx` reads `localStorage['history:theme']` before first paint

## Data

- 15 JSON event datasets organized by region (world, africa, americas, asia,
  europe)
- Each event has: id, title, year, description, category, region, difficulty,
  source
- Lazy-loaded via JSON imports in `data/constants.ts`

## Tauri Shell

`src-tauri/` mirrors the other hybrid apps: plugins registered in `lib.rs`,
permissions scoped in `capabilities/default.json`, updater configured in
`tauri.conf.json` against the repo's GitHub releases.
