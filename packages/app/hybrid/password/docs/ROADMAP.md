# Roadmap

## Phase 1 — Core UI

> Foundation: vault list, item detail, add/edit, search

- [x] Vault list with item cards (logins, cards, notes, identities)
- [x] Item detail view with show/hide for sensitive fields
- [ ] Add/edit item forms per type (add only; per-type forms pending)
- [x] Search across all items
- [x] Category filter chips
- [x] Favorites with star toggle
- [x] Copy username/password to clipboard
- [ ] Demo vault seed data (20+ items — 10 seeded today)
- [ ] Responsive layout (sidebar + vault)

## Phase 2 — Enhanced UX

> Polish: animations, keyboard shortcuts, drag-and-drop

- [ ] Keyboard shortcuts (Ctrl+K, Ctrl+N, Ctrl+L)
- [ ] Swipe-to-delete on mobile
- [ ] Drag-and-drop items into folders
- [ ] Page transition animations (Framer Motion)
- [x] Skeleton loading states
- [ ] Recently used items section
- [ ] Sort options (name, date, most used)
- [ ] Bulk select and delete

## Phase 3 — Security

> Safety: master password, auto-lock, generator, TOTP

- [ ] Master password lock screen
- [ ] Auto-lock on timeout (configurable — setting stored, no enforcement)
- [ ] Auto-lock on browser close
- [x] Password generator (length, complexity; memorable mode pending)
- [ ] PIN generator
- [x] Password strength meter with criteria checklist
- [ ] Clipboard auto-clear (setting stored, no enforcement)
- [ ] TOTP setup with QR code and countdown timer
- [ ] Biometric toggle (mock)

## Phase 4 — Organization

> Structure: folders, tags, trash, advanced search

- [ ] Folder creation and management (IndexedDB store exists, no UI)
- [ ] Drag items into folders
- [ ] Tag system with filter
- [ ] Trash with restore and 30-day auto-purge
- [ ] Advanced search (by type, date range, folder, tag)
- [ ] Sort options (name, date, most used)
- [ ] Duplicate item
- [ ] Custom fields on any item type

## Phase 5 — Password Health

> Audit: weak, reused, breached, old passwords

- [x] Overall health score (0-100)
- [x] Weak password detection with threshold
- [ ] Reused password grouping
- [ ] Breached password check (mock)
- [ ] Old password alerts (90+ days)
- [x] Strength breakdown chart
- [ ] Remediation suggestions per item
- [ ] Health dashboard with trends

## Phase 6 — Collaboration

> Sharing: shared items, emergency access, team vaults

- [ ] Item sharing with permission levels (view/edit)
- [ ] Shared with me filter
- [ ] Emergency access with delay timer
- [ ] Access log per item
- [ ] Team vaults (mock: shared folders)
- [ ] Import from CSV
- [ ] Import from JSON
- [ ] Export vault (encrypted JSON, plain CSV)

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
