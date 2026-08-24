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
├── app/        # Routes: home hub, periodic table tool
├── components/
│   ├── features/   # periodic-table/ — index.tsx
│   └── templates/  # HomeTemplate
└── styles/     # globals.css, base.css, themes.css
```

## Routing

App Router with static export:

- `/` — home hub with tool card
- `/periodic-table` — interactive periodic table tool

All routes prerender as static content.

## Theming

- Two custom DaisyUI v5 themes in `themes.css`: `chemistry` (light, default) and
  `chemistry-dark`
- `<html data-theme="chemistry">` server-rendered; an inline script in
  `layout.tsx` reads `localStorage['chemistry:theme']` before first paint

## Static Assets & Base Path

Runtime asset URLs are prefixed via `NEXT_PUBLIC_BASE_PATH`. Consequences:

- Dev builds: empty prefix → `/audio/3/...`
- Web deploy: `/downloads/chemistry/data/...`

## Tauri Shell

`src-tauri/` mirrors the other hybrid apps: plugins registered in `lib.rs`,
permissions scoped in `capabilities/default.json`, updater configured in
`tauri.conf.json` against the repo's GitHub releases.
