# Eyes

Visual acuity charts for vision screening: Snellen, LogMAR and Tumbling E.
Next.js 16 + React 19 + Tailwind CSS 4 (DaisyUI 5) desktop/web app packaged with
Tauri 2.

## Key Conventions

- Arrow functions for all function declarations and component exports
- `FC` type for components
- `@/*` path aliases
- DaisyUI component classes (`btn` + `btn-*`, `card`, `modal`, etc.)
- Dark theme as default (`data-theme="nothing"` on `<html>`)
- `prettier-plugin-tailwindcss` for class sorting
- Atomic design: atoms → charts → templates
- Chart letter/direction randomisation lives in each chart's `utils/`
  (`generateChart`, `randomLetters`, `randomDirections`) — pure functions
- Each chart component receives `onClose: () => void`; route pages wire it to
  `router.push('/')`
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
src/app/            # App Router pages (+ info routes, error shells)
src/components/
  atoms/            # Button, Badge, OfflineBadge
  charts/           # SnellenChart, LogMARChart, TumblingEChart
  templates/        # HomeTemplate, About/Downloads/Version/ErrorTemplate
src/hooks/          # useOffline, useSWRegister, useUpdater
src/lib/native/     # isTauri / notification helpers
src/providers/      # SWProvider, NativeProvider
src/styles/         # globals.css (tailwind), base.css, themes.css
src-tauri/          # Tauri shell (updater + dialog + notification plugins)
public/             # manifest.json, sw.js, icons
e2e/                # Playwright specs
```

## Routes

- `/` — home listing the three charts
- `/snellen`, `/logmar`, `/tumbling-e` — fullscreen chart modals
- `/about`, `/downloads`, `/version` — info pages
