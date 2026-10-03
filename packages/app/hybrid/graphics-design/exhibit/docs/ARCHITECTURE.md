# Architecture

## Goals

- Hybrid app that runs as a **web app** (browser), **desktop app** (Tauri), and
  **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support
- Showcase of self-contained demo applications (**POS**, **Menu**, **Chat**,
  **Wallet**, **Password**)
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                         |
| ----------- | ---------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack) |
| Language    | TypeScript 6 (strict)              |
| Styling     | Tailwind CSS 4 + DaisyUI 5         |
| Icons       | react-icons (Fi set)               |
| Desktop     | Tauri 2                            |
| Testing     | Jest 30 + Playwright               |
| Linting     | ESLint 10 (flat config) + Prettier |
| Package Mgr | pnpm                               |

## Applications

| App      | Route       | Domain                     | Tiers                                  |
| -------- | ----------- | -------------------------- | -------------------------------------- |
| POS      | `/pos`      | Business — point of sale   | `atoms` → `templates`                  |
| Menu     | `/menu`     | Business — digital menus   | flat under `components/menu`           |
| Chat     | `/chat`     | Social — messaging         | `atoms` → `templates`                  |
| Wallet   | `/wallet`   | Finance — personal banking | `atoms` → `templates` (namespaced)     |
| Password | `/password` | Utilities — password vault | `molecules` → `organisms` (namespaced) |

Shared, app-agnostic UI lives in `components/shared/templates`.

## Directory Structure

```txt
src/
├── app/                # App Router: routes, layouts, error boundaries
│   ├── (app)/          # Main apps: chat, menu, pos, wallet, password
│   ├── (auth)/         # sign-in, sign-up, profile, password flows
│   ├── (info)/         # about, downloads, version
│   ├── error.tsx       # Runtime error boundary
│   ├── global-error.tsx# Root-level error boundary
│   ├── layout.tsx      # Root layout (theme, Header, main)
│   ├── loading.tsx     # Route loading UI
│   └── not-found.tsx   # 404 page
├── components/         # UI, organised by app then atomic tier
│   ├── chat/           # atoms, molecules, organisms, templates
│   ├── menu/           # flat components
│   ├── pos/            # atoms, molecules, organisms, templates
│   ├── wallet/         # atoms, molecules, organisms, templates (vendored)
│   ├── password/       # molecules, organisms (vendored)
│   └── shared/         # templates/ — ErrorTemplate and friends
├── lib/                # Pure logic, no React
│   ├── chat/           # crypto, db, format, selectors, url, webrtc
│   ├── wallet/         # db, export, format, iconMap, seed, session, utils
│   ├── password/       # db, health, security, totp, transfer
│   ├── menu/
│   └── pos/            # money, cart, discounts, payment, reports, …
├── hooks/              # Reusable hooks (chat/, menu/, password/, wallet/)
├── providers/          # React context providers (chat/, password/, wallet/)
├── data/               # Seed/fixture data (chat/, password/, wallet/)
├── types/              # Shared types (chat/, menu/, pos/, password/, wallet/)
├── utils/              # Formatting helpers (password/)
├── test-helpers/       # Shared test doubles (password/, wallet/)
├── content/            # Build-time content (version string)
├── styles/             # globals.css (entry) + themes.css
└── __tests__/          # Tests for root-level app files
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, layouts, error boundaries
├─────────────────────────────────────────┤
│  Templates                              │  Page shells + route state
│  Organisms                              │  Composed feature sections
│  Molecules                              │  Reusable UI blocks
│  Atoms                                  │  Presentational primitives
├─────────────────────────────────────────┤
│  lib/                                   │  Pure logic, fully testable
├─────────────────────────────────────────┤
│  styles/                                │  Tailwind base layer, CSS variables
└─────────────────────────────────────────┘
```

Each tier is a flat directory with an `index.ts` barrel. Feature code imports
its own tier directly (`@/components/pos/molecules`), never through the app
root, so a tier can be extracted without touching its consumers.

## Path Aliases

`tsconfig.json` declares exactly one alias:

```json
"paths": { "@/*": ["./src/*"] }
```

`jest.config.ts` mirrors it with `'^@/(.*)$': '<rootDir>/src/$1'`. There is no
`baseUrl` and no per-app alias — everything resolves as `@/<top-level-dir>/…`.
Adding a second alias means updating `tsconfig.json`, `jest.config.ts`, and
every `moduleNameMapper`, so prefer real directory names over new aliases.

## Routing

Flat routes with route groups — no dynamic `[id]` or `[slug]` segments.

