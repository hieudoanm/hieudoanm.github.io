# Contributing

Thanks for contributing to **Diagram**, a hybrid app that ships as a web app
(browser), desktop app (Tauri), and mobile app (Tauri Mobile).

## Getting Started

1. **Prerequisites**: Node.js (see `.nvmrc` at the repo root) and `pnpm`.
2. **Install dependencies** from the workspace root:

   ```bash
   pnpm install
   ```

3. **Run this app**:

   ```bash
   pnpm dev --filter=@hieudoanm.github.io/diagram
   ```

## Development Commands

| Task       | Command                                               |
| ---------- | ----------------------------------------------------- |
| Dev server | `pnpm dev --filter=@hieudoanm.github.io/diagram`      |
| Build      | `pnpm build --filter=@hieudoanm.github.io/diagram`    |
| Lint       | `pnpm lint --filter=@hieudoanm.github.io/diagram`     |
| Format     | `pnpm format --filter=@hieudoanm.github.io/diagram`   |
| Unit tests | `pnpm test --filter=@hieudoanm.github.io/diagram`     |
| E2E tests  | `pnpm test:e2e --filter=@hieudoanm.github.io/diagram` |

Run `lint`, `format`, `test`, and `test:e2e` before pushing — CI enforces all of
them.

## Coding Conventions

The conventions below come from the repository-wide `AGENTS.md`. Follow them for
every change.

1. **Explicit types over implicit** — annotate function signatures and exported
   symbols.
2. **Flat over deeply nested** — short functions, minimal indentation, guard
   clauses (`if (!value) return`).
3. **Self-documenting identifiers** — `parseDiagram(text)` needs no comment.
4. **DRY** — centralize repeated patterns; duplication hides bugs.
5. **Small, focused files** — functions ≤ 30 lines, files ≤ 200 lines.
6. **Explicit error handling** — check errors and fail loudly.
7. **Test names as documentation** — `test("parses quoted labels with commas")`.
8. **Consistent imports** — group by origin: stdlib, third-party, internal.
9. **Pure functions with explicit dependencies** — accept inputs, return
   outputs.
10. **Conventional layouts** — `src/`, `components/`, `lib/`, `e2e/`.

### TypeScript

1. Arrow functions for all function declarations and component exports.
2. `const` over `let` when a value is never reassigned.
3. `strict: true` in `tsconfig.json`.
4. Prefer `interface` for object shapes; `type` for unions and primitives.
5. Use `satisfies` over raw casts.
6. Explicitly type return values on exported functions.

### React

1. Prefer function components with hooks; never nest hooks in conditionals.
2. Extract custom hooks (`useX`) for reusable logic.
3. Use `useReducer` for complex state; colocate state with its consumers.
4. Use a stable `key` prop in lists — never array indices.
5. Memoise sparingly — profile first.
6. Run in `React.StrictMode` during development.

### Next.js

1. App Router (`app/`) and prefer Server Components by default.
2. Mark files `"use client"` only when they need interactivity or hooks.
3. Use `loading.tsx`, `error.tsx`, `not-found.tsx` file conventions.

### Styling

1. Tailwind utility classes; compose, don't write custom CSS.
2. DaisyUI component classes (`btn`, `badge`, `input`).
3. Dark theme is the default (`data-theme="diagram"`).
4. `prettier-plugin-tailwindcss` sorts classes — keep class order consistent.
5. Use `react-icons` Feather (`Fi`) set for icons.

## Testing Conventions

### Unit tests (Jest)

1. Test behaviour, not implementation.
2. Use Arrange-Act-Assert.
3. Keep tests isolated — each test manages its own state.
4. Cover boundary conditions and error cases alongside happy paths.
5. Use `it.each` for data-driven tests; colocate tests with source files.
6. Maintain ≥90% coverage on statements, branches, functions, and lines —
   enforced by `coverageThreshold` in `jest.config.ts`; run
   `pnpm exec jest --coverageReporters=text` to view per-file coverage.

### E2E tests (Playwright)

1. Use `locator`/`getByRole`/`getByText` over raw CSS/XPath.
2. Mock network via `page.route(...)` so tests don't need external services.
3. Use `test.beforeEach` for shared setup.
4. Assert on user-visible state (`toBeVisible`, `toHaveText`).
5. Cover every page-level flow (`pnpm test:e2e`).

## Before You Push

1. `pnpm lint --filter=@hieudoanm.github.io/diagram`
2. `pnpm format --filter=@hieudoanm.github.io/diagram`
3. `pnpm test --filter=@hieudoanm.github.io/diagram`
4. `pnpm test:e2e --filter=@hieudoanm.github.io/diagram`
5. `pnpm build --filter=@hieudoanm.github.io/diagram`
