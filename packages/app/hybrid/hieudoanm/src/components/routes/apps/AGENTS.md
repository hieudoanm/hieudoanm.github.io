# Apps

## Build & Test

```bash
pnpm dev          # Start Next.js dev server
pnpm test         # Run all Jest tests
pnpm jest -- "AppName"  # Run tests for a specific app
pnpm tsc --noEmit # TypeScript type check
pnpm lint         # ESLint
```

## File Structure

```
apps/<category>/
  index.tsx          # Component entry (default export)
  <SubComponent>.tsx # Sub-components
  utils.ts           # Logic/types (pure functions only)
  __tests__/
    index.test.tsx   # Component + behaviour tests
```

## Coding Rules

1. Arrow functions only — no `function` keyword
2. Explicit types on all exports — never `any`
3. State management: `useState`/`useReducer` for local, React Context for shared
4. TailwindCSS v4 + DaisyUI v5 — no CSS modules, no styled-components
5. Icons: `react-icons/pi` (Phosphor)
6. Each tool component receives `onClose: () => void` prop
7. Keep files under 200 lines, functions under 30 lines
8. Pure logic in `utils.ts` — never mix UI and business logic
9. Test behaviour, not implementation — Jest + Testing Library

## Route Pattern

Every app tool needs two files:

```
src/app/(products)/apps/<category>/<tool>/page.tsx
src/components/routes/apps/<category>/<Tool>/index.tsx
```

```tsx
// page.tsx
'use client';
import { ToolPage } from '../../_shared/ToolPage';
import { MyTool } from '@hieudoanm.github.io/components/routes/apps/<category>/<MyTool>';
const Page = () => <ToolPage Component={MyTool} backPath="/apps/<category>" />;
export default Page;
```

## Registering New Tools

Add entry in `src/components/routes/start/types.ts` (`MODAL_IDS` array) and in
`src/app/(products)/apps/_shared/_maps.ts`.

## State Management

- Prefer pure functions with explicit dependencies
- No global/singleton state — pass dependencies explicitly
- Return values over side effects
