# Architecture

## Tech Stack

| Layer     | Choice                                              |
| --------- | --------------------------------------------------- |
| Framework | Next.js 16 App Router (static export), React 19     |
| Language  | TypeScript strict                                   |
| Styling   | Tailwind CSS 4 + DaisyUI 5 custom themes            |
| Data      | TanStack Query (fetch), IndexedDB via `idb` (store) |
| ML        | ONNX Runtime Web + MediaPipe Hands                  |
| Desktop   | Tauri 2 (updater, dialog, notification plugins)     |
| Testing   | Jest (+ React Testing Library), Playwright          |

## Directory Structure

```
src/
├── app/        # Routes: home hub, three tools, (info) group, error shells
├── components/
│   ├── atoms/      # Button, Badge, OfflineBadge, ThemeToggle
│   ├── features/   # flashcards/, english/, sign/ — index.tsx + utils.ts each
│   └── templates/  # HomeTemplate, ToolTemplate, info/error templates
├── hooks/      # useTheme, useProgress, useOffline, useSWRegister, useUpdater
├── lib/        # progress.ts, native/, publicPaths.ts
├── providers/  # SWProvider > NativeProvider > QueryProvider
└── styles/     # globals.css, base.css, themes.css
```

## Routing

App Router with static export:

- `/` — home hub (course grid)
- `/flashcards`, `/english`, `/sign` — one page per tool, each wrapping its
  feature in a `ToolTemplate`
- `(info)/about`, `(info)/downloads`, `(info)/version` — info routes
- `error.tsx` / `not-found.tsx` / `forbidden.tsx` / `unauthorized.tsx` /
  `default.tsx` / `global-error.tsx` — error shells
- `loading.tsx` — route-level loading state

All routes prerender as static content.

## State Management

Three layers, kept deliberately separate:

1. **Server-ish data** — vocabulary JSON fetched at runtime by TanStack Query
   inside the Flashcards feature. The 8.6 MB dataset never enters the bundle.
2. **Persistent local state** — XP/streak progress in IndexedDB
   (`src/lib/progress.ts`). Reads/writes go through small async helpers; scoring
   is a pure function `applyActivity(progress, activity)` so tests cover rules
   without touching storage.
3. **Ephemeral UI state** — `useState` within features (current card index,
   camera running flag). No global stores.

## Theming

- Two custom DaisyUI v5 themes in `themes.css`: `lingo` (light, default) and
  `lingo-dark`
- `<html data-theme="lingo">` server-rendered; an inline script in `layout.tsx`
  reads `localStorage['lingo:theme']` before first paint to avoid FOUC
- `useTheme` toggles between the two values and persists

## Static Assets & Base Path

`public/data/words.json` and `public/models/sign-model.onnx` are fetched at
runtime. URLs come from `src/lib/publicPaths.ts`, which prefixes
`NEXT_PUBLIC_BASE_PATH` (inlined from the same `BASE_PATH` env var that sets
Next's `basePath`). Consequences:

- Dev/Tauri builds: empty prefix → `/data/words.json`
- Web deploy (`scripts/post-build.sh`): `/downloads/lingo/data/words.json`

## Sign Recognition Pipeline

```
webcam → MediaPipe Hands → 21 Landmarks/hand
       → extractFeatures()  (63 offsets + 21×3 bone vectors, scale-normalised)
       → ONNX session.run() → label tensor → readLabelTensor()
       → detected letter UI
```

Feature extraction and tensor decoding are pure functions in
`features/sign/utils.ts`; only the camera loop lives in `index.tsx`.

## Tauri Shell

`src-tauri/` mirrors the other hybrid apps: plugins registered in `lib.rs`,
permissions scoped in `capabilities/default.json`, updater configured in
`tauri.conf.json` against the repo's GitHub releases.
