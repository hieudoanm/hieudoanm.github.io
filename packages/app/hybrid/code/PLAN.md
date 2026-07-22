# Code — Code Editor

## Table of Contents

- [Code — Code Editor](#code--code-editor)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Tech Stack](#tech-stack)
    - [Pages](#pages)
    - [File Structure](#file-structure)
  - [Development](#development)
    - [Key Conventions](#key-conventions)
    - [Features](#features)
      - [Business Features](#business-features)
        - [File Explorer](#file-explorer)
        - [Code Editor](#code-editor)
        - [Tab Management](#tab-management)
        - [Terminal](#terminal)
        - [Find \& Replace](#find--replace)
        - [Git Integration](#git-integration)
        - [Command Palette](#command-palette)
        - [Status Bar \& Breadcrumbs](#status-bar--breadcrumbs)
        - [Themes \& Appearance](#themes--appearance)
        - [Snippets \& Auto-Complete](#snippets--auto-complete)
        - [Diff Viewer](#diff-viewer)
      - [Technical Features](#technical-features)
        - [Data \& Persistence](#data--persistence)
        - [UI \& Theming](#ui--theming)
        - [Code Editing](#code-editing)
        - [Syntax Highlighting](#syntax-highlighting)
        - [Navigation \& Routing](#navigation--routing)
        - [Code Quality](#code-quality)
        - [Keyboard Shortcuts](#keyboard-shortcuts)
        - [Responsive Layout](#responsive-layout)
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
      - [Phase 3 — Rich Editing](#phase-3--rich-editing)
      - [Phase 4 — Developer Tools](#phase-4--developer-tools)
      - [Phase 5 — Collaboration](#phase-5--collaboration)
      - [Phase 6 — Extensions](#phase-6--extensions)
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

| #   | Route             | Page        | Key Features                                             |
| --- | ----------------- | ----------- | -------------------------------------------------------- |
| 1   | `/`               | Editor      | File explorer sidebar, code editor, terminal panel, tabs |
| 2   | `/file/[...path]` | File Editor | Open file in editor with full syntax highlighting        |
| 3   | `/settings`       | Settings    | Theme, font size, tab width, keybindings, editor prefs   |
| 4   | `/profile`        | Profile     | User info                                                |

### File Structure

```terminal
src/
  app/                # Next.js App Router pages
  components/
    atoms/            # LineNumbers, Tab, StatusBar, Breadcrumb
    molecules/        # EditorPane, FileTreeItem, TerminalLine
    organisms/        # Sidebar, EditorGroup, TerminalPanel, CommandPalette
    templates/        # EditorTemplate, SettingsTemplate
    RouteGuard.tsx    # Auth route protection
  data/               # Mock files, themes, snippets
  hooks/              # useEditor, useFileTree, useTerminal, useKeyboard
  lib/                # IndexedDB wrapper (db.ts), syntax engine
  providers/          # DataProvider, Providers, ToastProvider
  styles/             # globals.css (Tailwind + DaisyUI)
  types/              # TypeScript interfaces
  utils/              # formatCode, iconMap, diffEngine
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

##### File Explorer

- **Tree view**: Hierarchical folder/file display with expand/collapse
  triangles; indentation per depth level; folder icons toggle open/closed
- **File icons**: Extension-based icons (folder, JS/TS, HTML, CSS, JSON, MD,
  image, config) via icon map
- **Create file/folder**: Context menu → "New File" / "New Folder"; inline
  rename input appears immediately
- **Rename**: Double-click or context menu → Rename; inline edit with Enter to
  confirm, Escape to cancel
- **Delete**: Context menu → Delete with confirmation modal
- **Drag-and-drop**: Move files between folders via drag; drop indicator line
  shows target location
- **Collapse all**: Button to collapse entire tree to root level
- **New file at root**: "+" button at sidebar header creates file in project
  root

##### Code Editor

- **Syntax highlighting**: Language-aware coloring for 30+ languages (JS, TS,
  Python, Rust, Go, HTML, CSS, JSON, Markdown, SQL, etc.)
- **Line numbers**: Left gutter with line numbers; current line highlighted
- **Word wrap**: Toggle-able word wrap (Alt+Z); respects user preference
- **Minimap**: Right-side overview of entire file; click to jump to position
- **Multi-cursor**: Ctrl+Alt+↑/↓ to add cursors; Ctrl+D to select next
  occurrence; Ctrl+Shift+L select all occurrences
- **Bracket matching**: Highlight matching brackets; auto-close brackets and
  quotes
- **Auto-indent**: Indent new lines to match surrounding code; auto-dedent on
  `}` and `]`
- **Tab/Spaces**: Configurable (2 or 4 spaces, or tabs) per language
- **Font size**: Ctrl+/- to zoom; persisted preference
- **Current line highlight**: Subtle background tint on active line
- **Selection highlight**: All occurrences of selected text highlighted
- **Undo/redo**: Full undo/redo stack per file (Ctrl+Z / Ctrl+Shift+Z)

##### Tab Management

- **Open/close tabs**: Click file in explorer → opens in new tab; × to close
- **Tab overflow**: Horizontal scroll when tabs exceed viewport width
- **Active tab indicator**: Primary-colored underline on active tab
- **Unsaved indicator**: Dot on tab for modified files
- **Close others**: Context menu → "Close Others", "Close All", "Close Saved"
- **Split view**: Drag tab to right half → split editor side-by-side
- **Tab groups**: Multiple editor groups; Ctrl+1/2/3 to switch between groups
- **Reorder tabs**: Drag tabs to reorder within a group
- **Pin tab**: Pin important files to prevent accidental close

##### Terminal

- **Mock shell**: Simulated terminal with command history and predefined outputs
- **Command history**: ↑/↓ arrow keys cycle through previous commands
- **Clear**: `clear` command or button to clear terminal output
- **Output display**: Predefined mock outputs for common commands (`ls`, `cat`,
  `git status`, `npm run dev`, etc.)
- **Resizable**: Drag terminal border to resize; collapse to bottom
- **Multiple terminals**: Tab bar to create/switch between terminal instances
- **Working directory**: Displayed in prompt; changes with `cd` mock

##### Find & Replace

- **In-file search**: Ctrl+F opens search bar; highlights all matches; prev/next
  navigation with count
- **Regex mode**: Toggle regex for advanced pattern matching
- **Case sensitive**: Toggle case sensitivity
- **Whole word**: Toggle whole-word matching
- **Replace**: Single replace or replace-all; confirmation for replace-all
- **Find in files**: Ctrl+Shift+F searches across all files; results grouped by
  file with line preview

##### Git Integration

- **Source control panel**: Sidebar section showing changed files with status
  icons (M, A, D, U)
- **Diff view**: Side-by-side or inline diff for modified files
- **Commit**: Message input + commit button; mock commit hash generation
- **Branch display**: Current branch shown in status bar; dropdown to switch
  (mock branches: main, develop, feature/*)
- **Staging**: Stage individual files or stage all; unstage support
- **Mock status commands**: `git status`, `git log` (5 recent commits),
  `git diff`

##### Command Palette

- **Ctrl+P fuzzy search**: Opens palette overlay; type to filter files by name
- **Command mode**: Type `>` to switch to command mode (Open Settings, Toggle
  Terminal, Format Document, etc.)
- **Recent files**: Shows recently opened files when palette opens empty
- **Keyboard navigation**: ↑/↓ to navigate results; Enter to select; Escape to
  close

##### Status Bar & Breadcrumbs

- **Status bar**: Bottom bar showing language mode, line/col position, encoding
  (UTF-8), indentation (Spaces: 2), git branch
- **Breadcrumbs**: Path bar below tabs showing file location with clickable
  segments for parent directories
- **Click breadcrumb segment**: Navigate to that level in file tree

##### Themes & Appearance

- **Editor themes**: Monokai, Dracula, GitHub Dark, One Dark Pro, Solarized
  Dark, Nord, Tokyo Night — applied via CSS variables
- **Font family**: Monospace font selector (Fira Code, JetBrains Mono, Source
  Code Pro)
- **Font ligatures**: Toggle ligatures on/off
- **Font size**: 12–24px slider
- **Line height**: Adjust line spacing

##### Snippets & Auto-Complete

- **Snippet snippets**: Type prefix → Tab expands (e.g., `fn` → `function() {}`,
  `cl` → `console.log()`)
- **Language-specific**: JS/TS: arrow function, async/await, import; HTML:
  boilerplate; CSS: media query
- **Auto-close tags**: HTML/JSX tag auto-closing with `</` prefix
- **Bracket auto-close**: `(`, `[`, `{`, `"`, `'`, `` ` `` auto-close on type

##### Diff Viewer

- **Side-by-side**: Two panes showing original vs modified
- **Inline**: Unified diff with +/- line indicators
- **Highlight changes**: Word-level highlighting within changed lines
- **Navigate changes**: Jump between change hunks with ↑/↓ arrows

#### Technical Features

##### Data & Persistence

- **IndexedDB storage**: Files, folders, open tabs, settings, recent files, git
  mock state stored in `code-db`
- **Seed on first load**: Demo project with sample files (index.ts, styles.css,
  README.md, component files, config)
- **Mock network delay**: `NEXT_PUBLIC_MOCK_DELAY` (default 800ms) applied
  before every DB operation
- **Optimistic UI**: File edits apply immediately in editor; persist to
  IndexedDB in background
- **Auto-save**: Debounced save (1 second) after last keystroke

##### UI & Theming

- **32 DaisyUI themes**: Dark/light toggle for UI chrome; editor uses separate
  syntax themes
- **Skeleton loading**: Editor skeleton with sidebar and line number
  placeholders
- **Toast notifications**: In-app toast system via `ToastProvider`; auto-dismiss
- **Responsive layout**: Sidebar + editor on desktop; collapsible panels on
  mobile; breakpoints at `md:` (768px)

##### Code Editing

- **Textarea-based editor**: Custom editor built on controlled textarea with
  overlay rendering for syntax highlighting
- **Cursor position tracking**: Real-time line/column tracking via selection API
- **Selection support**: Click, double-click (word), triple-click (line),
  Shift+click (range), Ctrl+A (all)
- **Scroll sync**: Line numbers, minimap, and editor scroll stay synchronized

##### Syntax Highlighting

- **Prism.js** or **highlight.js**: Language detection from file extension;
  token-based coloring
- **Dynamic loading**: Load language grammar on demand to reduce bundle size
- **Fallback**: Plain text highlighting for unknown languages

##### Navigation & Routing

- **Route groups**: Pages organized into `(editor)`, `(settings)` — URLs
  unaffected, code logically grouped
- **Dynamic routes**: `/file/[...path]` for file editing
- **Back navigation**: Consistent `FiArrowLeft` +
  `btn-neutral btn-sm btn-circle`

##### Code Quality

- **Arrow functions**: All function declarations and component exports use arrow
  syntax; test files excluded
- **Debug logging**: `console.*` with `[Module]` prefix throughout source;
  stripped from production via `compiler.removeConsole`
- **Testing**: Jest (unit) + Playwright (E2E) framework ready
- **Atomic design**: atoms → molecules → organisms → templates hierarchy

##### Keyboard Shortcuts

- **Ctrl+P**: Command palette (files)
- **Ctrl+Shift+P**: Command palette (commands)
- **Ctrl+S**: Save file
- **Ctrl+F**: Find in file
- **Ctrl+H**: Find and replace
- **Ctrl+Shift+F**: Find in files
- **Ctrl+Z / Ctrl+Shift+Z**: Undo / redo
- **Ctrl+/**: Toggle comment
- **Ctrl+D**: Select next occurrence
- **Ctrl+Shift+K**: Delete line
- **Alt+↑/↓**: Move line up/down
- **Ctrl+Enter**: Open terminal
- **Ctrl+`**: Toggle terminal

##### Responsive Layout

- **Resizable panels**: Drag borders between sidebar, editor, and terminal
- **Collapse sidebar**: Toggle button to hide file explorer
- **Collapse terminal**: Drag or button to minimize terminal to tab
- **Mobile**: Full-screen editor with hamburger for sidebar and terminal

##### Page Transitions

- **`PageTransition` component**: Framer Motion wrapper with fade + slide-up
  variants (opacity 0→1, y 12→0, 200ms ease-out)

##### Offline Support

- **`OfflineBanner`**: Fixed top banner; listens to `online`/`offline` events
- **Cached files**: All files persist in IndexedDB; fully functional offline
- **PWA manifest**: Standalone display, portrait orientation

##### Accessibility

- **Focus-visible**: Global `focus-visible:outline-primary` on interactive
  elements
- **ARIA labels**: File tree, tabs, terminal, command palette, status bar
- **Keyboard navigation**: Full file tree and tab navigation via keyboard
- **Screen reader**: Terminal output announced via `aria-live="polite"`

---

## Design

### UX for Mobile

#### Layout

- **Full-screen editor** by default; sidebar and terminal accessed via swipe or
  hamburger menu
- **Tab bar** horizontally scrollable above editor
- **Status bar** at bottom with language, position, git branch
- **Safe area** respected for devices with notches/home indicators

#### Touch Targets

- Minimum `44px` tap target for all interactive elements
- **File tree items**: Full-width touch targets with padding
- **Tab close buttons**: Adequately sized for thumb tap

#### Forms

- **Search bar** in command palette with auto-focus
- **Commit message input** in source control panel
- **Settings inputs** use DaisyUI `input` with clear labels

#### Navigation Patterns

- **Swipe from left**: Opens file explorer sidebar on mobile
- **Swipe from bottom**: Opens terminal panel
- **Back button**: `FiArrowLeft` on sub-pages

#### Feedback

- **Toast notifications**: File saved, clipboard copied, error messages
- **Skeleton loading**: Editor skeleton during file load
- **Cursor position**: Real-time line/col in status bar

#### Lists & Scrolling

- **File tree**: Scrollable with expand/collapse
- **Command palette results**: Scrollable list with keyboard navigation
- **Tab overflow**: Horizontal scroll with gradient fade on edges

#### Modals

- **Delete confirmation**: Before deleting files
- **Unsaved changes**: Before closing modified tabs
- **Settings modal**: Editor preferences overlay

#### Theming

- **Dark mode default** (`data-theme="night"`) for coding comfort
- **Separate editor themes**: Syntax colors independent of UI theme
- **Theme picker** with live preview in settings

---

## Roadmap

### Product Roadmap

#### Phase 1 — Core UI

> Foundation: file explorer, code editor, tabs, terminal

- [ ] File explorer sidebar with tree view
- [ ] Code editor with line numbers and syntax highlighting
- [ ] Tab management (open, close, reorder)
- [ ] Basic terminal panel with mock commands
- [ ] Create/rename/delete files and folders
- [ ] Status bar with language and position
- [ ] Auto-save to IndexedDB
- [ ] Demo project seed data

#### Phase 2 — Enhanced UX

> Polish: keyboard shortcuts, minimap, bracket matching

- [ ] Command palette (Ctrl+P for files, Ctrl+Shift+P for commands)
- [ ] Minimap on editor
- [ ] Bracket matching and auto-closing
- [ ] Current line highlight
- [ ] Word wrap toggle (Alt+Z)
- [ ] Font size zoom (Ctrl+/-)
- [ ] Keyboard shortcuts modal (Ctrl+/)
- [ ] Page transition animations (Framer Motion)
- [ ] Skeleton loading states

#### Phase 3 — Rich Editing

> Editing: find & replace, snippets, multi-cursor

- [ ] Find in file (Ctrl+F) with match count and navigation
- [ ] Find and replace (Ctrl+H) with regex support
- [ ] Find in files (Ctrl+Shift+F) with results grouped by file
- [ ] Multi-cursor editing (Ctrl+Alt+↑/↓, Ctrl+D)
- [ ] Snippets with Tab expansion
- [ ] Auto-close HTML/JSX tags
- [ ] Move line up/down (Alt+↑/↓)
- [ ] Delete line (Ctrl+Shift+K)
- [ ] Toggle comment (Ctrl+/)

#### Phase 4 — Developer Tools

> Tools: git, diff, advanced terminal

- [ ] Source control panel with file status icons
- [ ] Diff view (side-by-side and inline)
- [ ] Commit with message input
- [ ] Branch display and mock switching
- [ ] Staging/unstaging individual files
- [ ] Split editor view (side-by-side)
- [ ] Tab groups with Ctrl+1/2/3 switching
- [ ] Multiple terminal instances with tabs
- [ ] Breadcrumb navigation

#### Phase 5 — Collaboration

> Sharing: real-time, review, comments

- [ ] Mock real-time collaboration cursors
- [ ] Code review comments on lines
- [ ] Change tracking with author attribution
- [ ] Branch comparison view
- [ ] Merge conflict resolution UI
- [ ] File history timeline
- [ ] Code review approval workflow

#### Phase 6 — Extensions

> Extensibility: themes, languages, keybindings

- [ ] Theme marketplace (custom editor themes)
- [ ] Additional language support via plugin loading
- [ ] Custom keybinding editor
- [ ] Extension manager UI
- [ ] Language server protocol (mock LSP diagnostics)
- [ ] Format document on save
- [ ] Linting integration (mock ESLint output in problems panel)

#### Phase 7 — Platform & Integration

> Ecosystem: native, remote, containers

- [ ] Tauri desktop app build and signing
- [ ] iOS/Android native shells (Capacitor or Tauri Mobile)
- [ ] Remote SSH editing (mock: connect to remote filesystem)
- [ ] Container support (mock: Docker dev environment)
- [ ] Integrated debugger (mock: breakpoints, variables, call stack)
- [ ] Package manager UI (mock: npm/pnpm install from sidebar)
- [ ] Task runner integration (mock: run scripts from sidebar)
- [ ] AI code completion (mock: inline suggestions)
