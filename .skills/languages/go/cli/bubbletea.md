---
name: bubbletea-design
description: Best practices for building visually polished terminal UIs with Bubble Tea (Go). Use when creating, styling, or reviewing a Bubble Tea TUI app — covers Lip Gloss styling, layout, color, and component patterns with suggested values.
---

# Bubble Tea Design Best Practices

Bubble Tea (charmbracelet/bubbletea) handles the Elm-architecture state/update/view loop; **Lip Gloss** (charmbracelet/lipgloss) handles all visual styling. A plain Bubble Tea app looks like raw terminal text until Lip Gloss is applied deliberately.

---

## 1. Core Stack

- `github.com/charmbracelet/bubbletea` — app loop (Model/Update/View)
- `github.com/charmbracelet/lipgloss` — styling (color, borders, padding, layout)
- `github.com/charmbracelet/bubbles` — pre-built components (list, table, viewport, textinput, spinner, progress, help)
- `github.com/charmbracelet/glamour` — Markdown rendering, if displaying formatted docs

Don't hand-roll ANSI escape codes — always go through Lip Gloss.

---

## 2. Color Palette

Define a small, reusable color set as `lipgloss.Color` (hex) or `lipgloss.AdaptiveColor` (auto light/dark terminal background):

```go
var (
    ColorPrimary   = lipgloss.AdaptiveColor{Light: "#3B7DD8", Dark: "#4F9CFF"}
    ColorAccent    = lipgloss.AdaptiveColor{Light: "#7C3AED", Dark: "#A78BFA"}
    ColorMuted     = lipgloss.AdaptiveColor{Light: "#6B6B75", Dark: "#9A9AA5"}
    ColorSurface   = lipgloss.AdaptiveColor{Light: "#FFFFFF", Dark: "#26262C"}
    ColorBorder    = lipgloss.AdaptiveColor{Light: "#D0D0D5", Dark: "#3A3A42"}
    ColorError     = lipgloss.AdaptiveColor{Light: "#D64545", Dark: "#FF5C5C"}
    ColorSuccess   = lipgloss.AdaptiveColor{Light: "#2FA968", Dark: "#4FD68C"}
)
```

**Rules of thumb:**

- Always use `AdaptiveColor` (or check `lipgloss.HasDarkBackground()`) — never assume the user's terminal background.
- One primary/accent color max; everything else neutral grays.
- Reserve red/green strictly for error/success states, not decoration.
- Test in both a dark-background and light-background terminal before shipping.

---

## 3. Spacing & Sizing Tokens

| Token             | Suggested value                                           |
| ----------------- | --------------------------------------------------------- |
| Outer app padding | `1` (vertical) / `2` (horizontal)                         |
| Section gap       | 1 blank line                                              |
| Card/box padding  | `1` all sides, or `0 1` for compact                       |
| Border width      | 1 (rounded or normal)                                     |
| Min content width | 40 cols                                                   |
| Max content width | 100–120 cols (don't stretch full width on wide terminals) |

```go
style := lipgloss.NewStyle().
    Padding(1, 2).
    Border(lipgloss.RoundedBorder()).
    BorderForeground(ColorBorder)
```

---

## 4. Borders & Containers

- Use `lipgloss.RoundedBorder()` for a modern feel; `lipgloss.NormalBorder()` for a denser/technical feel. Pick one and use it consistently app-wide.
- Group related content in a bordered box rather than relying on blank-line separation alone.
- For panels side-by-side, use `lipgloss.JoinHorizontal(lipgloss.Top, left, right)`; for stacked sections, `lipgloss.JoinVertical(lipgloss.Left, ...)`.
- Give focused panels a distinct border color (primary) vs unfocused (muted gray) — critical for multi-pane layouts so the user knows where input goes.

```go
focusedBorder   = ColorPrimary
unfocusedBorder = ColorBorder
```

---

## 5. Typography (Terminal Equivalent)

No font sizes exist in a terminal — hierarchy comes from **bold, color, and spacing** instead:

| Use            | Style                                                           |
| -------------- | --------------------------------------------------------------- |
| Title/header   | `Bold(true)`, primary color, often full-width with padding      |
| Section label  | `Bold(true)`, muted or accent color                             |
| Body text      | default terminal color, no styling                              |
| Help/hint text | `Faint(true)` or muted color, smaller visual weight via dimness |
| Error message  | `Bold(true)` + `ColorError`                                     |

```go
titleStyle = lipgloss.NewStyle().Bold(true).Foreground(ColorPrimary).Padding(0, 1)
helpStyle  = lipgloss.NewStyle().Foreground(ColorMuted).Faint(true)
```

---

## 6. Layout Patterns

- **Full-screen apps:** compute available height/width from `tea.WindowSizeMsg` and re-layout on resize — never hardcode terminal dimensions.
- **Status/help bar:** pin a single-line footer (via `bubbles/help` or a custom styled line) showing key bindings — keeps the UI discoverable without cluttering the main view.
- **Lists:** use `bubbles/list` rather than manually rendering `[]string` — it gives you filtering, pagination, and selection styling for free.
- **Forms:** use `bubbles/textinput` / `bubbles/textarea` with a visible focus indicator (border color change or `>` prefix) on the active field.

---

## 7. Key Bindings & Discoverability

- Use `bubbles/key` to define bindings with a `Help()` method — this auto-populates a help view instead of a static hardcoded string.
- Always support `q` / `ctrl+c` to quit, `?` to toggle help, and arrow keys + vim-style `j/k` for navigation where lists are involved.
- Show current mode/context in the header or status line (e.g. "NORMAL", "EDITING", "FILTER") if the app has modal input like Vim-style TUIs.

---

## 8. Motion & Feedback

- Use `bubbles/spinner` for any operation >300ms (network calls, file I/O) — a frozen screen reads as broken.
- Use `bubbles/progress` for determinate long operations.
- Debounce/animate list filtering rather than snapping instantly if using fuzzy search — smoother perceived responsiveness.

---

## 9. General Rules of Thumb

- **Test at 80x24** (classic minimum) as well as your dev terminal size — don't assume a large window.
- **Never rely on 256-color-only codes** if targeting broad compatibility — Lip Gloss auto-downgrades gracefully, but test with `TERM=xterm` occasionally.
- **Keep the update loop pure** — all styling happens in `View()`, not `Update()`.
- **One consistent border radius/style and one accent color** — the most common mistake is inconsistent styling across different screens/panels of the same app.

---

## Quick-Start Checklist

- [ ] Colors defined once as `AdaptiveColor` constants
- [ ] Consistent border style (rounded or normal) app-wide
- [ ] Outer padding applied to root view, not raw text
- [ ] Focused vs unfocused panels visually distinct
- [ ] Title/header styled with bold + primary color
- [ ] Help/status bar present with key bindings
- [ ] Spinner/progress shown for any operation >300ms
- [ ] Layout responds to `tea.WindowSizeMsg` (no hardcoded dimensions)
