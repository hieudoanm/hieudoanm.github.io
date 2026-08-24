# Features

> Music — Ear-training games and music tools as a hybrid web/desktop app.

## Project Foundation

- Monorepo scaffold following the lingo app conventions
  (`packages/app/hybrid/education/music`)
- Next.js static export validated against Tauri's `dist` expectations
- Tauri desktop shell boots and loads the exported Next.js build
- Shared design system: DaisyUI `music` theme (light default) with `music-dark`
  toggle, base layout, navigation shell
- CI: lint, typecheck, build web export, build Tauri desktop artifact
- Unit test coverage thresholds enforced at 80% global

## Home & Navigation

- Card grid listing the tool with icon and description
- Tool route opened from home inside the shared `ToolTemplate`
- Theme toggle in template header; choice persisted in localStorage

## Pitch (Ear Training)

- Guess-the-note piano game: random note plays, player guesses on on-screen
  keyboard
- 11 difficulty levels with growing note pools (C → full chromatic scale)
- Score tracking with localStorage-persisted high score
- Practice mode: ascending white keys with key highlighting
- Twinkle Twinkle Little Star mode: melody playback with highlighting
- Visual feedback: green for correct, red for wrong, blue for highlighted
- Ripple animation on tone play
- Mobile-first responsive design with white and black key rendering
- Keyboard-free: all interaction via click/tap
