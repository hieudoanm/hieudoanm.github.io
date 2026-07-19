# Games

## Build & Test

```bash
pnpm dev                    # Start Next.js dev server
pnpm test                   # Run all Jest tests
pnpm jest -- "GameName"     # Run tests for a specific game
pnpm tsc --noEmit           # TypeScript type check
pnpm lint                   # ESLint
```

## File Structure

```
games/<category>/
  index.tsx          # Component entry (default export)
  utils.ts           # Game logic/types (pure functions only)
  store.ts           # Optional: Zustand store
  components/        # Optional: Sub-components
    Card.tsx
    Timeline.tsx
  __tests__/
    utils.test.ts    # Unit tests for game logic
```

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

## Route Pattern

Every game tool needs two files:

```
src/app/(products)/games/<category>/<tool>/page.tsx
src/components/routes/games/<category>/<Tool>/index.tsx
```

```tsx
// page.tsx
'use client';
import { ToolPage } from '../../_shared/ToolPage';
import { MyGame } from '@hieudoanm.github.io/components/routes/games/<category>/<MyGame>';
const Page = () => <ToolPage Component={MyGame} backPath="/games/<category>" />;
export default Page;
```

## Registering New Games

Add `toolId` entry in `src/app/(products)/games/_shared/_maps.ts` and
`'tool-id'` to `MODAL_IDS` in `src/components/routes/start/types.ts`.

## State Management

- Zustand for complex games with multiple phases and stats
- `useReducer` for simple local game state
- Never put UI logic in stores
