# Contributing

## Setup

```bash
pnpm install # repo root
pnpm dev     # dev server on :3000
```

## Commands

| Command         | Purpose                                   |
| --------------- | ----------------------------------------- |
| `pnpm dev`      | Next.js dev server (Turbopack)            |
| `pnpm build`    | Static export to `out/`                   |
| `pnpm test`     | Jest unit tests (pass-with-no-tests)      |
| `pnpm test:e2e` | Playwright end-to-end tests               |
| `pnpm lint`     | ESLint with auto-fix                      |
| `pnpm format`   | Prettier                                  |
| `pnpm tauri`    | Tauri CLI (desktop build, icon gen, etc.) |

## Coding Conventions

- Arrow functions, `FC` type for components, `@/*` aliases
- DaisyUI component classes over bespoke CSS; theme tokens (`primary`,
  `secondary`, ...) from `themes.css`, no hardcoded colors
- Tools are self-contained components under `src/components/organisms/`; pages
  in `src/app/(app)/<tool>/` stay thin and only compose a tool plus a heading
- Pure color math lives in `src/lib/colors.ts` (no React); components never
  reimplement conversions
- Explicit types at boundaries; prefer interfaces for object shapes
- No comments unless explaining a non-obvious invariant

## Testing Conventions

- Unit tests colocate in a `__tests__/` directory, one `*.test.ts(x)` per unit
- E2E specs live in `e2e/` and are written with Playwright against the running
  dev server; assert user-visible output via accessible queries and
  `data-testid` on tool cards
- Name tests as behaviour specs

## Docs

Update `docs/` when shipping features: bump `ROADMAP.md` and refresh
`DOWNLOADS.md`/`PACKAGING.md` as needed.
