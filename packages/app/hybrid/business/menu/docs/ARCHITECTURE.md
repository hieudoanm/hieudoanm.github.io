# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Menu data travels in the **link itself** — no backend, no database
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                         |
| ----------- | ---------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack) |
| Language    | TypeScript 6 (strict)              |
| Styling     | Tailwind CSS 4 + DaisyUI 5         |
| Icons       | react-icons (Fi set)               |
| QR codes    | `qrcode` (client-side)             |
| Desktop     | Tauri 2                            |
| Testing     | Jest + Playwright                  |
| Linting     | ESLint 10 + Prettier               |
| Package Mgr | pnpm                               |

## Directory Structure

```txt
src/
├── app/              # App Router pages and layouts
│   ├── (info)/       # Info pages (about, downloads, version)
│   ├── layout.tsx    # Root layout
│   ├── menu/         # Guest-facing menu page (query params)
│   └── page.tsx      # Owner dashboard (root)
├── components/       # Atomic design components
│   ├── organisms/    # RestaurantDashboard, RestaurantManager, MenuManager,
│   │                 # QrShare, CustomerMenu, Header
│   └── templates/    # AboutTemplate, DownloadsTemplate, VersionTemplate
├── hooks/            # useMenuStore (localStorage bridge)
├── lib/              # Pure functions (ids, menu, qr, storage)
├── styles/           # Global CSS (Tailwind base layer)
│   ├── globals.css   # Entry point
│   ├── base.css      # Base layer resets
│   └── themes.css    # DaisyUI theme config
├── types/            # Domain types (Restaurant, MenuItem, Order)
└── __tests__/        # Component and lib tests
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  Feature-sliced UI components
├─────────────────────────────────────────┤
│  Hooks (hooks/)                         │  React state + localStorage hook
├─────────────────────────────────────────┤
│  lib/ (pure functions)                  │  Domain logic (ids, menu, qr)
└─────────────────────────────────────────┘
```

## Routing

Static routes with query-param-driven guest menu.

| Route        | Page                        | Client | Description                    |
| ------------ | --------------------------- | ------ | ------------------------------ |
| `/`          | `page.tsx`                  | Yes    | Owner dashboard (restaurants)  |
| `/menu`      | `menu/page.tsx`             | Yes    | Guest menu (reads `?d=` param) |
| `/about`     | `(info)/about/page.tsx`     | No     | App info and tech stack        |
| `/downloads` | `(info)/downloads/page.tsx` | No     | Platform download links        |
| `/version`   | `(info)/version/page.tsx`   | Yes    | Build version display          |

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Owner dashboard** is a client component that reads/writes `localStorage`
- **Guest menu** reads menu data from the `?d=` query param and decodes it
  client-side
- No server actions, no API routes — pure static

## Data Flow

```txt
Owner builds a menu
   │
   ▼
localStorage (menu_state)         ← owner's restaurants, items, orders
   │
   ▼
QR code / shared link encodes { restaurant, items } into the `?d=` param
   │
   ▼
Guest opens the link → decodes `?d=` → sees the menu → places an order
```

## Share-by-Link (query params only)

- `encodeMenuData(restaurant, items)` — serializes the menu to a compact
  base64url payload
- `decodeMenuData(payload)` — parses it back, failing gracefully on corrupt or
  unknown-version payloads
- The payload is versioned (`v: 1`) so future formats stay backward-safe
- No server round-trip: the menu is self-contained in the URL

## State Management

- **No global state library** — state lives in React components
- **`useMenuStore`** hook bridges `localStorage` and component state via pure
  functions in `lib/`
- **Pure functions** accept state and return new state (no mutation) — see
  `src/lib/menu.ts`

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `badge`, `input`, `tabs`)
- **Dark mode** via `data-theme="dim"` on `<html>`
- **Global base styles** in `src/styles/base.css`
- **Font**: `font-mono` set on `<body>` for monospace throughout

## Icons

- **react-icons** with Feather icons (`Fi` set) for consistency
- Import from `react-icons/fi` — e.g. `FiPlus`, `FiMinus`, `FiShoppingCart`
- Icons accept `className` for sizing

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
