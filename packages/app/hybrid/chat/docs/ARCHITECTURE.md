# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Mock AI responses with streaming simulation
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
│   ├── atoms/        # MessageBubble, CodeBlock, ModelBadge
│   ├── molecules/    # ChatInput, MessageActions, ConversationCard
│   ├── organisms/    # Sidebar, ChatHeader, ModelPicker
│   ├── templates/    # ChatTemplate, SettingsTemplate
│   └── RouteGuard.tsx
├── data/             # Mock data, model definitions
├── hooks/            # useStreaming, useMarkdown, useKeyboard
├── lib/              # IndexedDB wrapper (db.ts)
├── providers/        # DataProvider, Providers, ToastProvider
├── styles/           # Global CSS (Tailwind base layer)
├── types/            # TypeScript interfaces
└── utils/            # formatMessage, highlightCode, exportChat
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  Page-level layout shells
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  Sidebar, ChatHeader, ModelPicker
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  ChatInput, MessageActions, ConversationCard
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  MessageBubble, CodeBlock, ModelBadge
├─────────────────────────────────────────┤
│  Lib (lib/)                             │  IndexedDB wrapper, data access
├─────────────────────────────────────────┤
│  Providers (providers/)                 │  DataProvider, ToastProvider
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

Dynamic routes for conversation threads; flat routes for settings.

| Route              | Page                       | Client | Description                         |
| ------------------ | -------------------------- | ------ | ----------------------------------- |
| `/`                | `page.tsx`                 | Yes    | Conversation list, new chat, search |
| `/chat/[id]`       | `chat/[id]/page.tsx`       | Yes    | Message thread, input, model picker |
| `/chat/[id]/[msg]` | `chat/[id]/[msg]/page.tsx` | Yes    | Expanded message, metadata          |
| `/settings`        | `settings/page.tsx`        | Yes    | Theme, model defaults, data mgmt    |
| `/profile`         | `profile/page.tsx`         | Yes    | User info, avatar, preferences      |
| `/version`         | `version/page.tsx`         | Yes    | Build version display               |
| `*`                | `not-found.tsx`            | No     | 404 page                            |
| `*`                | `error.tsx`                | Yes    | Runtime error boundary              |

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Client Components** — most pages marked with `"use client"` due to
  interactive chat UI, streaming, and state management
- **Server Components** used only for static layout wrappers
- No server actions, no API routes — pure static

## State Management

- **Local state** with `useState` / `useReducer` — component-scoped state
- **IndexedDB** for persistence (database: `chat-db`):
  - Conversations, messages, reactions, folders, settings
  - Seed data on first load with demo conversations
- **Context providers** wrap the app in `layout.tsx`:
  - `DataProvider` — IndexedDB access and state
  - `ToastProvider` — in-app notifications
- **Optimistic UI** — messages appear instantly, persist in background

## Data Fetching

- No server-side data fetching — all content is mock data from IndexedDB
- Mock network delay via `NEXT_PUBLIC_MOCK_DELAY` (default 800ms)
- **Streaming simulation** — `useStreaming()` hook returns partial text at 30ms
  intervals with sentence boundary pauses

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `input`, `badge`)
- **Dark mode** via `data-theme="night"` on `<html>`
- **32 themes** available, persisted to localStorage
- **Base HTML styles** in `src/styles/globals.css` — headings, code, tables,
  forms, semantic elements
- **Font**: `font-mono` set on `<body>` for monospace throughout

## Icons

- **react-icons** with Feather icons (`Fi` set) for consistency
- Import from `react-icons/fi` — e.g. `FiSend`, `FiSettings`, `FiArrowLeft`
- Icons accept `className` for sizing

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
- Service worker for offline caching of conversations
- PWA manifest for installability
- Optimistic UI for instant message rendering
