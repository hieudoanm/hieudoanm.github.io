# Architecture

## Goals

- Minimal clock utilities app that runs as a **web app** (browser), **desktop
  app** (Tauri), and **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support — all clock tools work offline
- Five apps: Pomodoro, Watchface, World Clock, Timer, Stopwatch
- Real-time weather integration via Open-Meteo API
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                             |
| ----------- | -------------------------------------- |
| Framework   | Next.js 16 (App Router, static export) |
| Language    | TypeScript 6 (strict)                  |
| Styling     | Tailwind CSS 4 + DaisyUI 5             |
| Icons       | react-icons (Fi set)                   |
| Desktop     | Tauri 2                                |
| Data Fetch  | TanStack React Query                   |
| Theme       | nothing theme (black, white, red)      |
| Testing     | Jest + Playwright                      |
| Linting     | ESLint + Prettier                      |
| Package Mgr | pnpm                                   |

## Directory Structure

```txt
src/
├── app/                  # App Router (pages + (info) route group)
│   ├── (info)/           # About, Downloads, Version
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home (default tab)
│   ├── template.tsx      # Page transition animation
│   ├── error.tsx         # Runtime error boundary
│   ├── not-found.tsx     # 404 page
│   └── global-error.tsx  # Global error boundary
├── components/
│   ├── atoms/            # ThemeToggle
│   ├── molecules/        # WeatherBadge, CityCard
│   ├── organisms/        # Pomodoro, Watchface, WorldClock, Timer,
│   │                     # Stopwatch, ClockTab, Header
│   └── templates/        # ClockApp, AboutTemplate, DownloadsTemplate,
│                         # VersionTemplate, ErrorTemplate
├── data/                 # timezones, weather, constants
├── lib/                  # pomodoro-utils, timer-utils, stopwatch-utils
└── styles/               # globals.css, base.css, themes.css
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Pages + route groups
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  ClockApp shell, About, Downloads
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  Pomodoro, Watchface, WorldClock,
│                                         │  Timer, Stopwatch, ClockTab, Header
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  WeatherBadge, CityCard
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  ThemeToggle
├─────────────────────────────────────────┤
│  Domain (lib/)                          │  pomodoro-utils, timer-utils,
│                                         │  stopwatch-utils
├─────────────────────────────────────────┤
│  Data (data/)                           │  timezones, weather, constants
└─────────────────────────────────────────┘
```

## Routing

| Route        | Page      | Client | Description             |
| ------------ | --------- | ------ | ----------------------- |
| `/`          | ClockApp  | Yes    | Tabbed clock shell      |
| `/about`     | About     | Yes    | Package info            |
| `/downloads` | Downloads | Yes    | Platform download links |
| `/version`   | Version   | Yes    | Version details         |
| `*`          | not-found | No     | 404 page                |
| `*`          | error     | Yes    | Runtime error boundary  |

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`)
- **Client Components** throughout — clock tools need `setInterval`,
  `requestAnimationFrame`, and browser audio APIs
- No server actions, no API routes — pure static

## Clock Apps

- **Pomodoro**: Work/break cycles with 3 presets (25/5, 50/10, 15/3). SVG
  circular progress, WebAudio beep for alerts. State persisted to localStorage.
- **Watchface**: Real-time analog/digital display with dot and minimal modes.
  RequestAnimationFrame for smooth rendering.
- **World Clock**: 14 timezone cities with Open-Meteo weather via TanStack
  Query. Search and favorites persisted to localStorage.
- **Timer**: 6 duration presets with countdown, pause/resume, audio alert.
  Centisecond precision.
- **Stopwatch**: Lap tracking with split/diff calculations. Centisecond
  precision via requestAnimationFrame.

## State Management

- **Local state** for active tab, watchface mode, and timer state
- **localStorage** for Pomodoro state, World Clock favorites, and preferences
- **TanStack React Query** for Open-Meteo weather API caching
- **WebAudio API** for timer/Pomodoro alerts

## Styling

- **Tailwind CSS 4** + **DaisyUI 5** with nothing theme (`data-theme="nothing"`)
- **nothing theme**: black (#000000), white (#ffffff), red (#ff0030) only
- Responsive: tab bar stacks vertically on mobile
- `ThemeToggle` component for light/dark switching
