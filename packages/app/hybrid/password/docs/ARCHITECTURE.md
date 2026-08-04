# Architecture

## Goals

- Password manager that runs as a **web app** (browser), **desktop app**
  (Tauri), and **mobile app** (Tauri Mobile)
- Static export for offline-first PWA support — the vault works fully offline
- Security-first UX: master password lock, auto-lock, clipboard auto-clear
- Atomic design system for reusable UI
- Type-safe throughout with strict TypeScript

## Tech Stack

| Layer       | Technology                         |
| ----------- | ---------------------------------- |
| Framework   | Next.js 16 (App Router, static export) |
| Language    | TypeScript 6 (strict)              |
| Styling     | Tailwind CSS 4 + DaisyUI 5         |
| Icons       | react-icons (Fi set)               |
| Desktop     | Tauri 2                            |
| Storage     | IndexedDB (`password-db`)          |
| Testing     | Jest + Playwright                  |
| Linting     | ESLint + Prettier                  |
| Package Mgr | pnpm                               |

## Directory Structure

```txt
src/
├── app/              # App Router pages ((vault), (settings) route groups)
├── components/       # Atomic design components
│   ├── atoms/        # VaultItem, StrengthMeter, TOTPBadge, CategoryIcon
│   ├── molecules/    # CredentialForm, PasswordGenerator, ItemActions
│   ├── organisms/    # Sidebar, VaultList, HealthDashboard, ShareModal
│   ├── templates/    # VaultTemplate, SettingsTemplate
│   └── RouteGuard.tsx # Auth route protection
├── data/             # Mock vault items, categories, breach data
├── hooks/            # useVault, usePasswordStrength, useTOTP, useClipboard
├── lib/              # IndexedDB wrapper (db.ts), encryption mock
├── providers/        # DataProvider, Providers, ToastProvider
├── styles/           # globals.css (Tailwind + DaisyUI)
├── types/            # TypeScript interfaces
└── utils/            # generatePassword, checkStrength, maskPassword
```

## Application Layers

```txt
┌─────────────────────────────────────────┐
│  App Router (src/app/)                  │  Routes, route groups, guards
├─────────────────────────────────────────┤
│  Templates (components/templates/)      │  VaultTemplate, SettingsTemplate
├─────────────────────────────────────────┤
│  Organisms (components/organisms/)      │  Sidebar, VaultList, HealthDashboard
├─────────────────────────────────────────┤
│  Molecules (components/molecules/)      │  CredentialForm, PasswordGenerator
├─────────────────────────────────────────┤
│  Atoms (components/atoms/)              │  VaultItem, StrengthMeter, TOTPBadge
├─────────────────────────────────────────┤
│  Hooks (hooks/)                         │  useVault, useTOTP, useClipboard
├─────────────────────────────────────────┤
│  Data layer (lib/ + data/)              │  IndexedDB wrapper, mock seed
└─────────────────────────────────────────┘
```

## Routing

| Route        | Page               | Client | Description                          |
| ------------ | ------------------ | ------ | ------------------------------------ |
| `/`          | Vault              | Yes    | All items, search, filters, favorites |
| `/item/[id]` | Item Detail        | Yes    | Credentials, notes, TOTP, sharing     |
| `/generator` | Password Generator | Yes    | Length slider, complexity, passphrase |
| `/health`    | Password Health    | Yes    | Reused/weak/breached analysis         |
| `/trash`     | Trash              | Yes    | Deleted items, restore, purge         |
| `/settings`  | Settings           | Yes    | Theme, security, auto-lock, export    |
| `/profile`   | Profile            | Yes    | User info, emergency access           |
| `/version`   | Version            | Yes    | Build version, copy to clipboard      |

Dynamic route `/item/[id]` for item detail. All others are flat routes.

## Rendering Strategy

- **Static export** (`output: 'export'` in `next.config.ts`)
- **Client Components** for all interactive pages — vault, editor, generator
- **RouteGuard** wraps protected routes and shows the master password lock
- No server actions, no API routes — pure static + IndexedDB

## State Management

- **Context providers**: `DataProvider` (vault CRUD), `ToastProvider`
  (notifications)
- **Local state** with `useState` for forms, filters, and generator options
- **Optimistic UI**: item edits apply immediately, persist in background

## Data & Persistence

- **IndexedDB** (`password-db`) stores vault items, folders, tags, settings,
  TOTP secrets, health data, share records
- **Seed on first load**: demo vault with 20+ items across all types
- **Mock network delay**: `NEXT_PUBLIC_MOCK_DELAY` (default `800`ms) applied
  before every DB operation
- **Corrupt data** falls back to safe defaults

## Security

- **Master password lock**: any non-empty password accepted in mock; persisted
  to `vault-unlocked` in localStorage
- **Auto-lock**: configurable timeout (1m, 5m, 15m, 1h, never) and on browser
  close
- **Clipboard auto-clear**: configurable 10s/30s/60s/never
- **TOTP**: QR setup, 6-digit code with circular 30s countdown
- **Masked fields**: show/hide toggle with 30s auto-hide
- **Breach/health checks**: mock analysis of weak, reused, and breached
  passwords

## Styling

- **Tailwind CSS 4** + **DaisyUI 5** (32 themes, dark default via
  `data-theme="night"`)
- **Base styles** in `globals.css` via `@layer base`
- **Skeleton loading** for vault list and item detail
- **Toast notifications** for save/copy/lock feedback

## Performance

- Static export — zero server runtime
- Virtualized lists via windowed rendering
- `removeConsole` strips `console.*` in production
- Service worker (`SWProvider`) + PWA manifest for offline caching
- `NEXT_PUBLIC_MOCK_DELAY` keeps mock latency configurable
