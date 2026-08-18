# Lingo

Duolingo-style language learning: flashcards, dictionary and sign-language
recognition. Next.js 16 + React 19 + Tailwind CSS 4 (DaisyUI 5) desktop/web app
packaged with Tauri 2.

## Documentation

Reference docs live in `docs/`:

| Doc                    | Covers                                                     |
| ---------------------- | ---------------------------------------------------------- |
| `docs/ARCHITECTURE.md` | Tech stack, directory structure, routing, state management |
| `docs/FEATURES.md`     | Feature inventory with progress tracking                   |
| `docs/ROADMAP.md`      | Phased feature roadmap                                     |
| `docs/CONTRIBUTING.md` | Setup, dev commands, coding and testing conventions        |
| `docs/PACKAGING.md`    | Packaging checklist per platform                           |
| `docs/DOWNLOADS.md`    | Download links per platform (generated)                    |

## Key Conventions

- Arrow functions for all function declarations and component exports
- `FC` type for components
- `@/*` path aliases
- DaisyUI component classes (`btn` + `btn-*`, `card`, `badge`, etc.)
- Light theme as default (`data-theme="lingo"` on `<html>`), toggleable with
  `lingo-dark`; persisted in localStorage under `lingo:theme`
- `prettier-plugin-tailwindcss` for class sorting
- Atomic design: atoms → features → templates
- Each feature is a self-contained folder under `src/components/features/`:
  `index.tsx` (UI) and `utils.ts` (pure data + logic, zero UI imports)
- Features are standalone — no `onClose` prop; pages render them directly
- Progress (XP + streak) lives in IndexedDB via `src/lib/progress.ts`; scoring
  is pure (`applyActivity`) and never recomputed in components
- Static assets are fetched at runtime from `public/data/` and `public/models/`
  through `src/lib/publicPaths.ts`, which respects the web deployment's
  `BASE_PATH`
- `console.*` stripped in production via `compiler.removeConsole`

## Commands

```bash
pnpm dev           # Next.js dev server (Turbopack)
pnpm build         # Static export to out/
pnpm test          # Jest unit tests (80% coverage thresholds)
pnpm test:e2e      # Playwright e2e tests
pnpm lint          # ESLint with fixes
pnpm format        # Prettier
pnpm tauri dev|build # Desktop app via Tauri CLI
```

## Structure

```
src/app/            # App Router pages — /flashcards /english /sign + info routes
src/components/
  atoms/            # Button, Badge, OfflineBadge, ThemeToggle
  features/         # flashcards, english, sign
  templates/        # HomeTemplate, About/Downloads/Version/ErrorTemplate
src/hooks/          # useTheme, useProgress, useOffline, useSWRegister, useUpdater
src/lib/            # progress (IndexedDB), native bridge, publicPaths
src/providers/      # SWProvider, NativeProvider, QueryProvider
src/styles/         # globals.css (tailwind), base.css, themes.css
src-tauri/          # Tauri shell (updater + dialog + notification plugins)
public/             # manifest.json, sw.js, icons, data/words.json, models/sign-model.onnx
e2e/                # Playwright specs
```

## Routes

`/` (home hub), `/flashcards`, `/english`, `/sign` plus `/about`, `/downloads`,
`/version`.
