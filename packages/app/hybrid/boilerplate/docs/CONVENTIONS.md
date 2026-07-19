# Conventions

## Naming

| Item             | Convention       | Example            |
| ---------------- | ---------------- | ------------------ |
| Components       | `PascalCase`     | `Spinner`, `Card`  |
| Hooks            | `camelCase`      | `useSWRegister`    |
| Utilities        | `camelCase`      | `formatDate`       |
| Constants        | `UPPER_SNAKE`    | `CACHE_NAME`       |
| Types/Interfaces | `PascalCase`     | `SpinnerProps`     |
| Files            | `PascalCase.tsx` | `Spinner.tsx`      |
| Test files       | `*.test.tsx`     | `Spinner.test.tsx` |

## File Structure

- One component per file
- Props type defined in the same file
- Test files colocated with source: `Component.tsx` + `Component.test.tsx`
- Barrel exports via `index.ts` per directory

## Imports

Absolute imports with `@/` alias:

```tsx
import { Spinner } from '@/components/atoms/Spinner';
import { useData } from '@/providers/DataProvider';
```

Group imports by origin:

1. External packages (`react`, `next`, `daisyui`)
2. Internal aliases (`@/...`)
3. Relative imports (`./`, `../`)

## Exports

- Named exports for components — `export const Spinner: FC<Props> = ...`
- Default exports only for page components in `src/app/`
- Barrel exports via `index.ts` for each component tier

## TypeScript

- `strict: true` in `tsconfig.json`
- Explicit return types on exported functions
- `interface` for object shapes, `type` for unions/primitives
- No `any` — use `unknown` and narrow
- `as const` for literal value arrays
- `satisfies` over raw type casts

## React

- Arrow functions for all components: `const X: FC<Props> = () => ...`
- Functional components only — no class components
- Hooks at the top level — never in conditionals or loops
- `useReducer` for complex state, `useState` for simple state
- Memoize with `React.memo`, `useMemo`, `useCallback` only when profiling shows
  a need

## CSS

- Tailwind utility classes — no custom CSS files
- `@apply` only for repeated base HTML patterns in `globals.css`
- DaisyUI classes for component variants (`btn`, `card`, `modal`)
- Dark mode via `data-theme` — not `dark:` prefix
- Responsive: `sm:`, `md:`, `lg:`, `xl:` prefixes

## Error Handling

- Explicit `if (err)` checks — never silently swallow errors
- Page-level: `error.tsx` and `global-error.tsx` boundaries
- Component-level: render fallback UI inline
- Form validation: validate at the boundary, show errors near the input

## Testing

- **Jest** for unit tests — `pnpm test`
- **Playwright** for E2E tests — `pnpm test:e2e`
- Test files colocated: `src/components/atoms/Spinner.test.tsx`
- Use `@testing-library/react` for component tests
- Use `@testing-library/user-event` for interaction tests
- Test behaviour, not implementation
- Arrange-Act-Assert pattern

## Git

- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`
- One logical change per commit
- Never commit secrets, keys, or `.env` files
- Run `pnpm lint` and `pnpm test` before committing

## Comments

- No comments unless requested
- Code should be self-documenting through naming
- Use `// TODO:` for temporary workarounds only
- Never leave commented-out code
