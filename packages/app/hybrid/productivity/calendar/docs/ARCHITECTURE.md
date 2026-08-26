# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Multiple calendar views: 3-day, daily, weekly, monthly, quarterly, half, yearly
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                         |
| ----------- | ---------------------------------- |
| Framework   | Next.js 14 (App Router)            |
| Language    | TypeScript (strict)                |
| Styling     | Tailwind CSS 3 + DaisyUI 4         |
| Desktop     | Tauri 2                            |
| Testing     | Jest + Playwright                  |
| Linting     | ESLint + Prettier                  |
| Package Mgr | pnpm                               |

## Directory Structure

```txt
src/
├── app/                # App Router pages and layouts
│   ├── (info)/         # Info route group (about, downloads, version)
│   ├── page.tsx        # Home — calendar app
│   ├── layout.tsx      # Root layout
│   └── *.tsx           # Error boundaries, loading, etc.
├── components/         # Atomic design components
│   ├── calendar/       # Calendar feature module
│   │   ├── CalendarApp.tsx      # Main app with view switcher
│   │   ├── constants.ts         # Date helpers, View enum
│   │   └── components/          # View components
│   │       ├── Dot.tsx          # GitHub-style activity dot
│   │       ├── Weekday.tsx      # Day-of-week header
│   │       ├── DailyView.tsx    # Full-year day grid
│   │       ├── WeeklyView.tsx   # Month-by-month week grid
│   │       ├── MonthlyView.tsx  # 12-month dot grid
│   │       ├── QuarterlyView.tsx # Quarterly + half views
│   │       ├── ThreeDayView.tsx # Yesterday/today/tomorrow
│   │       ├── YearlyView.tsx   # Year overview
│   │       └── MonthCalendar.tsx # Traditional monthly calendar
│   ├── organisms/      # Header
│   └── templates/      # AboutTemplate, DownloadsTemplate, etc.
├── data/               # Calendar events, months, years
├── lib/                # Fonts (Inter, JetBrains Mono, Lora)
└── styles/             # Global CSS (Tailwind, themes, base)
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  Page-level layout shells
├─────────────────────────────────────────┤
│  Calendar (components/calendar/)        │  7 calendar views
│    ├── CalendarApp.tsx                  │    View switcher + year navigation
│    ├── ThreeDayView.tsx                 │    Yesterday/today/tomorrow
│    ├── DailyView.tsx                    │    GitHub-style year grid
│    ├── WeeklyView.tsx                   │    Month-by-month weeks
│    ├── MonthlyView.tsx                  │    12-month dot grid
│    ├── QuarterlyView.tsx                │    Quarterly + half views
│    ├── YearlyView.tsx                   │    Year overview with labels
│    └── MonthCalendar.tsx                │    Traditional monthly with nav
├─────────────────────────────────────────┤
│  Data (data/)                           │  Events, months, years
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind, DaisyUI, nothing theme
└─────────────────────────────────────────┘
```

## Routing

| Route            | Page                            | Client | Description            |
| ---------------- | ------------------------------- | ------ | ---------------------- |
| `/`              | `page.tsx`                      | Yes    | Home — calendar app    |
| `/about/`        | `(info)/about/page.tsx`         | No     | About page             |
| `/downloads/`    | `(info)/downloads/page.tsx`     | No     | Downloads page         |
| `/version/`      | `(info)/version/page.tsx`       | No     | Version page           |
| `*`              | `not-found.tsx`                 | No     | 404 page               |
| `*`              | `error.tsx`                     | Yes    | Runtime error boundary |

## Calendar Views

| View       | Component        | Description                              |
| ---------- | ---------------- | ---------------------------------------- |
| 3-Day      | ThreeDayView     | Yesterday, today, tomorrow cards         |
| Daily      | DailyView        | Full-year grid (GitHub-style dots)       |
| Weekly     | WeeklyView       | Month-by-month week grid                 |
| Monthly    | MonthCalendar    | Traditional calendar with navigation     |
| Quarterly  | QuarterlyView    | 4 quarterly dot rows                     |
| Half       | HalfView         | 2 half-year dot rows                     |
| Yearly     | YearlyView       | 12-month labeled overview                |

## Rendering Strategy

- Static export (`output: 'export'` in next.config.js) — all pages rendered at
  build time
- Client Components — home page and calendar app marked with `"use client"`
- No server actions, no API routes — pure static

## State Management

- Local state with `useState` — component-scoped in CalendarApp
- Year, view, and weekday toggle managed in CalendarApp
- Month navigation managed in MonthCalendar sub-component

## Styling

- Tailwind CSS 3 with PostCSS plugin
- DaisyUI 4 for component classes (`btn`, `card`, `select`, `badge`)
- Dark theme via `data-theme="nothing"` on `<html>`
- Consistent colour scheme: `bg-base-100`, `text-primary`, `bg-base-200`
