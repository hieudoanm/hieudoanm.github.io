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
├── app/        # Routes: home hub, (games) tools, (info) group, (auth), error shells
├── components/
│   ├── atoms/      # Button, Badge, OfflineBadge, ThemeToggle
│   ├── organisms/  # Header
│   └── templates/  # HomeTemplate, info/error templates
├── content/    # about/download/version copy
├── games/      # flashcards/, english/, sign/, music/ — index.tsx + utils.ts each
├── hooks/      # useTheme, useProgress, useOffline, useSWRegister, useUpdater
├── lib/        # progress.ts, native/, publicPaths.ts
├── providers/  # SWProvider > NativeProvider > QueryProvider
└── styles/     # globals.css, base.css, themes.css
```

## Routing

App Router with static export:

- `/` — home hub (course grid)
- `/flashcards`, `/english`, `/sign`, `/music` — one page per game under
  `(games)/`, rendering its feature directly
- `(info)/about`, `(info)/downloads`, `(info)/version` — info routes
- `(auth)/sign-in`, `(auth)/sign-up`, `(auth)/forget-password`,
  `(auth)/reset-password`, `(auth)/profile` — auth routes
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

`public/data/words.json`, `public/models/sign-model.onnx` and
`public/audio/3/*.mp3` (piano note samples for the Music game) are fetched at
runtime. URLs come from `src/lib/publicPaths.ts`, which prefixes
`NEXT_PUBLIC_BASE_PATH` (inlined from the same `BASE_PATH` env var that sets
Next's `basePath`). Consequences:

- Dev/Tauri builds: empty prefix → `/data/words.json`
- Web deploy (`scripts/post-build.sh`): `/downloads/lingo/data/words.json`

## Music Game

Ear-training piano game migrated from the `music` app under `src/games/music/`:

- `index.tsx` — piano keyboard UI; `useMusicGame` composes the three hooks
- `useAudio` — plays per-note mp3s from `public/audio/3/` via `PUBLIC_BASE`
- `useGame` — level + score state; a wrong guess ends the run and persists a
  high score in `localStorage['music-high-score']`
- `useSequence` — walks a note sequence (practice scale / Twinkle Twinkle)
  highlighting each key
- `constants.ts` — key map and 12 levels; levels 1–7 use white keys only, black
  keys are introduced in levels 8–12
- `keyClasses.ts` — pure functions mapping feedback/highlight to key styles

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
