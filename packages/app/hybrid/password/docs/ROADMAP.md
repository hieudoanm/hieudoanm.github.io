# Roadmap

## Phase 1 — Core UI

> Foundation: vault list, item detail, add/edit, search — **complete**

- [x] Vault list with item cards (logins, cards, notes, identities)
- [x] Item detail view with show/hide for sensitive fields
- [x] Add/edit item forms per type
- [x] Search across all items
- [x] Category filter chips
- [x] Favorites with star toggle
- [x] Copy username/password to clipboard
- [x] Demo vault seed data (24 items)
- [x] Responsive layout (sidebar + vault)

## Phase 2 — Enhanced UX

> Polish: animations, keyboard shortcuts, drag-and-drop — **complete**

- [x] Keyboard shortcuts (Ctrl+K, Ctrl+N, Ctrl+L)
- [x] Swipe-to-delete on mobile
- [x] Drag-and-drop items into folders
- [x] Page transition animations (Framer Motion)
- [x] Skeleton loading states
- [x] Recently used items section
- [x] Sort options (name, date, most used)
- [x] Bulk select and delete

## Phase 3 — Security

> Safety: master password, auto-lock, generator, TOTP — **complete**

- [x] Master password lock screen
- [x] Auto-lock on timeout (configurable — setting stored, no enforcement)
- [x] Auto-lock on browser close
- [x] Password generator (length, complexity, memorable mode)
- [x] PIN generator
- [x] Password strength meter with criteria checklist
- [x] Clipboard auto-clear (setting stored, no enforcement)
- [x] TOTP setup with QR code and countdown timer
- [x] Biometric toggle (mock)

## Phase 4 — Organization

> Structure: folders, tags, trash, advanced search — **complete**

- [x] Folder creation and management (IndexedDB store, FolderManager UI)
- [x] Drag items into folders
- [x] Tag system with filter
- [x] Trash with restore and 30-day auto-purge
- [x] Advanced search (by type, date range, folder, tag)
- [x] Sort options (name, date, most used)
- [x] Duplicate item
- [x] Custom fields on any item type

## Phase 5 — Password Health

> Audit: weak, reused, breached, old passwords — **complete**

- [x] Overall health score (0-100)
- [x] Weak password detection with threshold
- [x] Reused password grouping
- [x] Breached password check (mock)
- [x] Old password alerts (90+ days)
- [x] Strength breakdown chart
- [x] Remediation suggestions per item
- [x] Health dashboard with trends

## Phase 6 — Collaboration

> Sharing: shared items, emergency access, team vaults

- [x] Item sharing with permission levels (view/edit)
- [x] Shared with me filter
- [x] Emergency access with delay timer
- [x] Access log per item
- [x] Team vaults (mock: shared folders)
- [x] Import from CSV
- [x] Import from JSON
- [x] Export vault (encrypted JSON, plain CSV)

## Phase 7 — Platform & Integration

> Ecosystem: native apps, browser extension, CLI

- [x] Tauri desktop app build (bundling configured; signing not yet)
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] Browser extension mock (autofill popup)
- [ ] CLI tool mock (list, get, generate commands)
- [ ] Watchtower (mock: aggregated security alerts)
- [ ] Password change monitor (mock: track site password changes)
- [ ] Secure sharing via encrypted link
- [ ] Multi-vault support (Personal, Work, Family)
- [ ] Travel mode (hide sensitive vaults when crossing borders)
