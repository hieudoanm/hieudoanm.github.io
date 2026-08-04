# Roadmap

## Phase 1 — Core UI

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

## Phase 2 — Enhanced UX

> Polish: animations, keyboard shortcuts, drag-and-drop

- [ ] Keyboard shortcuts (Ctrl+K, Ctrl+N, Ctrl+L)
- [ ] Swipe-to-delete on mobile
- [ ] Drag-and-drop items into folders
- [ ] Page transition animations (Framer Motion)
- [ ] Skeleton loading states
- [ ] Recently used items section
- [ ] Sort options (name, date, most used)
- [ ] Bulk select and delete

## Phase 3 — Security

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

## Phase 4 — Organization

> Structure: folders, tags, trash, advanced search

- [ ] Folder creation and management
- [ ] Drag items into folders
- [ ] Tag system with filter
- [ ] Trash with restore and 30-day auto-purge
- [ ] Advanced search (by type, date range, folder, tag)
- [ ] Sort options (name, date, most used)
- [ ] Duplicate item
- [ ] Custom fields on any item type

## Phase 5 — Password Health

> Audit: weak, reused, breached, old passwords

- [ ] Overall health score (0-100)
- [ ] Weak password detection with threshold
- [ ] Reused password grouping
- [ ] Breached password check (mock)
- [ ] Old password alerts (90+ days)
- [ ] Strength breakdown chart
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

- [ ] Tauri desktop app build and signing
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] Browser extension mock (autofill popup)
- [ ] CLI tool mock (list, get, generate commands)
- [ ] Watchtower (mock: aggregated security alerts)
- [ ] Password change monitor (mock: track site password changes)
- [ ] Secure sharing via encrypted link
- [ ] Multi-vault support (Personal, Work, Family)
- [ ] Travel mode (hide sensitive vaults when crossing borders)
