# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Atomic design system for reusable UI
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                         |
| ----------- | ---------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack) |
| Language    | TypeScript 6 (strict)              |
| Styling     | Tailwind CSS 4 + DaisyUI 5         |
| Icons       | react-icons (Fi set)               |
| Desktop     | Tauri 2                            |
| Testing     | Jest + Playwright                  |
| Linting     | ESLint 10 + Prettier               |
| Package Mgr | pnpm                               |
| Data        | Mock data with IndexedDB           |

## Directory Structure

```txt
src/
├── app/                # App Router pages and layouts
├── components/         # Atomic design components
│   ├── atoms/          # PlayButton, VolumeSlider, TimeBadge, Thumbnail
│   ├── molecules/      # VideoCard, PlaylistItem, CommentEntry, PlayerBar
│   ├── organisms/      # Sidebar, VideoPlayer, PlaylistGrid, CommentSection
│   └── templates/      # PlayerTemplate, SettingsTemplate
│   └── RouteGuard.tsx  # Auth route protection
├── data/               # Mock videos, playlists, channels, comments
├── hooks/              # usePlayer, usePlaylist, useVideo, useProgress
├── lib/                # IndexedDB wrapper (db.ts)
├── providers/          # DataProvider, Providers, ToastProvider
├── styles/             # globals.css (Tailwind + DaisyUI)
├── types/              # TypeScript interfaces
└── utils/              # formatDuration, formatViews, formatTimestamp
src-tauri/              # Tauri desktop (Rust)
e2e/                    # Playwright E2E tests
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  Page-level layout shells
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  Sidebar, VideoPlayer, PlaylistGrid
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  VideoCard, PlaylistItem, PlayerBar
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  PlayButton, VolumeSlider, TimeBadge
├─────────────────────────────────────────┤
│  Providers (providers/)                 │  DataProvider, ToastProvider
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

| Route        | Page           | Client | Description                           |
| ------------ | -------------- | ------ | ------------------------------------- |
| `/`          | `page.tsx`     | Yes    | Home — featured, trending, recent     |
| `/watch`     | Video Player   | Yes    | Playback with controls (via `?id=`)   |
| `/library`   | Library        | Yes    | Watch history, saved, downloads       |
| `/playlists` | Playlists      | Yes    | All playlists, create new             |
| `/search`    | Search         | Yes    | Full-text search with filters         |
| `/channels`  | Channels       | Yes    | Channel list and subscriptions        |
| `/channel`   | Channel Detail | Yes    | Videos, playlists, about (via `?id=`) |
| `/upload`    | Upload         | Yes    | Upload flow (mock)                    |
| `/settings`  | Settings       | Yes    | Theme, playback, notification prefs   |
| `/profile`   | Profile        | Yes    | User info, watch history              |
| `/version`   | Version        | Yes    | Build version display                 |

Pass entity IDs via `useSearchParams()` — e.g. `/watch?id=123`.

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Client Components** marked with `"use client"` — all pages require IndexedDB
  access and interactive video playback
- No server actions, no API routes — pure static with local persistence

## State Management

- **IndexedDB** for persistent state — videos, playlists, channels, watch
  history, settings stored in `video-db`
- **Local state** with `useState` / `useReducer` — player and UI state
- **DataProvider** context wraps the app — manages data access layer
- **Optimistic UI** — playlist edits apply instantly, persist in background

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `modal`, `badge`, etc.)
- **32 DaisyUI themes** — dark mode default (`data-theme="night"`)
- **Global base styles** in `src/styles/globals.css`

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
- Service worker (`SWProvider`) for offline caching
- PWA manifest for installability
- Mock delay via `NEXT_PUBLIC_MOCK_DELAY` (default 800ms)
