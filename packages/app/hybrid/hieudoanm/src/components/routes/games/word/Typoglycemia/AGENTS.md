# Games / Word / Typoglycemia

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "Typoglycemia" # Run tests for this game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```text
Typoglycemia/
  index.tsx            # Entry component — Editor/View tab switcher
  EditorTab.tsx        # Markdown textarea with word count, copy/paste
  ViewTab.tsx          # Rendered markdown, scrambling tick, PNG export
  constants.ts         # INITIAL demo markdown text
  types.ts             # Tab union type
  utils/
    typoglycemia.ts    # Pure logic: countWords, scrambleWord, scrambleText
```

## Gameplay

Demonstrates the "typoglycemia" reading effect on the player's own markdown.
Type or paste markdown in the Editor tab; the View tab renders it and
rescrambles the middle letters of every word every second (first and last
letters kept). The shuffle can be stopped, and the current view saved as a PNG
image.

## Logic

- `countWords` counts word tokens via a Unicode letter/number regex
- `scrambleWord` keeps the first and last characters, swaps middle letters 2–4
  times, and forces a swap when the shuffle happened to reproduce the original
  middle (guards against "no-op" scrambles); words of ≤ 3 letters are returned
  unchanged
- `scrambleText` applies `scrambleWord` to every ASCII-word match in the text
- `ViewTab` renders markdown via `marked`, sanitizes with DOMPurify, then walks
  the text nodes on each tick (`scrambleText`) while skipping `code`, `pre`, and
  `textarea` ancestors; `handleSaveAsImage` captures the view with html2canvas
  and downloads it as `typoglycemia.png`

## Routes

```tsx
// src/app/(products)/games/word/page.tsx              — category listing
// src/app/(products)/games/word/typoglycemia/page.tsx — tool
```

## Registration

- `data/games.csv` → `Word` section, `toolId: 'typoglycemia'`

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. Game logic MUST be pure functions in `utils.ts` — zero UI imports
4. State management: Zustand for complex games, `useState`/`useReducer` for
   simple ones
5. TailwindCSS v4 + DaisyUI v5 — no CSS modules, no styled-components
6. Icons: `react-icons/pi` (Phosphor)
7. Each game component receives `onClose: () => void` prop
8. Keep files under 200 lines, functions under 30 lines
9. Test behaviour, not implementation — Jest + Testing Library
10. Mobile-first responsive design
11. `GAME_SECTIONS` consumes `data/games.json` — never hardcode game sections in
    components
