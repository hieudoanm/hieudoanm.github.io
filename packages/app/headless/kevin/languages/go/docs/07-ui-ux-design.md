# KeVIN (Go) — UI/UX Design

## 1. Purpose

Documents UI surfaces: CLI, TUI (bubbletea), and GUI (fyne) — tokens, layout,
states, and accessibility — plus the interactive HTML prototypes that preview
the GUI before it is built.

## 2. CLI

- cobra-based subcommands with clear help text
- Flags with sensible defaults
- `serve --port` (default 6379), `serve --gui`, `serve --tui`; `mcp serve`

## 3. TUI

- bubbletea v2-based terminal interface
- Pure Go, works in any terminal
- Shares DB state with TCP server

## 4. GUI

- fyne v2-based desktop UI behind the `gui` build tag (CGO enabled); without
  the tag `gui.Run` returns `gui.ErrUnavailable`
- Provides key/value management (SET, GET, DEL, KEYS) on the same `db.DB` as
  the TCP server
- Custom theme (`internal/gui/theme.go`) with light and dark variants per
  `packages/app/headless/FYNE.md`

### 4.1 Window and layout

- Window `kevin — Key/Value`, 900×600, padded; title updated to
  `kevin — Key/Value (N keys)` on every render (`gui_fyne.go`, `controller.render`)
- Content is a single card (`widget.NewCard`) holding three bands:
  1. **Control bar** — six columns aligned to the table via `controlLayout`:
     count (bold, centred over `No`), key/search entry, value entry,
     **Save** (High importance → primary), **Refresh** (default importance →
     neutral `ColorNameButton`, tonal in the MD3 preview), **Delete all**
     (Danger importance → error)
  2. **Key/value table** — `widget.Table` wrapped in `flexTable`, columns
     `No` (50 dp) · `Key` · `Value` (remaining width split evenly) · `Edit` ·
     `Copy` · `Delete` (equal action columns, min 40 dp); bold centred header
     row, no header column
  3. **Status bar** — trailing-aligned low-importance label above a bottom rule
- Values are truncated to 80 runes with `…` in the table (`maxValueRunes`);
  the full value loads into the editor

### 4.2 Interactions

| Gesture                | Result (Go source)                                                                          |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| Type in the key entry  | Live case-insensitive search on **key or value**; rows re-sorted (`filterAndSort`)          |
| Select a row (or Edit) | Row loads into the key/value entries, status `loaded <key>`, focus returns to the key entry |
| Enter in key entry     | Focus moves to the value entry; Enter in value entry saves                                  |
| Save                   | Empty key → `enter a key first`; otherwise `set <key>` or `updated <key>`                   |
| Copy                   | Value copied to the clipboard, status `value copied to clipboard`                           |
| Delete                 | Confirm dialog (`Delete key` / `Delete "<key>"?`) → `deleted <key>`                         |
| Delete all             | Confirm dialog (`Delete all keys`, destructive) → `deleted <n> keys`                        |
| Refresh                | Clears both entries and the selection, forces a full re-render                              |
| Missing key            | Status `key not found: <key>`                                                               |

Note: because the key entry doubles as the search query, selecting or saving a
key narrows the table to matching rows until Refresh clears the field — this is
the behaviour of `controller.filterAndSort`, not a bug.

- The GUI re-renders on a 500 ms ticker (`gui_fyne.go`), so edits made through
  the TCP server appear in the window without user action
- `--gui` and `--tui` are mutually exclusive; both share the in-memory store

## 5. Design system (Material Design 3)

- Colour roles: primary/on-primary/primary-container, secondary, tertiary,
  error, surface/on-surface, surface-container, outline, inverse — light and
  dark variants
- Type scale: display-large, headline-large, title-large, body-large/medium/small,
  label-large/medium/small
- Shape tokens: small 4dp, medium 12dp, large 16dp, extra-large 28dp
- Button mapping: Save → filled (primary, fyne `High`), Refresh → default
  importance (fyne neutral `ColorNameButton`, shown as the MD3 tonal button),
  Delete / Delete all → filled error (fyne `DangerImportance`)
- Theme switching persisted in `localStorage` under `sml-theme` (`sml-light` /
  `sml-dark`), honoring `prefers-color-scheme`

## 6. States

- **Loading** — table and count refresh on the ticker; no state is shown as
  success before the store confirms it (statuses are set after the mutation)
- **Empty** — empty table with a centred hint (`No keys …` / `No keys match …`)
- **Error** — status bar messages (`enter a key first`, `key not found: <key>`)
- **Destructive** — every delete requires confirmation

## 7. Accessibility

- Semantic table markup with scoped headers and `sr-only` labels for the
  icon-only action columns
- Icon buttons carry `aria-label`/`title` (`Edit <key>`, `Copy value of <key>`,
  `Delete <key>`); on the fyne side `Button.AccessibilityLabel` falls back to
  the icon name for KeVIN's empty-text buttons — row context is the known
  desktop gap
- Visible focus ring (`:focus-visible`, 2px primary), keyboard flow:
  key → value → Save via Enter, Escape dismisses dialogs
- Status and count are `aria-live="polite"`; dialog is `role="alertdialog"`
  with `aria-modal`, focus moves to the confirm action and returns on close
- Sufficient contrast in both variants; theme switcher exposes `aria-pressed`

## 8. Prototypes

Interactive HTML previews under [`07-ui-ux-design/prototypes/`](07-ui-ux-design/prototypes/),
styled with Material Design 3 in light and dark themes:

- `html/00-components.html` — Material Design 3 tokens, typography, buttons,
  chips, cards, fields, table, states
- `html/01-gui.html` — interactive key/value manager window: mirrors
  `internal/gui` structure (control bar, six-column table, status bar) and
  behaviour (search-as-you-type, select-to-edit, clipboard copy, confirm
  dialogs, 80-rune truncation, 500 ms re-render, dynamic window title)

Screenshots: `./screenshot.sh` → `prototypes/images/light/` and
`prototypes/images/dark/` (Playwright, full page, 1920×1080).

Component inventory: [`07-ui-ux-design/system/components.md`](07-ui-ux-design/system/components.md).

## Cross-references

- GUI implementation: [`internal/gui/`](../internal/gui/)
- Architecture: [`04-architecture.md`](04-architecture.md)
- Tech stack: [`08-tech-stack.md`](08-tech-stack.md)
- Testing: [`09-testing-strategy.md`](09-testing-strategy.md)
