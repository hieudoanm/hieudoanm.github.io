# Contributing

Thanks for contributing to **Psychology**, a hybrid collection of validated
self-report psychological scales (BDI-II, BFI, DAS, ECR-R, GAD-7, PHQ-9, RCI-R,
SWLS) that ships as a web app (browser) and desktop app (Tauri).

## Getting Started

1. **Prerequisites**: Node.js (see `.nvmrc` at the repo root), `pnpm`, and a
   Rust toolchain for Tauri.
2. **Install dependencies** from the workspace root:

   ```bash
   pnpm install
   ```

3. **Run this app**:

   ```bash
   pnpm dev --filter=@hieudoanm.github.io/psychology
   ```

## Development Commands

| Task       | Command                                                   |
| ---------- | --------------------------------------------------------- |
| Dev server | `pnpm dev --filter=@hieudoanm.github.io/psychology`       |
| Build      | `pnpm build --filter=@hieudoanm.github.io/psychology`     |
| Lint       | `pnpm lint --filter=@hieudoanm.github.io/psychology`      |
| Format     | `pnpm format --filter=@hieudoanm.github.io/psychology`    |
| Unit tests | `pnpm test --filter=@hieudoanm.github.io/psychology`      |
| E2E tests  | `pnpm test:e2e --filter=@hieudoanm.github.io/psychology`  |
| Desktop    | `pnpm tauri --filter=@hieudoanm.github.io/psychology dev` |

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
3. **Self-documenting identifiers** — `computeBdiScore(responses)` needs no
   comment.
4. **DRY** — when a pattern repeats, centralize it.
5. **Small, focused files** — functions ≤ 30 lines, files ≤ 200 lines.
6. **Explicit error handling** — check errors and fail loudly.
7. **Test names as documentation** —
   `it("flips reverse-keyed items before summing")`.
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
2. Mark files `"use client"` only when they need interactivity or hooks — scale
   routes are client pages.
3. Use `loading.tsx`, `error.tsx`, `not-found.tsx` file conventions.
4. Use `next/link` for client-side navigation.

### Styling

1. Use Tailwind utility classes; compose, don't write custom CSS.
2. Use DaisyUI component classes (`btn`, `card`, `badge`, `modal`, `progress`).
3. Dark theme is the default (`data-theme="nothing"`).
4. `prettier-plugin-tailwindcss` sorts classes — keep class order consistent.
5. Use `react-icons` Phosphor (`Pi`) set for domain icons.

## Scale Conventions

- Atomic design: `atoms/` → `scales/` → `templates/`
- Each scale is self-contained under `src/components/scales/<ScaleName>/`:
  `index.tsx` (wizard UI inside `ToolTemplate`), `constants.ts` (items +
  response options + reverse-key metadata), `types.ts`, `utils.ts` (pure
  scoring + interpretation), plus `__tests__/`
- **All scoring logic lives in `utils` as pure functions** — no DOM types, no UI
  imports; every band boundary and reverse-key flip is unit-tested directly
- Every scale component receives `onClose: () => void`; route pages wire it to
  `router.push('/')`
- Wizard steps render through the shared step components with a progress bar;
  results render through `ResultsStep`
- Safety-relevant items (BDI-II item 9, PHQ-9 item 9) must surface the
  crisis-resources alert in `ResultsStep` — never remove or soften this path
- Interpretation bands must match the published manuals; cite the band ranges in
  test names when adding a scale

## Testing Conventions

### Unit tests (Jest)

Break tests into small per-file suites — one `*.test.ts` / `*.test.tsx` per unit (component, page, hook, util, provider), colocated in a `__tests__/` directory; never merge multiple units into one file. App pages are tested under `src/app/__tests__/` and route-group pages (`(app)`, `(info)`) colocate `__tests__/page.test.tsx` in the same folder.

1. Test behaviour, not implementation.
2. Use Arrange-Act-Assert.
3. Keep tests isolated — each test manages its own state.
4. Cover boundary conditions (every band edge, minimum/maximum totals,
   reverse-keyed zeros) alongside happy paths.
5. Drive wizard UIs by role-based queries and click-throughs, not internals.
6. Maintain ≥80% coverage on statements, branches, functions, and lines —
   enforced by `coverageThreshold` in `jest.config.ts`.

### E2E tests (Playwright)

1. Use `getByRole` / `getByTestId` over raw CSS/XPath.
2. Assert on user-visible state (`toBeVisible`, `toHaveURL`).
3. Cover the home → scale → close flow and the 404 route (`e2e/home.spec.ts`).

## Before You Push

1. `pnpm lint --filter=@hieudoanm.github.io/psychology`
2. `pnpm format --filter=@hieudoanm.github.io/psychology`
3. `pnpm test --filter=@hieudoanm.github.io/psychology`
4. `pnpm test:e2e --filter=@hieudoanm.github.io/psychology`
5. `pnpm build --filter=@hieudoanm.github.io/psychology`
