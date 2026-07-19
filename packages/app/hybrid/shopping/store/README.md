# Store

Apps Store — Browse and download apps across all platforms.

## Features

- **OS Detection** — Automatically detects macOS, Windows, Linux, Android, and
  iOS
- **Recommended Downloads** — Suggests the most suitable download for your
  platform
- **App Details** — Full detail page for each app with all download options
- **Search & Filter** — Search by name/description, filter by All / Hybrid /
  Native
- **Nothing Theme** — OLED-black dark theme with red accent

## Tech Stack

| Layer      | Technology                       |
| ---------- | -------------------------------- |
| Framework  | Next.js 16 (App Router)          |
| Language   | TypeScript 6                     |
| Styling    | Tailwind CSS 4 + DaisyUI 5       |
| Theme      | Nothing (custom DaisyUI)         |
| Desktop    | Tauri 2                          |
| Unit Tests | Jest 30                          |
| E2E Tests  | Playwright                       |
| Build      | Static Export (`output: export`) |

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `pnpm dev`      | Start development server   |
| `pnpm build`    | Build for production       |
| `pnpm start`    | Start production server    |
| `pnpm lint`     | Lint and auto-fix          |
| `pnpm format`   | Format with Prettier       |
| `pnpm test`     | Run unit tests             |
| `pnpm test:e2e` | Run E2E tests (Playwright) |
| `pnpm tauri`    | Tauri desktop commands     |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Header, nothing theme)
│   ├── page.tsx                # Home page (grid, search, filter)
│   ├── not-found.tsx           # 404 page
│   ├── error.tsx               # Error boundary
│   ├── loading.tsx             # Loading spinner
│   ├── app/[slug]/page.tsx     # App detail page
│   └── (info)/
│       ├── about/page.tsx      # About page
│       └── version/page.tsx    # Version / changelog
├── components/
│   ├── organisms/Header.tsx    # Sticky header with nav + theme toggle
│   ├── templates/              # Reusable page templates
│   ├── StoreCard.tsx           # App card component
│   ├── AppPage.tsx             # Detail page component
│   └── AppInfo.tsx             # Detail view component
├── data/
│   ├── downloads.json          # App catalog
│   ├── csv/                    # Source data (per-section CSV files)
│   └── scripts/                # CSV → JSON converter
├── lib/
│   ├── os.ts                   # OS detection utilities
│   └── downloads.ts            # Data parser with platform logic
└── styles/
    ├── globals.css             # Tailwind imports
    ├── base.css                # Base styles
    └── themes.css              # Nothing theme definition
```
