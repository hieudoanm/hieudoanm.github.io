# Features

> Code — minimal VSCode / Zed editor.

## File System

- File explorer sidebar with tree view
- Create/rename/delete files and folders
- Status bar with language and position
- Auto-save (2s debounce to the real filesystem via Tauri plugin-fs)

## Editor

- Code editor with line numbers and syntax highlighting
- Tab management (open, close, reorder)
- Bracket matching and auto-closing
- Current line highlight
- Word wrap toggle
- Font size zoom (Ctrl+/-)
- Breadcrumb navigation

## Editing

- Find in file (Ctrl+F) with match count and navigation
- Find and replace (Ctrl+H) with regex support
- Find in files (Ctrl+Shift+F) with results grouped by file
- Multi-cursor editing (Ctrl+Alt+up/down, Ctrl+D)
- Auto-close HTML/JSX tags
- Move line up/down (Alt+up/down)
- Delete line (Ctrl+Shift+K)

## Command & Themes

- Command palette (Ctrl+P for files; Ctrl+Shift+P commands pending)
- Keyboard shortcuts modal (Ctrl+/)
- Theme marketplace (custom editor themes — dim/winter toggle)
- Additional language support (ts/tsx/js/jsx/py/rs/md/json/css/html/xml)

## Platform

- Tauri desktop app build (bundling configured; signing not yet)

---

See [docs/ROADMAP.md](docs/ROADMAP.md) for the full phased roadmap.
