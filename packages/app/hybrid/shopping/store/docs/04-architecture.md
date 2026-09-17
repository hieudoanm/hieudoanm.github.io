# Architecture

## Overview

Apps Store — a catalog of all hybrid and native apps with OS detection,
recommended downloads, and detail pages. Uses a "nothing" dark theme (OLED
black + red accent).

## Goals

- Display all apps (hybrid, native) with emoji icons
- Auto-detect OS (macOS, Windows, Linux, Android, iOS) via `navigator.userAgent`
- Recommend the best download for the current platform
- Detail page per app with all download options
- Search and filter by All / Hybrid / Native
- Offline-first with service worker cache

## Tech Stack

| Layer      | Technology                       |
| ---------- | -------------------------------- |
| Framework  | Next.js 16 (App Router)          |
| Language   | TypeScript 6                     |
| Styling    | Tailwind CSS 4 + DaisyUI 5       |
| Theme      | Nothing (OLED black + red)       |
| Desktop    | Tauri 2                          |
| Unit Tests | Jest 30                          |
| E2E Tests  | Playwright                       |
| Build      | Static Export (`output: export`) |

## Directory Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Header, nothing theme)
│   ├── page.tsx                # Home page (grid, search, filter)
│   ├── default.tsx             # Default page (no-op)
│   ├── template.tsx            # Page transition animation
│   ├── error.tsx               # Error boundary
│   ├── global-error.tsx        # Global error boundary
│   ├── not-found.tsx           # 404 page
│   ├── forbidden.tsx           # 403 page
│   ├── unauthorized.tsx        # 401 page
│   ├── loading.tsx             # Loading spinner
│   ├── app/[slug]/page.tsx     # App detail page
│   └── (info)/
│       ├── about/page.tsx      # About page
│       └── version/page.tsx    # Version / changelog
├── components/
│   ├── organisms/
│   │   └── Header.tsx          # Sticky header with nav + theme toggle
│   ├── templates/
│   │   ├── AboutTemplate.tsx   # About page template
│   │   ├── VersionTemplate.tsx # Changelog template
│   │   ├── NotFoundTemplate.tsx# 404 template
│   │   └── ErrorTemplate.tsx   # Error template
│   ├── StoreCard.tsx           # App card component
│   ├── AppPage.tsx             # Detail page wrapper
│   └── AppInfo.tsx             # Detail view component
├── data/
│   ├── downloads.json          # App catalog (57 apps)
│   ├── csv/
│   │   ├── hybrid.csv          # C-shaped hybrid apps
│   │   ├── native.csv          # Native Android + macOS apps
│   │   ├── clis.csv            # Command-line tools
│   │   └── extensions.csv      # Browser extensions
│   └── scripts/
│       └── convert-csv-to-json.ts  # CSV → JSON converter
├── lib/
│   ├── os.ts                   # OS detection (Platform, detectPlatform)
│   └── downloads.ts            # Data parser with platform logic
└── styles/
    ├── globals.css             # Tailwind imports
    ├── base.css                # Base styles
    └── themes.css              # Nothing theme definition
```

## Routing Table

| Route         | Type   | Description                       |
| ------------- | ------ | --------------------------------- |
| `/`           | SSG    | Home page with search/filter/grid |
| `/app/[slug]` | SSG    | App detail page (44 static pages) |
| `/about`      | Static | About the store                   |
| `/version`    | Static | Changelog                         |
| `/_not-found` | Static | 404 page                          |

## Rendering Strategy

- **Static Export** — `output: 'export'` in `next.config.ts` generates pure
  HTML/CSS/JS
- **generateStaticParams** — Pre-generates all 44 app detail pages at build time
- **Client Components** — `StoreCard`, `AppPage`, `AppInfo` use `'use client'`
  for interactivity
- **Server Components** — Layout, detail page shell, info pages are
  server-rendered

## Data Flow

```
downloads.json
  → parseDownloads()        # converts raw sections to AppData[]
    → ALL_APPS              # flat list of 44 apps
      → matchesQuery()      # search filter
      → getRecommendedDownload()  # platform-specific recommendation
        → StoreCard         # renders card with emoji icon
        → AppInfo           # renders detail view with all downloads
```

## State Management

- **Local state only** — `useState` for search query, active section, detected
  platform
- **useDeferredValue** — Debounces search input for smooth filtering
- **useMemo** — Memoizes filtered apps, section tabs, grouped sections
- **useEffect** — Client-only OS detection (avoids hydration mismatch)

## Styling

- **Nothing theme** — OLED black (`#000000`) + red accent (`#ff0030`)
- **DaisyUI 5** — Component library (cards, buttons, badges, inputs)
- **Tailwind CSS 4** — Utility-first styling
- **Font** — `font-mono` throughout for monospace aesthetic
- **Theme toggle** — Nothing (dark) ↔ Winter (light) via `data-theme` attribute

## Icons

- Emoji-based icons mapped from Phosphor icon names to emoji in `StoreCard.tsx`
- No external icon library loaded at runtime
- Fallback: `📦` for unknown icon names

## Performance

- Static export eliminates server runtime
- `useDeferredValue` prevents search jank
- `useMemo` avoids recalculating filters on every render
- Service worker (`sw.js`) caches static assets for offline use
- No client-side data fetching — all data embedded at build time
