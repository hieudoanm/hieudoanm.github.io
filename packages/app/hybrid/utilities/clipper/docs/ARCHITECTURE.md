# Architecture

## Goals

- Clipboard manager that runs as a **web app** (browser), **desktop app**
  (Tauri), and **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support — history persists in SQLite
- macOS-first with native clipboard monitoring via Rust
- Atomic design system for reusable UI
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                             |
| ----------- | -------------------------------------- |
| Framework   | Next.js 16 (App Router, static export) |
| Language    | TypeScript 6 (strict) + Rust           |
| Styling     | Tailwind CSS 4 + DaisyUI 5             |
| Icons       | react-icons (Fi set)                   |
| Desktop     | Tauri 2                                |
| Storage     | SQLite (rusqlite, bundled)             |
| Clipboard   | arboard (Rust native clipboard)        |
| Testing     | Jest + Playwright                      |
| Linting     | ESLint + Prettier                      |
| Package Mgr | pnpm                                   |

## Directory Structure

```txt
src/
├── app/              # App Router pages and layouts
│   ├── (app)/        # Main app route group (not used yet)
│   ├── history/      # Clipboard history page
│   ├── settings/     # Settings page (placeholder)
│   ├── error.tsx     # Runtime error boundary
│   ├── global-error.tsx  # Root-level error boundary
│   ├── layout.tsx    # Root layout
│   └── not-found.tsx # 404 page
├── components/       # Atomic design components
│   ├── organisms/    # ClipboardHistory
│   ├── templates/    # ErrorTemplate, NotFoundTemplate
│   └── ui/           # (reserved for shared atoms)
├── lib/              # fonts.ts
├── styles/           # globals.css, themes.css
├── types/            # clipper.ts (ClipboardItem, ClipboardStats)
└── utils/            # (reserved)

src-tauri/
├── Cargo.toml        # rusqlite, arboard, chrono, dirs
├── tauri.conf.json   # Tauri 2 config
├── build.rs          # Tauri build script
├── capabilities/     # Tauri permissions (default.json)
├── icons/            # App icons (icns, ico, png)
└── src/
    ├── main.rs       # Entry point
    └── lib.rs        # SQLite DB, Tauri commands
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  ErrorTemplate, NotFoundTemplate
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  ClipboardHistory
├─────────────────────────────────────────┤
│  Types (types/)                         │  ClipboardItem, ClipboardStats
├─────────────────────────────────────────┤
│  Rust Backend (src-tauri/src/)          │  SQLite DB, Tauri commands, clipboard
└─────────────────────────────────────────┘
```

## Routing

Flat routes — no dynamic `[id]` or `[slug]` segments.

| Route       | Page                | Client | Description               |
| ----------- | ------------------- | ------ | ------------------------- |
| `/`         | `page.tsx`          | Yes    | Clipboard history list    |
| `/history`  | `history/page.tsx`  | Yes    | Clipboard history (alias) |
| `/settings` | `settings/page.tsx` | Yes    | Settings (placeholder)    |
| `*`         | `not-found.tsx`     | No     | 404 page                  |
| `*`         | `error.tsx`         | Yes    | Runtime error boundary    |
| `*`         | `global-error.tsx`  | Yes    | Root-level error boundary |

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`)
- **Client Components** for all interactive pages — history, settings
- No server actions, no API routes — pure static + Tauri IPC

## State Management

- **Local state** with `useState` — component-scoped state
- **HTTP polling** — fetch clipboard history every 2 seconds from Tauri backend
- No global state library — state managed at the component level

## Data & Persistence

- **SQLite** (`clipper.db`) stores clipboard entries with content, type, pinned
  status, creation timestamp, and copy count
- **Database location**:
  `~/Library/Application Support/io.github.hieudoanm.clipper/clipper.db`
- **Schema**:

```sql
CREATE TABLE clipboard (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    content_type TEXT NOT NULL DEFAULT 'text',
    pinned INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    copied_count INTEGER NOT NULL DEFAULT 1
);
```

## Tauri Commands

| Command             | Description                           |
| ------------------- | ------------------------------------- |
| `get_history`       | Fetch paginated clipboard entries     |
| `search_history`    | Search entries by content             |
| `add_entry`         | Insert a new clipboard entry          |
| `delete_entry`      | Delete a single entry by ID           |
| `clear_history`     | Delete all unpinned entries           |
| `toggle_pin`        | Pin/unpin an entry                    |
| `copy_to_clipboard` | Copy content to system clipboard      |
| `get_stats`         | Get total, pinned, text, image counts |

## Styling

- **Tailwind CSS 4** + **DaisyUI 5** (32 themes, dark default via
  `data-theme="clipper"`)
- **Custom "clipper" theme**: cyan primary, violet secondary, emerald accent
- **Base styles** in `globals.css` via `@layer base`
- **Font**: Inter (sans-serif) via `next/font/google`

## Icons

- **react-icons** with Feather icons (`Fi` set) for consistency
- Import from `react-icons/fi` — e.g. `FiCopy`, `FiTrash2`, `FiStar`
- Icons accept `className` for sizing

## Performance

- Static export — zero server runtime
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
