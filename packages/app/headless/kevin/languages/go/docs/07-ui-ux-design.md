# KeVIN (Go) — UI/UX Design

## 1. Purpose

Documents UI surfaces: CLI, TUI (bubbletea), and GUI (fyne).

## 2. CLI
- cobra-based subcommands with clear help text
- Flags with sensible defaults

## 3. TUI
- bubbletea v2-based terminal interface
- Pure Go, works in any terminal
- Shares DB state with TCP server

## 4. GUI
- fyne v2-based desktop UI
- Behind build tag; provides key/value management
- Custom theme support
