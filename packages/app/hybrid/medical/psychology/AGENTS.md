# Psychology

Validated psychological self-report scales: BDI-II, BFI, DAS, ECR-R, GAD-7,
PHQ-9, RCI and SWLS. Next.js 16 + React 19 + Tailwind CSS 4 (DaisyUI 5)
desktop/web app packaged with Tauri 2.

## Key Conventions

- Arrow functions for all function declarations and component exports
- `FC` type for components
- `@/*` path aliases
- DaisyUI component classes (`btn` + `btn-*`, `card`, `alert`, etc.)
- Dark theme as default (`data-theme="nothing"` on `<html>`)
- `prettier-plugin-tailwindcss` for class sorting
- Atomic design: atoms → scales → templates
- Each scale is a self-contained folder: `index.tsx` (wizard), `items.ts` /
  `utils.ts` (pure data + scoring, zero UI imports), `components/` (steps),
  `docs/` (instrument reference)
- Every scale component receives `onClose: () => void`; pages wire it to
  `router.push('/')` inside a `ToolTemplate`
- Scoring is pre-keyed in data (option values / `reverse` flags), never
  recomputed in components
- Scales are screening instruments, not diagnostics — result steps carry the
  appropriate disclaimer
- `console.*` stripped in production via `compiler.removeConsole`

## Commands

```bash
pnpm dev      # Next.js dev server (Turbopack)
pnpm build    # Static export to out/
pnpm test     # Jest unit tests (--passWithNoTests)
pnpm test:e2e # Playwright e2e tests
pnpm lint     # ESLint with fixes
pnpm format   # Prettier
pnpm tauri dev|build # Desktop app via Tauri CLI
```

## Structure

```
src/app/            # App Router pages — one route per scale + info routes
src/components/
  atoms/            # Button, Badge, OfflineBadge
  scales/           # The eight self-report instruments
  templates/        # HomeTemplate, ToolTemplate, About/Downloads/Version/ErrorTemplate
src/hooks/          # useOffline, useSWRegister, useUpdater
src/lib/native/     # isTauri / notification helpers
src/providers/      # SWProvider, NativeProvider
src/styles/         # globals.css (tailwind), base.css, themes.css
src-tauri/          # Tauri shell (updater + dialog + notification plugins)
public/             # manifest.json, sw.js, icons
e2e/                # Playwright specs
```

## Routes

One route per scale under `/` (e.g. `/satisfaction-with-life`) plus `/about`,
`/downloads`, `/version`.
