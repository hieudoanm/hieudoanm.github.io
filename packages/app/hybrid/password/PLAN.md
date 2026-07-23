# Password — Password Manager

## Table of Contents

- [Password — Password Manager](#password--password-manager)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Pages](#pages)
    - [File Structure](#file-structure)
  - [Development](#development)
    - [Key Conventions](#key-conventions)
    - [Features](#features)
      - [Business Features](#business-features)
        - [Vault Items](#vault-items)
        - [Search \& Organization](#search--organization)
        - [Password Generator](#password-generator)
        - [Credential Storage](#credential-storage)
        - [Password Health](#password-health)
        - [Sharing \& Access](#sharing--access)
        - [Security Features](#security-features)
        - [Import \& Export](#import--export)
      - [Technical Features](#technical-features)
        - [Data \& Persistence](#data--persistence)
        - [UI \& Theming](#ui--theming)
        - [Master Password Lock](#master-password-lock)
        - [Password Strength Meter](#password-strength-meter)
        - [TOTP Timer](#totp-timer)
        - [Navigation \& Routing](#navigation--routing)
        - [Code Quality](#code-quality)
        - [Keyboard Shortcuts](#keyboard-shortcuts)
        - [Page Transitions](#page-transitions)
        - [Offline Support](#offline-support)
        - [Accessibility](#accessibility)
  - [Design](#design)
    - [UX for Mobile](#ux-for-mobile)
      - [Layout](#layout)
      - [Touch Targets](#touch-targets)
      - [Forms](#forms)
      - [Navigation Patterns](#navigation-patterns)
      - [Feedback](#feedback)
      - [Lists \& Scrolling](#lists--scrolling)
      - [Modals](#modals)
      - [Theming](#theming)
  - [Roadmap](#roadmap)
    - [Product Roadmap](#product-roadmap)
      - [Phase 1 — Core UI](#phase-1--core-ui)
      - [Phase 2 — Enhanced UX](#phase-2--enhanced-ux)
      - [Phase 3 — Security](#phase-3--security)
      - [Phase 4 — Organization](#phase-4--organization)
      - [Phase 5 — Password Health](#phase-5--password-health)
      - [Phase 6 — Collaboration](#phase-6--collaboration)
      - [Phase 7 — Platform \& Integration](#phase-7--platform--integration)

---

## Overview

### Tech Stack

1. **pnpm** (always pin dependencies version)
2. **ESLint** (with next)
3. **Prettier** (with tailwindcss)
4. **Jest** (coverage >= 80%)
5. **Playwright** (coverage all page level)
6. **Next.js 16** (App Router, static export)
7. **TypeScript 6** (strict mode)
8. **Tailwind CSS 4** + **DaisyUI 5** (32 themes, dark default)
9. **Tauri 2** (desktop shell)
10. **Mock data** with IndexedDB persistence

### Pages

| #   | Route        | Page               | Key Features                                         |
| --- | ------------ | ------------------ | ---------------------------------------------------- |
| 1   | `/`          | Vault              | All items list, search, category filters, favorites  |
| 2   | `/item/[id]` | Item Detail        | Credentials, notes, TOTP, history, sharing           |
| 3   | `/generator` | Password Generator | Length slider, complexity, memorable passphrase mode |
| 4   | `/health`    | Password Health    | Reused, weak, breached analysis with scores          |
| 5   | `/trash`     | Trash              | Deleted items with restore/permanent delete          |
| 6   | `/settings`  | Settings           | Theme, security, auto-lock, clipboard clear, export  |
| 7   | `/profile`   | Profile            | User info, master password, emergency access         |

### File Structure

```terminal
src/
  app/                # Next.js App Router pages
  components/
    atoms/            # VaultItem, StrengthMeter, TOTPBadge, CategoryIcon
    molecules/        # CredentialForm, PasswordGenerator, ItemActions
    organisms/        # Sidebar, VaultList, HealthDashboard, ShareModal
    templates/        # VaultTemplate, SettingsTemplate
    RouteGuard.tsx    # Auth route protection
  data/               # Mock vault items, categories, breach data
  hooks/              # useVault, usePasswordStrength, useTOTP, useClipboard
  lib/                # IndexedDB wrapper (db.ts), encryption mock
  providers/          # DataProvider, Providers, ToastProvider
  styles/             # globals.css (Tailwind + DaisyUI)
  types/              # TypeScript interfaces
  utils/              # generatePassword, checkStrength, maskPassword
src-tauri/            # Tauri desktop (Rust)
e2e/                  # Playwright E2E tests
```

---

## Development

### Key Conventions

- Arrow functions for all function declarations and component exports
- `FC` type for components
- `@/*` path aliases
- DaisyUI component classes (`btn` + `btn-*`, `card`, `input`, etc.)
- Dark theme as default
- `prettier-plugin-tailwindcss` for class sorting
- Atomic design: atoms → molecules → organisms → templates
- `console.*` with `[Module]` prefix for structured debug logging
- `console.*` stripped in production via `compiler.removeConsole`
- Mock delay via `NEXT_PUBLIC_MOCK_DELAY` env var (default `800`ms) for
  simulating network latency; applied in `db.ts` before every query

### Features

#### Business Features

##### Vault Items

- **Item types**: Logins, Cards, Identities, Secure Notes, SSH Keys — each
  with distinct icon and form fields
- **Item card**: Shows title, username/last4, category icon, favorite star,
  most-used badge
- **Item detail**: Full field display with show/hide toggles for sensitive data
- **Create item**: "+" button → type selector → pre-filled form for selected
  type
- **Edit item**: Pencil icon on detail page; all fields editable
- **Delete item**: Moves to trash; 30-day auto-purge with restore option
- **Duplicate item**: Clone with "(Copy)" suffix for quick variation creation

##### Search & Organization

- **Global search**: Ctrl+K to focus; real-time filter across title, username,
  URL, notes, tags
- **Category filter**: Sidebar chips — All, Logins, Cards, Identities, Notes,
  SSH Keys
- **Folder organization**: Create folders; drag items into folders for grouping
  (Work, Personal, Finance, Social)
- **Tags**: Add multiple tags per item; filter by tag in sidebar
- **Favorites**: Star items to pin to top of vault; separate favorites filter
- **Recently used**: Auto-populated list of last 10 accessed items
- **Sort options**: By name, date created, date modified, most used

##### Password Generator

- **Length slider**: 8–64 characters with real-time preview
- **Character toggles**: Uppercase, lowercase, numbers, symbols — each toggleable
- **Exclude ambiguous**: Toggle to exclude similar characters (0/O, 1/l/I)
- **Memorable mode**: Generates passphrase (4-6 dictionary words separated by
  hyphens) instead of random string
- **PIN mode**: Generate numeric PIN of specified length (4-8 digits)
- **One-click copy**: Copy generated password to clipboard with toast
- **Use in form**: Button to apply generated password to current item form
- **History**: Last 10 generated passwords for reference

##### Credential Storage

- **Login fields**: Title, username, password, URL, notes, custom fields
- **Card fields**: Title, card number (masked), cardholder name, expiry, CVV,
  PIN, billing address, notes
- **Identity fields**: Title, first/last name, email, phone, address, company,
  SSN (masked), notes
- **Secure notes**: Freeform rich text with monospace code block support
- **SSH keys**: Title, key type (RSA/ED25519), public key, private key
  (masked), passphrase (masked), notes
- **Custom fields**: Add arbitrary key-value pairs to any item
- **Show/hide toggle**: Eye icon on password/CVV/key fields; click to reveal
  briefly (30s auto-hide)
- **URL formatting**: Auto-prepend `https://`; favicon fetch from URL domain

##### Password Health

- **Overall score**: 0-100 health score based on composition, age, reuse
- **Weak passwords**: List of items with passwords below strength threshold
- **Reused passwords**: Grouped list showing which items share the same password
- **Breached passwords**: Mock check against known breach database; shows breach
  count and date
- **Old passwords**: Items with passwords not changed in 90+ days
- **Strength breakdown**: Visual bar chart of password strengths across vault
- **Remediation**: "Change password" button per item (opens URL in new tab mock)

##### Sharing & Access

- **Item sharing**: Share individual items with mock contacts; set permission
  level (view / edit)
- **Shared with me**: Filter showing items shared by others
- **Emergency access**: Designate trusted contacts with delay timer (24h, 48h,
  72h); they can request access after delay
- **Access log**: View who accessed shared items and when (mock data)

##### Security Features

- **Master password lock**: App-level lock screen; any non-empty password
  accepted in mock; persisted to localStorage as `vault-unlocked`
- **Auto-lock timeout**: Configurable — 1min, 5min, 15min, 1hr, never; locks
  on timeout and browser close
- **Clipboard auto-clear**: Clear clipboard after 10s, 30s, 60s, or never
- **Two-factor authentication**: TOTP setup with QR code display; 6-digit code
  with circular countdown timer
- **Biometric toggle**: UI toggle on Settings (mock — persists preference to
  localStorage)
- **Login notifications**: Mock alerts for new device/location logins
- **Session management**: View active sessions; revoke individual sessions

##### Import & Export

- **Import CSV**: Upload CSV, map columns (url, username, password, name),
  preview, import
- **Import JSON**: Paste JSON in standard format; preview and import
- **Export vault**: Download all items as encrypted JSON or plain CSV
- **Export single item**: Export individual item as JSON
- **Import history**: Log of all import operations with item counts

#### Technical Features

##### Data & Persistence

- **IndexedDB storage**: Vault items, folders, tags, settings, TOTP secrets,
  health data, share records stored in `password-db`
- **Seed on first load**: Demo vault with 20+ items across all types (logins,
  cards, identities, notes, SSH keys) with realistic data
- **Mock network delay**: `NEXT_PUBLIC_MOCK_DELAY` (default 800ms) applied
  before every DB operation
- **Optimistic UI**: Item edits apply immediately; persist in background
- **CRUD operations**: Full create/read/update/delete for all item types

##### UI & Theming

- **32 DaisyUI themes**: Dark/light toggle with visual theme picker; persisted
  to `data-theme` attribute and localStorage
- **Skeleton loading**: Vault list and item detail skeletons during load
- **Toast notifications**: In-app toast system via `ToastProvider`; auto-dismiss
  with success/error/info variants
- **Responsive layout**: Sidebar + vault on desktop; full-screen vault with
  hamburger on mobile; breakpoints at `md:` (768px)

##### Master Password Lock

- **Lock screen**: Full-screen overlay with master password input and app logo
- **Unlock**: Any non-empty password accepted in mock; sets `vault-unlocked`
  in localStorage
- **Lock on close**: Automatically locks when browser tab/window closes
- **Lock on timeout**: Configurable inactivity timer triggers lock
- **Lock button**: Manual lock button in header and settings

##### Password Strength Meter

- **Visual bar**: 4-segment colored bar (red → orange → yellow → green)
- **Score label**: Weak / Fair / Good / Strong / Very Strong
- **Criteria display**: Checklist showing length, uppercase, lowercase, numbers,
  symbols — green check when met
- **Real-time update**: Meter updates as user types in password field

##### TOTP Timer

- **Circular countdown**: SVG ring depleting over 30-second interval
- **Code display**: 6-digit monospace code with copy button
- **Auto-refresh**: New code generated at each 30s boundary
- **Color change**: Ring turns red when < 5 seconds remaining

##### Navigation & Routing

- **Route groups**: Pages organized into `(vault)`, `(settings)` — URLs
  unaffected, code logically grouped
- **Dynamic routes**: `/item/[id]` for item detail
- **Back navigation**: Consistent `FiArrowLeft` + `btn-neutral btn-sm btn-circle`

##### Code Quality

- **Arrow functions**: All function declarations and component exports use arrow
  syntax; test files excluded
- **Debug logging**: `console.*` with `[Module]` prefix throughout source;
  stripped from production via `compiler.removeConsole`
- **Testing**: Jest (unit) + Playwright (E2E) framework ready
- **Atomic design**: atoms → molecules → organisms → templates hierarchy

##### Keyboard Shortcuts

- **Ctrl+K**: Focus search
- **Ctrl+N**: New vault item
- **Ctrl+G**: Go to password generator
- **Ctrl+L**: Lock vault
- **Ctrl+/**: Show keyboard shortcuts modal
- **Escape**: Close modals and overlays

##### Page Transitions

- **`PageTransition` component**: Framer Motion wrapper with fade + slide-up
  variants (opacity 0→1, y 12→0, 200ms ease-out)

##### Offline Support

- **`OfflineBanner`**: Fixed top banner; listens to `online`/`offline` events
- **Cached vault**: All data in IndexedDB; fully functional offline
- **PWA manifest**: Standalone display, portrait orientation

##### Accessibility

- **Focus-visible**: Global `focus-visible:outline-primary` on interactive
  elements
- **ARIA labels**: Vault list, item forms, generator, health dashboard
- **Keyboard navigation**: Full vault list and form navigation via keyboard
- **Screen reader**: Strength score and TOTP code announced via aria

---

## Design

### UX for Mobile

#### Layout

- **Full-screen vault** on mobile; sidebar accessed via hamburger menu
- **Sticky search bar** at top of vault list
- **Item cards** with icon, title, username, and favorite star
- **Bottom action bar**: Add item, Generator, Health shortcuts
- **Safe area** respected for devices with notches/home indicators

#### Touch Targets

- Minimum `44px` tap target for all interactive elements
- **Copy buttons**: Large tap target next to password fields
- **Show/hide toggle**: Eye icon easily reachable on mobile
- **Favorite star**: Tap to toggle with haptic feedback

#### Forms

- **Floating labels** for all inputs — label stays visible after focus
- **Password field** with show/hide toggle and copy button inline
- **Type selector**: Visual cards for item type selection (Login, Card, Note)
- **Submit buttons** full-width for easy thumb reach

#### Navigation Patterns

- **Sidebar toggle**: Hamburger icon on mobile, persistent sidebar on desktop
- **Back button**: `FiArrowLeft` on item detail and sub-pages
- **Swipe-to-action**: Swipe left on vault item for quick copy/delete

#### Feedback

- **Toast notifications**: Item saved, password copied, vault locked
- **Skeleton loading**: Vault list skeleton during initial load
- **Strength meter**: Visual feedback as password is typed
- **Haptic feedback**: On copy, lock, and save actions

#### Lists & Scrolling

- **Vault list**: `flex flex-col gap-2` for consistent item card spacing
- **Filter chips**: Horizontal scroll on mobile for category filters
- **Recently used**: Horizontal card scroll at top of vault

#### Modals

- **Delete confirmation**: Before moving item to trash
- **Share modal**: Contact selection with permission level
- **Import modal**: Step-by-step wizard with preview

#### Theming

- **Dark mode default** (`data-theme="night"`) for security-focused comfort
- **Theme picker** on Settings page with visual preview
- **Masked fields** styled with monospace font and dots

---

## Roadmap

### Product Roadmap

#### Phase 1 — Core UI

> Foundation: vault list, item detail, add/edit, search

- [ ] Vault list with item cards (logins, cards, notes, identities)
- [ ] Item detail view with show/hide for sensitive fields
- [ ] Add/edit item forms per type
- [ ] Search across all items
- [ ] Category filter chips
- [ ] Favorites with star toggle
- [ ] Copy username/password to clipboard
- [ ] Demo vault seed data (20+ items)
- [ ] Responsive layout (sidebar + vault)

#### Phase 2 — Enhanced UX

> Polish: animations, keyboard shortcuts, drag-and-drop

- [ ] Keyboard shortcuts (Ctrl+K, Ctrl+N, Ctrl+L)
- [ ] Swipe-to-delete on mobile
- [ ] Drag-and-drop items into folders
- [ ] Page transition animations (Framer Motion)
- [ ] Skeleton loading states
- [ ] Recently used items section
- [ ] Sort options (name, date, most used)
- [ ] Bulk select and delete

#### Phase 3 — Security

> Safety: master password, auto-lock, generator, TOTP

- [ ] Master password lock screen
- [ ] Auto-lock on timeout (configurable)
- [ ] Auto-lock on browser close
- [ ] Password generator (length, complexity, memorable mode)
- [ ] PIN generator
- [ ] Password strength meter with criteria checklist
- [ ] Clipboard auto-clear (configurable timer)
- [ ] TOTP setup with QR code and countdown timer
- [ ] Biometric toggle (mock)

#### Phase 4 — Organization

> Structure: folders, tags, trash, advanced search

- [ ] Folder creation and management
- [ ] Drag items into folders
- [ ] Tag system with filter
- [ ] Trash with restore and 30-day auto-purge
- [ ] Advanced search (by type, date range, folder, tag)
- [ ] Sort options (name, date, most used)
- [ ] Duplicate item
- [ ] Custom fields on any item type

#### Phase 5 — Password Health

> Audit: weak, reused, breached, old passwords

- [ ] Overall health score (0-100)
- [ ] Weak password detection with threshold
- [ ] Reused password grouping
- [ ] Breached password check (mock)
- [ ] Old password alerts (90+ days)
- [ ] Strength breakdown chart
- [ ] Remediation suggestions per item
- [ ] Health dashboard with trends

#### Phase 6 — Collaboration

> Sharing: shared items, emergency access, team vaults

- [ ] Item sharing with permission levels (view/edit)
- [ ] Shared with me filter
- [ ] Emergency access with delay timer
- [ ] Access log per item
- [ ] Team vaults (mock: shared folders)
- [ ] Import from CSV
- [ ] Import from JSON
- [ ] Export vault (encrypted JSON, plain CSV)

#### Phase 7 — Platform & Integration

> Ecosystem: native apps, browser extension, CLI

- [ ] Tauri desktop app build and signing
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] Browser extension mock (autofill popup)
- [ ] CLI tool mock (list, get, generate commands)
- [ ] Watchtower (mock: aggregated security alerts)
- [ ] Password change monitor (mock: track site password changes)
- [ ] Secure sharing via encrypted link
- [ ] Multi-vault support (Personal, Work, Family)
- [ ] Travel mode (hide sensitive vaults when crossing borders)
