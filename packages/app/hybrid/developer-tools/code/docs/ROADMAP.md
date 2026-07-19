# Roadmap

## Phase 1 — Core

> Foundation: file explorer, code editor, tabs, terminal

- [x] File explorer sidebar with tree view
- [x] Code editor with line numbers and syntax highlighting
- [x] Tab management (open, close, reorder)
- [ ] Basic terminal panel with mock commands
- [x] Create/rename/delete files and folders
- [x] Status bar with language and position
- [x] Auto-save (2s debounce to the real filesystem via Tauri plugin-fs)
- [ ] Demo project seed data

## Phase 2 — Enhanced

> Polish: keyboard shortcuts, minimap, bracket matching

- [x] Command palette (Ctrl+P for files; Ctrl+Shift+P commands pending)
- [ ] Minimap on editor
- [x] Bracket matching and auto-closing
- [x] Current line highlight
- [x] Word wrap toggle (button; Alt+Z binding pending)
- [x] Font size zoom (Ctrl+/-)
- [x] Keyboard shortcuts modal (Ctrl+/)
- [ ] Page transition animations (Framer Motion)
- [ ] Skeleton loading states

## Phase 3 — Rich Editing

> Editing: find & replace, snippets, multi-cursor

- [x] Find in file (Ctrl+F) with match count and navigation
- [x] Find and replace (Ctrl+H) with regex support
- [x] Find in files (Ctrl+Shift+F) with results grouped by file
- [x] Multi-cursor editing (Ctrl+Alt+up/down, Ctrl+D)
- [ ] Snippets with Tab expansion
- [x] Auto-close HTML/JSX tags
- [x] Move line up/down (Alt+up/down)
- [x] Delete line (Ctrl+Shift+K)
- [ ] Toggle comment (Ctrl+/ — bound to shortcuts modal)

## Phase 4 — Developer Tools

> Tools: git, diff, advanced terminal

- [ ] Source control panel with file status icons
- [ ] Diff view (side-by-side and inline)
- [ ] Commit with message input
- [ ] Branch display and mock switching
- [ ] Staging/unstaging individual files
- [ ] Split editor view (side-by-side)
- [ ] Tab groups with Ctrl+1/2/3 switching
- [ ] Multiple terminal instances with tabs
- [x] Breadcrumb navigation

## Phase 5 — Collaboration

> Sharing: real-time, review, comments

- [ ] Mock real-time collaboration cursors
- [ ] Code review comments on lines
- [ ] Change tracking with author attribution
- [ ] Branch comparison view
- [ ] Merge conflict resolution UI
- [ ] File history timeline
- [ ] Code review approval workflow

## Phase 6 — Extensions

> Extensibility: themes, languages, keybindings

- [x] Theme marketplace (custom editor themes — dim/winter toggle)
- [x] Additional language support (ts/tsx/js/jsx/py/rs/md/json/css/html/xml,
      bundled statically)
- [ ] Custom keybinding editor
- [ ] Extension manager UI
- [ ] Language server protocol (mock LSP diagnostics)
- [ ] Format document on save
- [ ] Linting integration (mock ESLint output in problems panel)

## Phase 7 — Platform & Integration

> Ecosystem: native, remote, containers

- [x] Tauri desktop app build (bundling configured; signing not yet)
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] Remote SSH editing (mock: connect to remote filesystem)
- [ ] Container support (mock: Docker dev environment)
- [ ] Integrated debugger (mock: breakpoints, variables, call stack)
- [ ] Package manager UI (mock: npm/pnpm install from sidebar)
- [ ] Task runner integration (mock: run scripts from sidebar)
- [ ] AI code completion (mock: inline suggestions)
