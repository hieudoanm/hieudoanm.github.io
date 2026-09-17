# Workflow notes

Focused reference for **bubbletea-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
