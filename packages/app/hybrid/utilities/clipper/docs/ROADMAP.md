# Roadmap

> Minimal, local-first clipboard manager. No sign-in. Data stays on device in
> SQLite. Clipboard monitoring lives in Rust; the UI is a thin, testable layer
> on top of that backend.

## Phase 1 — Core (In Progress)

> Foundation: history storage, search, pinning, basic UI

- [x] Project setup (Next.js 16, TypeScript, Tailwind, DaisyUI, Jest, Tauri)
- [x] Tauri backend with SQLite storage (rusqlite, bundled)
- [x] Clipboard history display (list view with timestamps)
- [x] Search through clipboard history
- [x] Pin/unpin entries
- [x] Delete individual entries
- [x] Clear all unpinned history
- [x] Copy entry back to clipboard
- [x] Basic UI with custom "clipper" dark theme
- [x] Stats bar (total, pinned counts)
- [x] Error boundaries (error.tsx, global-error.tsx, not-found.tsx)
- [x] Unit tests (Jest)
- [x] Documentation (ARCHITECTURE, CONTRIBUTING, DOWNLOADS, FEATURES, PACKAGING,
      ROADMAP)

## Phase 2 — Enhanced Features

> Polish: real-time monitoring, image preview, keyboard shortcuts

- [ ] Real-time clipboard monitoring (auto-detect new copies)
- [ ] Image preview for image clipboard entries
- [ ] Keyboard shortcuts (Ctrl+Shift+V to show, Ctrl+C to copy)
- [ ] Settings page (theme, history size limit, auto-clear timer)
- [ ] Export history as text/JSON
- [ ] Import history from JSON

## Phase 3 — Organization

> Structure: categories, favorites, advanced filtering

- [ ] Categories/tags for clipboard entries
- [ ] Favorites (separate from pin)
- [ ] Advanced filtering (by type, date range, category)
- [ ] Sort options (newest, oldest, most copied)
- [ ] Bulk select and delete
- [ ] Duplicate detection

## Phase 4 — Platform & Polish

> Ship it everywhere and make it pleasant to use

- [ ] PWA — offline, installable (manifest + service worker)
- [ ] Tray icon with quick access menu
- [ ] Global hotkey to show/hide clipboard window
- [ ] Window positioning (remember last position)
- [ ] Auto-start on login
- [ ] Theme customization (light/dark/system)
- [ ] Accessibility — keyboard navigation, ARIA labels
- [ ] E2E coverage with Playwright

## Phase 5 — Advanced

> Power features: sync, OCR, smart suggestions

- [ ] Clipboard sync across devices (encrypted)
- [ ] OCR for image content (extract text from screenshots)
- [ ] Smart suggestions (predict what you'll paste next)
- [ ] Snippet manager (save frequently used text)
- [ ] Code snippet detection (syntax highlighting)
- [ ] URL/link detection and preview
- [ ] Phone number and email detection
