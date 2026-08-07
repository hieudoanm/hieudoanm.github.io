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

## Directory Structure

```txt
src/
├── app/              # App Router pages and layouts
├── components/       # Atomic design components
│   ├── atoms/        # Smallest building blocks (Button, Badge, Avatar, etc.)
│   ├── molecules/    # Combinations of atoms (Card, Alert, SearchBar, etc.)
│   ├── organisms/    # Complex UI sections (Header, Hero, StatsGrid, etc.)
│   └── templates/    # Page-level layouts (AboutTemplate, ErrorTemplate, etc.)
├── hooks/            # Custom React hooks (useSWRegister)
├── providers/        # Context providers (SWProvider)
└── styles/           # Global CSS (Tailwind base layer)
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  Page-level layout shells
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  Header, Sidebar, DataTable, Footer
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  Card, Alert, SearchBar, Pagination
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  Button, Badge, Avatar, Rating, etc.
├─────────────────────────────────────────┤
│  Providers (providers/)                 │  SWProvider (service worker)
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

Organisms compose molecules and atoms into full sections: `StatsGrid` wraps
`Stat`, `ChatWindow` wraps `ChatBubble`, `FAQSection` wraps `Accordion`, and
`Hero`/`NewsletterSection` are standalone marketing sections.

## Routing

Flat routes only — no dynamic `[id]` or `[slug]` segments.

| Route       | Page                | Client | Description                    |
| ----------- | ------------------- | ------ | ------------------------------ |
| `/`         | `page.tsx`          | Yes    | Home page (component showcase) |
| `/about`    | `about/page.tsx`    | No     | App info and tech stack        |
| `/settings` | `settings/page.tsx` | Yes    | Language, theme, timezone      |
| `/version`  | `version/page.tsx`  | Yes    | Build version display          |
| `*`         | `not-found.tsx`     | No     | 404 page                       |
| `*`         | `error.tsx`         | Yes    | Runtime error boundary         |
| `*`         | `global-error.tsx`  | Yes    | Root-level error boundary      |

Pass entity IDs via `useSearchParams()` — e.g. `/detail?id=123` — not dynamic
segments.

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Server Components** by default — no `"use client"` unless the component
  needs interactivity, browser APIs, or hooks
- **Client Components** marked with `"use client"` — settings, version, home
  pages
- No server actions, no API routes — pure static

## State Management

- **Local state** with `useState` / `useReducer` — all state is component-scoped
- **No global state library** — the boilerplate keeps state minimal
- **Context providers** wrap the app in `layout.tsx` (currently only
  `SWProvider`)

## Data Fetching

- No data fetching — all content is static and hardcoded
- For future use: fetch in Server Components, pass props to Client Components

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `modal`, `badge`, etc.)
- **Dark mode** via `data-theme="dark"` on `<html>`
- **Global base styles** in `src/styles/globals.css` — headings, links, code,
  tables, forms
- **Font**: `font-mono` set on `<body>` for monospace throughout

## Icons

- **react-icons** with Feather icons (`Fi` set) for consistency
- Import from `react-icons/fi` — e.g. `FiHome`, `FiSettings`, `FiArrowLeft`
- Icons accept `className` for sizing — e.g.
  `<FiArrowLeft className="text-lg" />`
- Used in: Navbar, Header (back button), EmptyState, Dropdown, Toast (close),
  VersionTemplate (copy/check)

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
- Service worker (`SWProvider`) for offline caching
- PWA manifest for installability