| Route              | Page                              | Client | Description                              |
| ------------------ | --------------------------------- | ------ | ---------------------------------------- |
| `/`                | `app/page.tsx`                    | Yes    | Showcase home                            |
| `/pos`             | `(app)/pos/page.tsx`              | Yes    | POS application                          |
| `/menu`            | `(app)/menu/page.tsx`             | Yes    | Menu application                         |
| `/chat`            | `(app)/chat/page.tsx`             | Yes    | Chat application                         |
| `/chat/settings`   | `(app)/chat/settings/page.tsx`    | Yes    | Chat preferences                         |
| `/wallet`          | `(app)/wallet/page.tsx`           | Yes    | Wallet dashboard                         |
| `/wallet/*`        | nested under `(app)/wallet/`      | Yes    | All wallet features                      |
| `/password`        | `(app)/password/page.tsx`         | Yes    | Password vault                           |
| `/password/*`      | nested under `(app)/password/`    | Yes    | generator, health, item, settings, trash |
| `/about`           | `(info)/about/page.tsx`           | No     | App info and tech stack                  |
| `/downloads`       | `(info)/downloads/page.tsx`       | No     | Platform download links                  |
| `/version`         | `(info)/version/page.tsx`         | Yes    | Build version display                    |
| `/sign-in`         | `(auth)/sign-in/page.tsx`         | Yes    | Authentication                           |
| `/sign-up`         | `(auth)/sign-up/page.tsx`         | Yes    | Registration                             |
| `/profile`         | `(auth)/profile/page.tsx`         | Yes    | Account settings                         |
| `/forget-password` | `(auth)/forget-password/page.tsx` | Yes    | Password reset request                   |
| `/reset-password`  | `(auth)/reset-password/page.tsx`  | Yes    | Password reset                           |
| `/robots.txt`      | `robots.ts`                       | No     | Crawler directives                       |
| `*`                | `not-found.tsx`                   | No     | 404 page                                 |
| `*`                | `error.tsx`                       | Yes    | Runtime error boundary                   |
| `*`                | `global-error.tsx`                | Yes    | Root-level error boundary                |

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`) — all pages
  rendered at build time
- **Server Components** by default — no `"use client"` unless the component
  needs interactivity, browser APIs, or hooks
- **Client Components** marked with `"use client"` — every showcase app, the
  error boundaries, and the info pages that read build state
- No server actions, no API routes — pure static

## State Management

- **Local state** with `useState` / `useReducer` — component-scoped state
- **No global state library**
- **Logic lives in `lib/`** as pure functions that take inputs and return
  outputs (`lib/pos/cart.ts`, `lib/pos/money.ts`), so it is unit-testable
  without React
- **Page state** is extracted into a colocated hook — POS keeps it in
  `components/pos/templates/usePosState.ts`
- **Cross-tree state** uses React Context (`providers/chat/`)
- Client-only persistence uses `localStorage` and IndexedDB (`lib/chat/db.ts`)

## Styling

- **Tailwind CSS 4** with `@tailwindcss/postcss` plugin
- **DaisyUI 5** for component classes (`btn`, `card`, `badge`, `input`, `tabs`)
- **Two themes** defined in `styles/themes.css`: `exibit-light` (default) and
  `exibit-dark`, applied via `data-theme` on `<html>`
- Every header that offers a theme toggle writes to the same
  `localStorage['exibit-theme']` key, so the toggle stays in sync across apps
- **Font**: `font-mono` set on `<body>` for monospace throughout

## Icons

- **react-icons** with Feather icons (`Fi` set) for consistency
- Import from `react-icons/fi` — e.g. `FiArrowLeft`, `FiDownload`
- Icons accept `className` for sizing

## Testing

| Location                           | Covers                                          |
| ---------------------------------- | ----------------------------------------------- |
| `<tier>/__tests__/`                | Components, colocated per tier                  |
| `lib/<app>/__tests__/`             | Pure logic                                      |
| `hooks/`, `providers/`, `data/`    | Colocated `__tests__/`                          |
| `src/app/(group)/route/__tests__/` | Route-group pages                               |
| `src/__tests__/`                   | Root-level app files (layout, error, robots, …) |

Root-level `app/` files are tested once, from `src/__tests__/`, using `@/app/…`
imports — do not create a second `src/app/__tests__/`.

## Linting

`eslint.config.mts` is a flat config built on `eslint-config-next/typescript`.
That variant is deliberate: the default `eslint-config-next` preset pulls in
`eslint-plugin-react@7.37.5`, which calls the `context.getFilename()` API that
ESLint 10 removed, and crashes on every file. For the same reason the config
declares no `languageOptions.globals` — `typescript-eslint` already disables
`no-undef` for TypeScript files.

## Performance

- Static export means zero server runtime — CDN-deployable
- Turbopack for fast dev builds
- `removeConsole` strips `console.*` in production
