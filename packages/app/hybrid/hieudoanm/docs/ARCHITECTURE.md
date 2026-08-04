# Architecture

## Goals

- Personal app portal that runs as a **web app** (browser), **desktop app**
  (Tauri), and **mobile app** (Tauri Mobile)
- A single hub hosting a suite of 90+ focused mini-apps organized by category
- Static export for offline-first PWA support
- Local-first data: SQLite seeds served as static files, IndexedDB at runtime
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                             |
| ----------- | -------------------------------------- |
| Framework   | Next.js 16 (App Router, static export) |
| Language    | TypeScript 6 (strict)                  |
| Styling     | Tailwind CSS 4 + DaisyUI 5             |
| Icons       | react-icons (Fi set)                   |
| Desktop     | Tauri 2                                |
| Data        | SQLite (Prisma schema) + IndexedDB     |
| ML          | ONNX models (web workers)              |
| Testing     | Jest + Playwright                      |
| Linting     | ESLint + Prettier                      |
| Package Mgr | pnpm                                   |

## Directory Structure

```txt
src/
├── app/                # App Router pages ((products), (system) groups)
├── components/
│   ├── atoms/          # Smallest building blocks
│   ├── molecules/      # Combinations of atoms
│   ├── organisms/      # Complex UI sections
│   ├── templates/      # Page-level layouts
│   └── routes/         # Route-level components
│       ├── apps/       # Mini-app portal (16 categories)
│       ├── downloads/  # Downloads hub
│       ├── games/      # Games
│       ├── resume/     # Resume
│       ├── settings/   # App settings
│       ├── start/      # Start / home
│       └── version/    # Build version
├── prisma/             # SQLite schema (Prisma)
├── public/
│   ├── audio/          # Music/game audio samples
│   ├── db/             # SQLite seed files (chess.db, hieudoanm.db)
│   ├── models/         # ONNX models (invoice-parser, sign-model)
│   └── workers/        # pdf.worker.min.js
├── scripts/            # bookmarks, currency generation
└── src-tauri/          # Tauri desktop (Rust)
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  (products) and (system) groups
├─────────────────────────────────────────┤
│  Route components (routes/)             │  apps, downloads, games, resume
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  Page-level layout shells
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  Headers, navbars, app grids
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  Cards, modals, forms
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  Buttons, badges, inputs
├─────────────────────────────────────────┤
│  Data layer (public/db, scripts/)       │  SQLite seeds, static assets
└─────────────────────────────────────────┘
```

## Routing

| Route        | Page      | Client | Description                        |
| ------------ | --------- | ------ | ---------------------------------- |
| `/`          | Start     | Yes    | Home / launch page                 |
| `/apps`      | Apps      | Yes    | Mini-app portal with 16 categories |
| `/games`     | Games     | Yes    | Games (e.g. chess)                 |
| `/downloads` | Downloads | Yes    | Downloadable assets                |
| `/resume`    | Resume    | Yes    | Resume display                     |
| `/settings`  | Settings  | Yes    | App preferences                    |
| `/version`   | Version   | Yes    | Build version, copy to clipboard   |
| `*`          | Error     | -      | 404 / error boundaries             |

Mini-apps live under the Apps portal and are indexed by category; each app is a
self-contained route component in `routes/apps/<category>/<app>`.

## Apps Portal

The portal hosts 90+ mini-apps across 16 categories:

| Category                  | Example apps                                                     |
| ------------------------- | ---------------------------------------------------------------- |
| Bored                     | Build, Develop, Research, Ship, VibeSlotCode                     |
| Calculator                | Calculator, Inflation, SplitBill, Tax                            |
| Clocks                    | Countdown, Cron, DaysCount, EpochConvert, Pomodoro               |
| Data (CSV/JSON/XML/Excel) | CSV-to-JSON, CSV-to-Excel, JSON tools                            |
| Developer                 | Figlet, IP, OpenAPI2Postman, Proxy, TextDiff, UUID               |
| Editors                   | Text / markdown editing tools                                    |
| Education                 | Learning utilities                                               |
| Health & Vision           | Health / vision tools                                            |
| Psychology                | BDI, GAD-7, Big Five, Dyadic Adjustment, etc.                    |
| Text Convert              | Braille, LeetSpeak, Morse, TextCase                              |
| Utilities                 | Clipboard, Colors, CreateZip, Emojis, LoremIpsum, ScreenRecorder |
| Visualization             | Data visualization tools                                         |

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`)
- **Server Components** by default; **Client Components** marked with
  `"use client"` for interactive mini-apps
- Mini-apps are lazy-loaded to keep the initial bundle small
- No server actions — pure static; heavy processing (PDF, ONNX) runs in web
  workers

## State Management

- **Local state** with `useState` / `useReducer` within each mini-app
- **No global store** — apps stay self-contained and isolated
- Context providers used only where shared chrome requires it

## Data & Persistence

- **SQLite seed files** (`public/db/*.db`) generated by Prisma schema and served
  as static assets
- **ONNX models** (`public/models/*.onnx`) loaded via web workers for local ML
  inference (invoice parsing, signatures)
- **IndexedDB** used at runtime where app state needs persistence
- **Scripts** (`scripts/`) generate bookmarks and currency datasets at build
  time

## Styling

- **Tailwind CSS 4** + **DaisyUI 5** (dark default via `data-theme="night"`)
- **Base styles** in `globals.css` via `@layer base`
- Consistent component classes (`btn`, `card`, `badge`) across all mini-apps

## Performance

- Static export — zero server runtime, CDN-deployable
- Lazy-loaded mini-apps with code splitting
- Web workers for heavy ML/PDF processing keep the UI responsive
- `removeConsole` strips `console.*` in production
- Service worker (`useSWRegister`) + PWA manifest for offline caching
