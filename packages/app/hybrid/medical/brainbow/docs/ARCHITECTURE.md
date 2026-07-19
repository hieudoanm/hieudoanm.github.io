# Architecture

## Goals

- All-in-one Brainbow microscopy **viewer**, **annotator**, and **analysis
  toolkit**
- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Heavy image processing in Rust (Tauri commands) with a WASM/Canvas/WebGL
  fallback for web-only mode
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer           | Technology                            |
| --------------- | ------------------------------------- |
| Framework       | Next.js 16 (App Router, Turbopack)    |
| Language        | TypeScript 6 (strict)                 |
| Styling         | Tailwind CSS 4 + DaisyUI 5            |
| Icons           | react-icons (Fi set)                  |
| Desktop         | Tauri 2 (Rust backend)                |
| Image handling  | Canvas2D / WebGL, Rust (native path)  |
| Storage         | SQLite (via Tauri), filesystem assets |
| Testing         | Jest + Playwright                     |
| Linting         | ESLint 10 + Prettier                  |
| Package Manager | pnpm                                  |

## Directory Structure

```txt
src/
├── app/              # App Router pages and layouts
├── components/       # Atomic design components
│   ├── atoms/        # Smallest building blocks (Button, Slider, Toggle)
│   ├── molecules/    # Combinations of atoms (ChannelControl, ImageToolbar)
│   ├── organisms/    # Complex UI sections (ViewerCanvas, ImageSidebar)
│   └── templates/    # Page-level layouts (HomeTemplate, ViewerTemplate)
├── data/             # Mock/fixture datasets for demo and tests
├── hooks/            # Custom React hooks (useSWRegister, useImageViewer)
├── lib/              # Domain logic (image loading, channel math, geometry)
├── providers/        # Context providers (SWProvider)
├── styles/           # Global CSS (Tailwind base layer)
└── types/            # Shared TypeScript types
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  HomeTemplate, ViewerTemplate
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  ViewerCanvas, ImageSidebar
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  ChannelControl, ImageToolbar
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  Button, Slider, Toggle, Toolbar
├─────────────────────────────────────────┤
│  Hooks (hooks/)                         │  useImageViewer (view state)
├─────────────────────────────────────────┤
│  Lib (lib/)                             │  image I/O, channel math, geometry
├─────────────────────────────────────────┤
│  Providers (providers/)                 │  SWProvider (service worker)
└─────────────────────────────────────────┘
```

## Routing

Flat routes only — no dynamic `[id]` or `[slug]` segments.

| Route | Page       | Client | Description                                |
| ----- | ---------- | ------ | ------------------------------------------ |
| `/`   | `page.tsx` | Yes    | Viewer (root): auto-loads the demo dataset |

Pass entity IDs via `useSearchParams()` — not dynamic segments.

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Server Components** by default — no `"use client"` unless the component
  needs interactivity, browser APIs, or hooks
- **Client Components** marked with `"use client"` — the viewer is inherently
  client-side (canvas, file I/O)
- No server actions, no API routes — pure static

## State Management

- **Local state** with `useState` / `useReducer` — view state (pan, zoom,
  channels) is component-scoped
- **Custom hooks** (`useImageViewer`) encapsulate viewer state transitions
- **Context providers** wrap the app in `layout.tsx` (currently only
  `SWProvider`)

## Data Flow

1. Images are imported via the browser File API (web) or Tauri file dialog
   (desktop)
2. `lib/image` decodes the file into an in-memory raster (ImageBitmap +
   ImageData)
3. Imported rasters ride across routes via `lib/store/viewerStore` — a module
   scoped, single-value transfer buffer consumed once by the viewer page
4. Channel state (visibility, opacity, color) is derived in `lib/image`
5. `ViewerCanvas` composites visible channels onto a `<canvas>` each frame
6. Pan/zoom is pure geometry in `lib/geometry` — testable without a browser

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `modal`, `badge`, etc.)
- **Dark theme** via the shared `nothing` theme (`data-theme="nothing"` on
  `<html>`) — built for microscopy review at night
- **Global base styles** in `src/styles/base.css` — headings, links, code,
  tables, forms
- **Themes** in `src/styles/themes.css` — daisyUI plugin config and custom
  `nothing` theme
- **Font**: `font-mono` set on `<body>` for monospace throughout

## Icons

- **react-icons** with Feather icons (`Fi` set) for consistency
- Import from `react-icons/fi` — e.g. `FiUpload`, `FiZoomIn`, `FiLayers`
- Icons accept `className` for sizing — e.g. `<FiZoomIn className="text-lg" />`

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- Canvas rendering is requestAnimationFrame-driven; only dirty frames redraw
- `removeConsole` strips `console.*` in production
- Service worker (`SWProvider`) for offline caching
- PWA manifest for installability

## Native Boundaries

- **Desktop (Tauri)**: file dialogs, real filesystem access, SQLite, background
  batch jobs — via `@tauri-apps/api` IPC and Rust commands
- **Web fallback**: browser File API, IndexedDB, WASM processing — keeps the
  core viewer usable in a plain browser
- Feature detection in `lib/native` decides which backend a given call uses
