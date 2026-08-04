# Architecture

## Goals

- Minimal Obsidian-style markdown notes app that runs as a **web app**
  (browser), **desktop app** (Tauri), and **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support — the whole vault works offline
- Split editor/preview writing experience with wikilink navigation
- Local-first storage with a seeded markdown vault
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                             |
| ----------- | -------------------------------------- |
| Framework   | Next.js 16 (App Router, static export) |
| Language    | TypeScript 6 (strict)                  |
| Styling     | Tailwind CSS 4 + DaisyUI 5             |
| Icons       | react-icons (Fi set)                   |
| Desktop     | Tauri 2                                |
| Editor      | CodeMirror                             |
| Storage     | localStorage + seeded JSON vault       |
| Testing     | Jest + Playwright                      |
| Linting     | ESLint + Prettier                      |
| Package Mgr | pnpm                                   |

## Directory Structure

```txt
src/
├── app/              # App Router (single-page vault app)
├── components/
│   ├── editor/       # FileToolbar, FormatToolbar, MarkdownPreviewer,
│   │                 # StatsBar, TocSidebar, ViewControls
│   └── vault/        # VaultApp, VaultSidebar, GraphView
├── notes/            # The markdown vault, organized by category
│   ├── engineering/  # devops, hardware, roles, software, data, ...
│   ├── humanities/   # science, life, sports, marketing, ...
│   └── ...           # transport, geography, devices, media, games
├── data/             # seed.ts, seed.gen.json (vault seed)
├── hooks/            # useCodeMirror, useMarkdownRender, useScrollSync,
│                     # useSWRegister
├── lib/              # markdown, wikilinks, slug, storage, export,
│                     # date, format, fonts, types
├── providers/        # SWProvider (service worker)
└── styles/           # globals.css (Tailwind + DaisyUI)
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Single-page vault shell
├─────────────────────────────────────────┤
│  Vault (components/vault/)              │  VaultApp, VaultSidebar, GraphView
├─────────────────────────────────────────┤
│  Editor (components/editor/)            │  Toolbars, previewer, TOC, stats
├─────────────────────────────────────────┤
│  Hooks (hooks/)                         │  useCodeMirror, useMarkdownRender
├─────────────────────────────────────────┤
│  Domain (lib/)                          │  markdown, wikilinks, storage
├─────────────────────────────────────────┤
│  Content (notes/ + data/)               │  Markdown vault + seed
└─────────────────────────────────────────┘
```

## Routing

The app is a single-page vault — all content management happens in one view with
no dynamic route segments.

| Route | Page      | Client | Description                      |
| ----- | --------- | ------ | -------------------------------- |
| `/`   | Vault     | Yes    | Vault sidebar + editor + preview |
| `*`   | not-found | No     | 404 page                         |
| `*`   | error     | Yes    | Runtime error boundary           |

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`)
- **Client Components** throughout — the editor, preview, and graph view all
  need browser APIs (CodeMirror, storage, service worker)
- No server actions, no API routes — pure static

## Editor & Preview

- **CodeMirror** drives the markdown editor (`useCodeMirror`)
- **MarkdownPreviewer** renders the live preview (`useMarkdownRender`)
- **FormatToolbar** applies markdown formatting (bold, italic, headings, lists,
  links, code)
- **FileToolbar** handles file operations (new, rename, save, delete, export)
- **ViewControls** switch between edit, split, and preview modes
- **StatsBar** shows word/character/line counts
- **TocSidebar** builds a table of contents from headings
- **Wikilinks** (`lib/wikilinks.ts`) resolve `[[note]]` links across the vault
  for navigation and graph edges

## Graph View

- **GraphView** renders vault notes as nodes and wikilink relations as edges
- Clicking a node navigates to the note; graph updates from the vault index
- Supports pan/zoom and click-to-open interaction

## State Management

- **Local state** for active note, view mode, and editor state
- **storage.ts** persists notes and preferences to localStorage
- **seed.ts** provides the initial vault on first load
- Notes are content-addressed by slug (`lib/slug.ts`)

## Styling

- **Tailwind CSS 4** + **DaisyUI 5** (dark default via `data-theme="night"`)
- **Markdown content** styled through `globals.css` base layer for consistent
  typography (headings, code, tables, blockquotes, lists)
- Responsive: sidebar collapses on mobile; editor/preview stack vertically

## Performance

- Static export — zero server runtime
- CodeMirror is lazy-imported to reduce initial bundle
- Scroll sync (`useScrollSync`) keeps editor and preview in lockstep
- `removeConsole` strips `console.*` in production
- Service worker (`SWProvider`) + PWA manifest for offline caching
