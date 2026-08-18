# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Minimal point of sale interface for processing transactions
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

## Directory Structure

```txt
src/
├── app/              # App Router pages and layouts
│   ├── (app)/        # Main app route group
│   ├── (info)/       # Info pages (about, downloads, version)
│   ├── error.tsx     # Runtime error boundary
│   ├── global-error.tsx  # Root-level error boundary
│   ├── layout.tsx    # Root layout
│   └── not-found.tsx # 404 page
├── components/       # Atomic design components
│   └── templates/    # AboutTemplate, DownloadsTemplate, ErrorTemplate,
│                     # NotFoundTemplate, VersionTemplate
└── styles/           # Global CSS (Tailwind base layer)
    ├── globals.css   # Entry point
    ├── base.css      # Base layer resets
    └── themes.css    # DaisyUI theme config
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  Page-level layout shells
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

Flat routes with route groups — no dynamic `[id]` or `[slug]` segments.

| Route        | Page                        | Client | Description               |
| ------------ | --------------------------- | ------ | ------------------------- |
| `/`          | `(app)/page.tsx`            | No     | Main POS interface        |
| `/about`     | `(info)/about/page.tsx`     | No     | App info and tech stack   |
| `/downloads` | `(info)/downloads/page.tsx` | No     | Platform download links   |
| `/version`   | `(info)/version/page.tsx`   | Yes    | Build version display     |
| `*`          | `not-found.tsx`             | No     | 404 page                  |
| `*`          | `error.tsx`                 | Yes    | Runtime error boundary    |
| `*`          | `global-error.tsx`          | Yes    | Root-level error boundary |

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Server Components** by default — no `"use client"` unless the component
  needs interactivity, browser APIs, or hooks
- **Client Components** marked with `"use client"` — version page
- No server actions, no API routes — pure static

## State Management

- **Local state** with `useState` / `useReducer` — component-scoped state
- **No global state library** — state is managed at the component level
- Future: `localStorage` for cart persistence, transaction history

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `badge`, `input`, `tabs`)
- **Dark mode** via `data-theme="dim"` on `<html>`
- **32 themes** available via DaisyUI plugin
- **Global base styles** in `src/styles/base.css` — headings, links, code,
  tables, forms
- **Font**: `font-mono` set on `<body>` for monospace throughout

## Icons

- **react-icons** with Feather icons (`Fi` set) for consistency
- Import from `react-icons/fi` — e.g. `FiArrowLeft`, `FiDownload`
- Icons accept `className` for sizing

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
