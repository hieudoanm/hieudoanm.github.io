# UI / UX Design

Landify has two user-facing editors:

## Terminal editor (`landify tui`)

A bubbletea app that ships in every build (no build tag, no CGO). A `textarea`
YAML pane plus a `:` command line (`save`, `reload`, `validate`, `build`,
`generate`, `theme`, `help`, `quit`). Esc toggles editor/command modes;
Ctrl-C/Ctrl-Q quit. A dirty `•` marks unsaved edits.

## Desktop studio (`landify studio`)

A fyne app compiled only with the `gui` build tag (`make build-gui`, CGO
enabled). Split YAML editor / live HTML preview with inline validation issues,
theme studio (64 presets, color pickers, WCAG contrast readouts), forms mode,
generic collection editors, multi-document tabs, and one-click build + preview
+ browser open with file-watch auto-rebuild.

Pure logic shared with the GUI (`doc.go`, `nodeops.go`, `schema.go`, `wcag.go`)
must stay fyne-free so the default build and tests remain CGO-free.
