# Store

Apps Store — browse and download all hybrid and native apps. OS detection,
recommended downloads, and detail pages. Next.js 16 + React 19 + Tailwind CSS 4
(DaisyUI 5) desktop/web app packaged with Tauri 2.

## Documentation

Reference docs live in `docs/`:

| Doc                    | Covers                                                     |
| ---------------------- | ---------------------------------------------------------- |
| `docs/ARCHITECTURE.md` | Tech stack, directory structure, routing, state management |
| `docs/ROADMAP.md`      | Phased feature roadmap with progress tracking              |
| `docs/CONTRIBUTING.md` | Setup, dev commands, coding and testing conventions        |
| `docs/PACKAGING.md`    | Packaging checklist per platform                           |
| `docs/DOWNLOADS.md`    | Download links per platform                                |
| `docs/FEATURES.md`     | Feature descriptions and capabilities                      |

## Key Conventions

- Arrow functions for all function declarations and component exports
- `FC` type for components
- `@/*` path aliases
- DaisyUI component classes (`btn`, `card`, `badge`, `input`, `join`)
- Dark theme as default (`data-theme="nothing"` on `<html>`)
- `prettier-plugin-tailwindcss` for class sorting
- Emoji icons via `StoreCard`'s `ICON_EMOJI` map (no runtime icon library)
- OS detection is client-only — always wrapped in `useEffect`
- `parseDownloads()` converts raw JSON sections to `AppData[]`
- `generateStaticParams` required for all dynamic routes (`output: export`)
- Store has its own copy of `downloads.json` / `downloads.csv` (not
  cross-package)

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
src/app/                # App Router pages (44 app detail pages + info routes)
src/components/
  organisms/            # Header
  templates/            # About/Version/NotFound/Error templates
  StoreCard.tsx         # App card component
  AppPage.tsx           # Detail page wrapper
  AppInfo.tsx           # Detail view component
src/data/
  downloads.json        # App catalog (44 apps)
  downloads.csv         # Source data
  scripts/              # CSV → JSON converter
src/lib/
  os.ts                 # Platform detection
  downloads.ts          # Data parser with platform logic
src/styles/             # globals.css, base.css, themes.css
public/                 # manifest.json, sw.js
e2e/                    # Playwright specs
```

## Routes

- `/` — home with search, filter tabs, app grid
- `/app/[slug]` — app detail page (44 static pages)
- `/about` — about the store
- `/version` — changelog
