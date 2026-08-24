# Features

> Lingo — Duolingo-style language learning (flashcards, dictionary,
> sign-language recognition) as a hybrid web/desktop app.

## Project Foundation

- Monorepo scaffold following the `psychology` app conventions
  (`packages/app/hybrid/education/lingo`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `lingo` theme (light default) with `lingo-dark`
  toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

## Home & Navigation

- Card grid listing the three tools with icons and descriptions
- Tool routes rendered directly, opened from the home card grid; closing returns
  to `/`
- Error shells: 404 / 403 / 401 / 500 templates plus loading state
- Offline badge driven by `useOffline`
- Theme toggle in every template header; choice persisted in localStorage

## Flashcards

- Vocabulary cards fetched at runtime from `/data/words.json` via TanStack Query
  (kept out of the JS bundle)
- Language filter derived from the dataset (`getLanguages` / `filterByLanguage`)
- Shuffle, flip-to-reveal and keyboard navigation
- Awards 10 XP per 10 navigated cards through the shared progress store

## English Dictionary

- Word lookup with part-of-speech grouped definitions
- Clickable synonym/antonym badges that navigate between words
- Graceful handling of missing/blank input

## Sign Recognition

- Real-time webcam letter recognition: MediaPipe Hands landmarks → ONNX model
  inference (`sign-model.onnx`)
- Mirrored video rendering with landmark overlay drawing
- Pure feature extraction in utils: 126-dim vector = 63 landmark offsets + 21
  hand connections × 3 bone vectors, scale-normalised
- Start/stop lifecycle with camera + inference cleanup on unmount

## Progress

- XP and daily streak persisted in IndexedDB (`idb`)
- Pure scoring function (`applyActivity`) — streak increments once per day
- Home hub displays current XP and streak badges

## Platform Integration

- Tauri updater plugin with signed releases
- Native notifications via `nativeNotify`
- PWA manifest + network-first service worker for web installs
