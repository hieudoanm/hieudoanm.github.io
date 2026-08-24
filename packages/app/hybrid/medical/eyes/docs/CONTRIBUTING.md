# Contributing

Thanks for contributing to **Eyes**, a hybrid visual acuity screening app
(Snellen, LogMAR, Tumbling E charts) that ships as a web app (browser) and
desktop app (Tauri).

## Getting Started

1. **Prerequisites**: Node.js (see `.nvmrc` at the repo root), `pnpm`, and a
   Rust toolchain for Tauri.
2. **Install dependencies** from the workspace root:

   ```bash
   pnpm install
   ```

3. **Run this app**:

   ```bash
   pnpm dev --filter=@hieudoanm.github.io/eyes
   ```

## Development Commands

| Task       | Command                                             |
| ---------- | --------------------------------------------------- |
| Dev server | `pnpm dev --filter=@hieudoanm.github.io/eyes`       |
| Build      | `pnpm build --filter=@hieudoanm.github.io/eyes`     |
| Lint       | `pnpm lint --filter=@hieudoanm.github.io/eyes`      |
| Format     | `pnpm format --filter=@hieudoanm.github.io/eyes`    |
| Unit tests | `pnpm test --filter=@hieudoanm.github.io/eyes`      |
| E2E tests  | `pnpm test:e2e --filter=@hieudoanm.github.io/eyes`  |
| Desktop    | `pnpm tauri --filter=@hieudoanm.github.io/eyes dev` |

Run `lint`, `format`, `test`, and `test:e2e` before pushing — CI enforces all of
them.

## Coding Conventions

The conventions below come from the repository-wide `AGENTS.md`. Follow them for
every change.

### General

1. **Explicit types over implicit** — annotate function signatures and exported
   symbols.
2. **Flat over deeply nested** — short functions, minimal indentation, guard
   clauses (`if (!value) return`).
3. **Self-documenting identifiers** — `randomLetters(count)` needs no comment.
4. **DRY** — when a pattern repeats, centralize it.
5. **Small, focused files** — functions ≤ 30 lines, files ≤ 200 lines.
6. **Explicit error handling** — check errors and fail loudly.
7. **Test names as documentation** — `it("has ten lines from 20/200 to 20/10")`.
8. **Consistent imports** — group by origin: stdlib, third-party, internal.
9. **Pure functions with explicit dependencies** — accept inputs, return
   outputs; no global/singleton state.
10. **Conventional layouts** — `src/app/`, `src/components/`, `e2e/`.

### TypeScript

1. Use arrow functions for all function declarations and component exports —
   `const fn = () => {}`, not `function fn() {}`.
2. Use `const` over `let` when a value is never reassigned.
3. Use `strict: true` in `tsconfig.json`.
4. Prefer `interface` over `type` for object shapes; use `type` for unions,
   intersections, and primitives.
5. Use `as const` for literal types.
6. Use `satisfies` over raw casts.
7. Explicitly type return values on exported functions.

### React

1. Prefer function components with hooks; never nest hooks inside conditionals
   or loops.
2. Type components with the `FC` helper from `react`.
3. Extract custom hooks (`useX`) for reusable logic.
4. Use a stable `key` prop in lists.
5. Memoise sparingly — profile first.

### Next.js

1. Use the App Router and flat routes (no dynamic segments).
2. Mark files `"use client"` only when they need interactivity or hooks — chart
   routes are client pages.
3. Use `loading.tsx`, `error.tsx`, `not-found.tsx` file conventions.
4. Use `next/link` for client-side navigation.

### Styling

1. Use Tailwind utility classes; compose, don't write custom CSS.
2. Use DaisyUI component classes (`btn`, `card`, `badge`, `modal`).
3. Dark theme is the default (`data-theme="nothing"`).
4. `prettier-plugin-tailwindcss` sorts classes — keep class order consistent.
5. Use `react-icons` Phosphor (`Pi`) set for domain icons.

## Chart Conventions

- Atomic design: `atoms/` → `charts/` → `templates/`
- Each chart is self-contained under `src/components/charts/<Chart>/`:
  `index.tsx` (fullscreen modal), `constants.ts` (line tables + optotype
  pools), `utils/` (pure randomisation + generation)
- **All chart logic lives in `utils/` as pure functions** — no DOM types, no UI
  imports; randomness goes through `Math.random` so tests can mock it
- Every chart component receives `onClose: () => void`; route pages wire it to
  `router.push('/')`
- Line sizing uses Tailwind arbitrary values (`text-[9rem]` …) tuned for a
  fullscreen modal — do not introduce per-chart pixel logic
- Keyboard navigation belongs in a window-level `keydown` handler registered on
  mount and cleaned up on unmount

## Testing Conventions

### Unit tests (Jest)

1. Test behaviour, not implementation.
2. Use Arrange-Act-Assert.
3. Keep tests isolated — each test manages its own state.
4. Cover boundary conditions (first/last line bounds) alongside happy paths.
5. Mock `Math.random` when asserting generated charts deterministically.
6. Maintain ≥80% coverage on statements, branches, functions, and lines —
   enforced by `coverageThreshold` in `jest.config.ts`.

### E2E tests (Playwright)

1. Use `getByRole` / `getByTestId` over raw CSS/XPath.
2. Assert on user-visible state (`toBeVisible`, `toHaveURL`).
3. Cover the home → chart → close flow and the 404 route
   (`e2e/home.spec.ts`).

## Before You Push

1. `pnpm lint --filter=@hieudoanm.github.io/eyes`
2. `pnpm format --filter=@hieudoanm.github.io/eyes`
3. `pnpm test --filter=@hieudoanm.github.io/eyes`
4. `pnpm test:e2e --filter=@hieudoanm.github.io/eyes`
5. `pnpm build --filter=@hieudoanm.github.io/eyes`
