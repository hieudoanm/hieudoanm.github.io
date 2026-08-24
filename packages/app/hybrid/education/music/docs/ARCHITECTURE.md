# Architecture

## Tech Stack

| Layer     | Choice                                          |
| --------- | ----------------------------------------------- |
| Framework | Next.js 16 App Router (static export), React 19 |
| Language  | TypeScript strict                               |
| Styling   | Tailwind CSS 4 + DaisyUI 5 custom themes        |
| Desktop   | Tauri 2 (updater, dialog, notification plugins) |
| Testing   | Jest (+ React Testing Library)                  |

## Directory Structure

```
src/
├── app/        # Routes: home hub, pitch tool
├── components/
│   ├── features/   # pitch/ — index.tsx, hooks, constants
│   └── templates/  # HomeTemplate, ToolTemplate
└── styles/     # globals.css, base.css, themes.css
```

## Routing

App Router with static export:

- `/` — home hub with tool card
- `/pitch` — ear-training piano game

All routes prerender as static content.

## Theming

- Two custom DaisyUI v5 themes in `themes.css`: `music` (light, default) and
  `music-dark`
- `<html data-theme="music">` server-rendered; an inline script in `layout.tsx`
  reads `localStorage['music:theme']` before first paint

## Tauri Shell

`src-tauri/` mirrors the other hybrid apps: plugins registered in `lib.rs`,
permissions scoped in `capabilities/default.json`, updater configured in
`tauri.conf.json` against the repo's GitHub releases.
