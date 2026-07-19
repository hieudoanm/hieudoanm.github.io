# Architecture

## Goals

- Image editor that runs as a **web app** (browser), **desktop app** (Tauri),
  and **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Canvas-based editing with real-time CSS filter previews
- Non-destructive layer and history model
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                             |
| ----------- | -------------------------------------- |
| Framework   | Next.js 16 (App Router, static export) |
| Language    | TypeScript 6 (strict)                  |
| Styling     | Tailwind CSS 4 + DaisyUI 5             |
| Icons       | react-icons (Fi set)                   |
| Desktop     | Tauri 2                                |
| Storage     | IndexedDB (`photo-db`)                 |
| Rendering   | HTML Canvas 2D + CSS filters           |
| Testing     | Jest + Playwright                      |
| Linting     | ESLint + Prettier                      |
| Package Mgr | pnpm                                   |

## Directory Structure

```txt
src/
├── app/              # App Router pages ((editor), (library), (settings))
├── components/       # Atomic design components
│   ├── atoms/        # ImageThumbnail, ToolButton, SliderControl
│   ├── molecules/    # AdjustmentPanel, FilterGrid, CropOverlay
│   ├── organisms/    # Sidebar, Canvas, LayerPanel, Toolbar
│   ├── templates/    # EditorTemplate, LibraryTemplate, SettingsTemplate
│   └── RouteGuard.tsx # Auth route protection
├── data/             # Mock images, filter presets, sample assets
├── hooks/            # useCanvas, useImageProcess, useHistory, useZoom
├── lib/              # IndexedDB wrapper (db.ts), image processing mock
├── providers/        # DataProvider, Providers, ToastProvider
├── styles/           # globals.css (Tailwind + DaisyUI)
├── types/            # TypeScript interfaces
└── utils/            # adjustColor, formatFileSize, exportImage
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, route groups, guards
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  EditorTemplate, LibraryTemplate
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  Canvas, Toolbar, LayerPanel
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  AdjustmentPanel, FilterGrid
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  ToolButton, SliderControl
├─────────────────────────────────────────┤
│  Hooks (hooks/)                         │  useCanvas, useImageProcess, useHistory
├─────────────────────────────────────────┤
│  Processing (lib/)                      │  Canvas engine, CSS filter chain
└─────────────────────────────────────────┘
```

## Routing

| Route               | Page             | Client | Description                        |
| ------------------- | ---------------- | ------ | ---------------------------------- |
| `/`                 | Library          | Yes    | Image grid, upload, albums, search |
| `/edit/[id]`        | Canvas Editor    | Yes    | Full editing workspace with tools  |
| `/edit/[id]/crop`   | Crop & Transform | Yes    | Crop, rotate, flip, perspective    |
| `/edit/[id]/layers` | Layer Manager    | Yes    | Layer list, blend modes, opacity   |
| `/albums`           | Albums           | Yes    | Album list with covers, CRUD       |
| `/settings`         | Settings         | Yes    | Theme, default export format       |
| `/profile`          | Profile          | Yes    | User info                          |
| `/version`          | Version          | Yes    | Build version, copy to clipboard   |

Dynamic routes under `/edit/[id]` for the canvas editor workspace.

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`)
- **Client Components** for library, canvas editor, and crop flows
- **HTML Canvas 2D** for image display and manipulation
- **Offscreen canvas** processes adjustments without blocking the UI

## Image Processing

- **CSS filter chain**: brightness, contrast, saturate, hue-rotate, blur, sepia,
  grayscale applied as CSS filters for real-time preview
- **Mock processing**: adjustments simulated via CSS filter properties rather
  than pixel-level manipulation
- **Preset filters**: predefined CSS filter combinations for one-click effects
- **Export simulation**: mock export generates a colored placeholder with
  metadata

## State Management

- **Context providers**: `DataProvider` (images, albums), `ToastProvider`
- **History**: full undo/redo stack via `useHistory` (Ctrl+Z / Ctrl+Shift+Z)
- **Optimistic UI**: adjustments preview instantly, persist in background

## Data & Persistence

- **IndexedDB** (`photo-db`) stores images (base64/blob), albums, presets,
  settings, and edit history
- **Seed on first load**: 8–10 demo placeholder images with different dimensions
  and sample albums
- **Mock network delay**: `NEXT_PUBLIC_MOCK_DELAY` (default `800`ms) applied
  before every DB operation
- Full CRUD for images, albums, and presets

## Keyboard Shortcuts

- **Ctrl+Z / Ctrl+Shift+Z**: undo / redo; **Ctrl+S**: export / save
- **Ctrl+0**: fit to screen; **Ctrl+1**: actual size (100%)
- **Ctrl++/-**: zoom in/out; **Space+drag**: pan canvas
- **V / C / B / T**: move / crop / brush / text tools
- **Ctrl+Shift+E**: export dialog; **Escape**: deselect / cancel

## Styling

- **Tailwind CSS 4** + **DaisyUI 5** (dark default via `data-theme="night"`)
- **Canvas** always shows the image with a checkerboard transparency pattern
- **Responsive workspace**: full layout on desktop; collapsed panels below `lg:`
  (1024px); full-screen canvas with bottom toolbar on mobile

## Performance

- Static export — zero server runtime
- Offscreen canvas for background processing
- Windowed rendering and cached page heights where applicable
- `removeConsole` strips `console.*` in production
- Service worker + PWA manifest for offline caching
