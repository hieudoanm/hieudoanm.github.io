# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Client-side HTTP execution via the browser `fetch` API
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
├── pages/            # Pages Router API route (REST /api/rest/*)
├── server/           # REST route registry + handlers
├── components/       # Atomic design components
│   ├── atoms/        # MethodSelect, UrlInput, SendButton, KeyValueRow, StatusBadge
│   ├── molecules/    # RequestComposer, KeyValueEditor, BodyEditor, AuthEditor,
│   │                 # FormDataEditor, GraphQlEditor, CookieEditor, ProtocolSwitch
│   ├── organisms/    # ApiClient, RequestTabs, ResponsePanel, HistoryList,
│   │                 # WebSocketPanel, GrpcPanel, MqttPanel
│   └── templates/    # AboutTemplate, VersionTemplate, ErrorTemplate, PageTransition
├── hooks/            # Custom React hooks
├── lib/              # http.ts (execution + history), body.ts, cookies.ts, format.ts,
│                     # graphql.ts, mqtt.ts, proto.ts, websocket.ts
├── providers/        # SWProvider (service worker)
├── styles/           # Global CSS (Tailwind base layer)
└── types/            # TypeScript interfaces (api-client.ts)
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  Page-level layout shells
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  ApiClient, RequestTabs, ResponsePanel,
│                                         │  WebSocketPanel, GrpcPanel, MqttPanel
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  RequestComposer, KeyValueEditor, AuthEditor,
│                                         │  FormDataEditor, GraphQlEditor, CookieEditor
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  MethodSelect, UrlInput, SendButton, StatusBadge
├─────────────────────────────────────────┤
│  Lib (lib/)                             │  HTTP execution, URL builder, history
├─────────────────────────────────────────┤
│  Providers (providers/)                 │  SWProvider (service worker)
├─────────────────────────────────────────┤
│  Styles (styles/)                       │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

## Routing

Flat routes only — no dynamic `[id]` or `[slug]` segments.

| Route       | Page                | Client | Description                       |
| ----------- | ------------------- | ------ | --------------------------------- |
| `/`         | `page.tsx`          | Yes    | API client with composer and tabs |
| `/settings` | `settings/page.tsx` | Yes    | Theme picker, data management     |
| `/about`    | `about/page.tsx`    | Yes    | App info and tech stack           |
| `/version`  | `version/page.tsx`  | Yes    | Build version display             |
| `*`         | `not-found.tsx`     | No     | 404 page                          |
| `*`         | `error.tsx`         | Yes    | Runtime error boundary            |
| `*`         | `global-error.tsx`  | Yes    | Root-level error boundary         |

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Server Components** by default — no `"use client"` unless the component
  needs interactivity, browser APIs, or hooks
- **Client Components** marked with `"use client"` — api client, settings,
  about, version pages
- No server actions, no API routes — pure static

## State Management

- **Local state** with `useState` / `useReducer` — component-scoped state
- **localStorage** for persistence:
  - `api-client:history` — request history (limit 50 entries)
  - `api-client:draft` — autosaved request config
  - `api-client:theme` — theme preference
- **No global state library** — state is managed at the component level

## Data Fetching

- **Client-side only** — all HTTP requests go through browser `fetch` API
- **`executeRequest(config)`** — fetch wrapper producing `ResponseMeta` (status,
  statusText, url, headers, body, timeMs, sizeBytes)
- **Pure functions** in `lib/http.ts`:
  - `buildUrl(url, params)` — encodes keys/values, appends query string
  - `buildHeaders(config)` — auth + custom headers
  - `resolveBody(config)` — body only for methods that accept one

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `modal`, `badge`, `tabs`)
- **Dark mode** via `data-theme="dim"` on `<html>`
- **32 themes** available, persisted to localStorage
- **Global base styles** in `src/styles/globals.css` — headings, links, code,
  tables, forms
- **Font**: `font-mono` set on `<body>` for monospace throughout

## Icons

- **react-icons** with Feather icons (`Fi` set) for consistency
- Import from `react-icons/fi` — e.g. `FiSend`, `FiSettings`, `FiArrowLeft`
- Icons accept `className` for sizing

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
- Service worker (`SWProvider`) for offline caching
- PWA manifest for installability
