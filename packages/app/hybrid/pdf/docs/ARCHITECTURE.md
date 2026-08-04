# Architecture

## Goals

- PDF viewer and editor that runs as a **web app** (browser), **desktop app**
  (Tauri), and **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Mock canvas-based PDF rendering with virtual scrolling for performance
- Annotation and editing workflows that persist locally via IndexedDB
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                         |
| ----------- | ---------------------------------- |
| Framework   | Next.js 16 (App Router, static export) |
| Language    | TypeScript 6 (strict)              |
| Styling     | Tailwind CSS 4 + DaisyUI 5         |
| Icons       | react-icons (Fi set)               |
| Desktop     | Tauri 2                            |
| Storage     | IndexedDB (`pdf-db`)               |
| Rendering   | HTML Canvas (mock PDF engine)      |
| Testing     | Jest + Playwright                  |
| Linting     | ESLint + Prettier                  |
| Package Mgr | pnpm                               |

## Directory Structure

```txt
src/
├── app/              # App Router pages ((pdf), (settings) route groups)
├── components/       # Atomic design components
│   ├── atoms/        # PageThumbnail, ZoomControl, AnnotationBadge
│   ├── molecules/    # PageCanvas, AnnotationToolbar, PageReorderList
│   ├── organisms/    # Sidebar, ViewerToolbar, MergePanel, CompareView
│   ├── templates/    # ViewerTemplate, SettingsTemplate
│   └── RouteGuard.tsx # Auth route protection
├── data/             # Mock PDFs, annotation templates, page images
├── hooks/            # usePDFViewer, useZoom, useAnnotation, useDragDrop
├── lib/              # IndexedDB wrapper (db.ts), PDF render engine mock
├── providers/        # DataProvider, Providers, ToastProvider
├── styles/           # globals.css (Tailwind + DaisyUI)
├── types/            # TypeScript interfaces
└── utils/            # formatPageNumber, exportImage, mergeArrays
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, route groups, guards
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  ViewerTemplate, SettingsTemplate
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  Sidebar, ViewerToolbar, MergePanel
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  PageCanvas, AnnotationToolbar
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  PageThumbnail, ZoomControl
├─────────────────────────────────────────┤
│  Hooks (hooks/)                         │  usePDFViewer, useZoom, useAnnotation
├─────────────────────────────────────────┤
│  Rendering (lib/)                       │  Canvas render engine, virtual scroll
└─────────────────────────────────────────┘
```

## Routing

| Route              | Page          | Client | Description                          |
| ------------------ | ------------- | ------ | ------------------------------------ |
| `/`                | Documents     | Yes    | Recent PDFs, upload, grid/list view  |
| `/pdf/[id]`        | PDF Viewer    | Yes    | Page render, zoom, annotation tools  |
| `/pdf/[id]/edit`   | PDF Editor    | Yes    | Text edit, images, watermark         |
| `/pdf/[id]/merge`  | Merge / Split | Yes    | Combine PDFs, extract pages, reorder |
| `/pdf/[id]/compare`| Compare       | Yes    | Side-by-side diff of two PDFs        |
| `/settings`        | Settings      | Yes    | Theme, default zoom, layout          |
| `/profile`         | Profile       | Yes    | User info                            |
| `/version`         | Version       | Yes    | Build version, copy to clipboard     |

Dynamic routes `/pdf/[id]` and `/pdf/[id]/edit` for the viewer and editor.

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`)
- **Client Components** for viewer, editor, and merge flows
- **Mock canvas rendering**: text blocks, images, and shapes drawn on HTML
  canvas elements; an invisible text layer overlays for selection and search
- **Virtual scrolling**: only render visible pages plus a one-page buffer;
  page heights are cached for scroll-position math

## State Management

- **Context providers**: `DataProvider` (documents), `ToastProvider`
- **Local state** with `useState`/`useReducer` for zoom, tool selection, and
  annotation drafts
- **Optimistic UI**: annotations and edits apply immediately, persist in
  background

## Data & Persistence

- **IndexedDB** (`pdf-db`) stores documents, annotations, bookmarks, settings,
  and form data
- **Seed on first load**: demo PDFs (5–20 pages each with text blocks, images,
  and pre-existing annotations)
- **Mock network delay**: `NEXT_PUBLIC_MOCK_DELAY` (default `800`ms) applied
  before every DB operation
- Full CRUD for documents and annotations

## Keyboard Shortcuts

- **Ctrl+/-**: zoom in/out; **Ctrl+0**: reset zoom
- **Arrow keys**: page navigation; **Home/End**: first/last page
- **Ctrl+F**: search text; **Ctrl+G**: go to page; **Ctrl+P**: print
- **Ctrl+Z / Ctrl+Shift+Z**: undo/redo annotation
- **Escape**: deselect tool / close panel

## Styling

- **Tailwind CSS 4** + **DaisyUI 5** (dark default via `data-theme="night"`)
- **Page rendering** always light (white background) for readability
- **Resizable panels**: drag border between thumbnail sidebar and viewer;
  sidebar collapses below `lg:` (1024px)
- On mobile: full-screen viewer with slide-out thumbnail drawer

## Performance

- Static export — zero server runtime
- Virtual scrolling / windowed page rendering
- Page height cache for smooth scroll positioning
- `removeConsole` strips `console.*` in production
- Service worker + PWA manifest for offline caching
