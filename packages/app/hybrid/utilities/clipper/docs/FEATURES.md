# Features

> Clipper — minimal clipboard manager with history, search, and pinning.

## Core

- Clipboard history tracking — automatically records all copied content
- Search through clipboard history
- Pin important items to keep them at the top
- Delete individual entries or clear all unpinned history
- Copy any entry back to clipboard with one click

## History

- Real-time clipboard monitoring via native Rust backend
- Text content storage with full-text search
- Image content support (type tracking, preview coming soon)
- Timestamp display with relative time ("5m ago", "2h ago", "3d ago")
- Copy count tracking per entry
- Pinned entries sorted to top of list

## Organization

- Pin/unpin toggle on each entry
- Pinned entries highlighted with primary color accent
- Clear all unpinned history in one action
- Search with instant filter as you type
- Empty state with helpful guidance

## Platform

- macOS-first with native clipboard monitoring
- Tauri desktop app for dedicated clipboard management
- Web app fallback for browser access
- SQLite persistence — history survives app restarts
- Dark theme as default (custom "clipper" theme)

## Rust Backend

- SQLite database via rusqlite (bundled, no external deps)
- Native clipboard access via arboard
- Cross-platform file paths via dirs crate
- Timestamps via chrono

---

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.
