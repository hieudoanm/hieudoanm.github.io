# Architecture

## Tech Stack

| Layer     | Choice                                          |
| --------- | ----------------------------------------------- |
| Framework | Next.js 16 App Router (static export), React 19 |
| Language  | TypeScript strict                               |
| Styling   | Tailwind CSS 4 + DaisyUI 5 custom themes        |
| State     | useReducer (local game state)                   |
| Desktop   | Tauri 2 (updater, dialog, notification plugins) |
| Testing   | Jest (+ React Testing Library)                  |

## Directory Structure

```
src/
├── app/        # Routes: home hub, prisoners-dilemma tool
├── components/
│   ├── features/   # prisoners-dilemma/ — index.tsx, types, constants, utils
│   └── templates/  # HomeTemplate
└── styles/     # globals.css, base.css, themes.css
```

## Routing

App Router with static export:

- `/` — home hub with tool card
- `/prisoners-dilemma` — game theory simulation

All routes prerender as static content.

## State Management

- `useReducer` with discriminated union actions for local game state
- Pure game logic in `utils/game.ts` — zero UI imports
- Exhaustive `never` check in reducer switch/case

## Theming

- Two custom DaisyUI v5 themes in `themes.css`: `economics` (light, default) and
  `economics-dark`
- `<html data-theme="economics">` server-rendered; an inline script in
  `layout.tsx` reads `localStorage['economics:theme']` before first paint

## Tauri Shell

`src-tauri/` mirrors the other hybrid apps: plugins registered in `lib.rs`,
permissions scoped in `capabilities/default.json`, updater configured in
`tauri.conf.json` against the repo's GitHub releases.
