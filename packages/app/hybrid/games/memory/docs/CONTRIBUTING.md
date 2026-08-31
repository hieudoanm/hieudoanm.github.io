# Contributing

Thanks for contributing to **Memory Games**, a hybrid app that ships as a web
app (browser), desktop app (Tauri), and mobile app (Tauri Mobile).

## Getting Started

1. **Prerequisites**: Node.js (see `.node-version` in the package) and `pnpm`.
2. **Install dependencies** from the workspace root:

   ```bash
   pnpm install
   ```

3. **Run this app**:

   ```bash
   pnpm dev --filter=@hieudoanm.github.io/memory
   ```

## Development Commands

| Task       | Command                                              |
| ---------- | ---------------------------------------------------- |
| Dev server | `pnpm dev --filter=@hieudoanm.github.io/memory`      |
| Build      | `pnpm build --filter=@hieudoanm.github.io/memory`    |
| Lint       | `pnpm lint --filter=@hieudoanm.github.io/memory`     |
| Format     | `pnpm format --filter=@hieudoanm.github.io/memory`   |
| Unit tests | `pnpm test --filter=@hieudoanm.github.io/memory`     |
| E2E tests  | `pnpm test:e2e --filter=@hieudoanm.github.io/memory` |

Run `lint`, `format`, `test`, and `test:e2e` before pushing — CI enforces all of
them.

## Coding Conventions

The conventions below come from the repository-wide `AGENTS.md`. Follow them for
every change.

### General

1. **Explicit types over implicit** — annotate function signatures and exported
   symbols.
2. **Flat over deeply nested** — short functions, minimal indentation, guard
   clauses.
3. **Self-documenting identifiers** — `getUserById(id)` needs no comment.
4. **DRY** — when a pattern repeats, centralize it.
5. **Small, focused files** — functions <= 30 lines, files <= 200 lines.
6. **Explicit error handling** — check errors and fail loudly.
7. **Test names as documentation** — `test("returns 404 when user not found")`.
8. **Consistent imports** — group by origin: stdlib, third-party, internal.
9. **Pure functions with explicit dependencies** — accept inputs, return
   outputs; no global/singleton state.
10. **Conventional layouts** — `src/`, `components/`, `games/`.

### TypeScript

1. Use arrow functions for all function declarations and component exports.
2. Use `const` over `let` when a value is never reassigned.
3. Use `strict: true` in `tsconfig.json`.
4. Prefer `interface` over `type` for object shapes; use `type` for unions,
   intersections, and primitives.
5. Use `as const` for literal types.
6. Use `satisfies` over raw casts.
7. Use `never` in exhaustive checks.
8. Explicitly type return values on exported functions.

### React

1. Prefer function components with hooks; never nest hooks inside conditionals
   or loops.
2. Extract custom hooks for reusable logic.
3. Use `useReducer` for complex state; colocate state with its consumers.
4. Use a stable `key` prop in lists — never array indices.
5. Memoise sparingly (`useMemo`/`useCallback`/`React.memo`).

### Next.js

1. Use the App Router (`app/`) and prefer Server Components by default.
2. Mark files `"use client"` only when they need interactivity or hooks.
3. Use route groups `(games)` and `(info)` to organize pages.
4. Use `loading.tsx`, `error.tsx`, `not-found.tsx` file conventions for
   fallbacks.
5. Use `next/link` for client-side navigation.

### Styling

1. Use Tailwind utility classes; compose, don't write custom CSS.
2. Use DaisyUI component classes (`btn`, `card`, `alert`, `badge`).
3. Dark theme is the default (`data-theme="nothing"` on `<html>`).
4. `prettier-plugin-tailwindcss` sorts classes.

### Game Architecture

Each game module follows this pattern:

- `constants.ts` — grid size, timing, level constants. No UI imports.
- `utils.ts` — pure functions for matching, generation, highlighting. No UI
  imports.
- `use*.ts` — custom hooks for game state, scoring, persistence. No UI imports.
- `keyHandlers.ts` — keyboard event handlers. No UI imports.
- `index.tsx` — React component rendering UI, controls, game board.

## Testing Conventions

### Unit tests (Jest)

Break tests into small per-file suites — one `*.test.ts` / `*.test.tsx` per unit (component, page, hook, util, provider), colocated in a `__tests__/` directory; never merge multiple units into one file. App pages are tested under `src/app/__tests__/` and route-group pages (`(app)`, `(info)`) colocate `__tests__/page.test.tsx` in the same folder.

1. Test behaviour, not implementation.
2. Use Arrange-Act-Assert.
3. Keep tests isolated — each test manages its own state.
4. Cover boundary conditions and error cases alongside happy paths.

### E2E tests (Playwright)

1. Use `locator`/`getByRole`/`getByText` over raw CSS/XPath.
2. Use `test.beforeEach` for shared setup.
3. Assert on user-visible state (`toBeVisible`, `toHaveText`).
4. Cover every page-level flow.

## Before You Push

1. `pnpm lint --filter=@hieudoanm.github.io/memory`
2. `pnpm format --filter=@hieudoanm.github.io/memory`
3. `pnpm test --filter=@hieudoanm.github.io/memory`
4. `pnpm test:e2e --filter=@hieudoanm.github.io/memory`
5. `pnpm build --filter=@hieudoanm.github.io/memory`
