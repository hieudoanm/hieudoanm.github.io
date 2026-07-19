# Implementation notes

Focused reference for **bubbletea-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
