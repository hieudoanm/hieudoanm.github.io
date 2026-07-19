# FEATURE-03: TUI and GUI

## TUI (bubbletea)
- Pure Go, compiled into every build
- Opens via `serve --tui`
- Views and edits keys on the same shared DB as TCP server

## GUI (fyne)
- Behind `gui` build tag (requires CGO)
- Stub (`internal/gui/gui.go`) returns ErrUnavailable when built without tag
- Real implementation in `internal/gui/gui_fyne.go` when built with `-tags gui`
- `make build-gui` produces CGO-linked binary

Mutually exclusive with each other.
