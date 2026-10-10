# Implementation notes

Focused reference for **ratatui-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

`Block` is your primary container — use it far more than raw widget rendering:

```rust
let block = Block::default()
    .title(" Files ")
    .borders(Borders::ALL)
    .border_type(BorderType::Rounded)
    .border_style(Style::default().fg(if focused { theme.border_focused } else { theme.border }))
    .style(Style::default().bg(theme.surface));
```

- Pick `BorderType::Rounded` for a modern look, `Plain` for density/technical tools — use one consistently.
- Pad title text with a leading/trailing space (`" Files "`) — bare text against the border looks cramped.
- Change border color/weight for the focused pane in multi-pane apps — this is the single most important affordance in Ratatui apps and is frequently skipped.

---

## 5. Typography (Style Modifiers)

No font control exists — hierarchy comes from `Modifier` and color:

| Use            | Style                                                       |
| -------------- | ----------------------------------------------------------- |
| Title          | `Style::default().fg(primary).add_modifier(Modifier::BOLD)` |
| Section label  | `Modifier::BOLD`, muted or accent color                     |
| Body           | default style, foreground color only                        |
| Hint/help text | `Modifier::DIM` or muted color                              |
| Selected row   | `Modifier::REVERSED` or `bg(primary)`                       |
| Error          | `fg(error).add_modifier(Modifier::BOLD)`                    |

Avoid stacking more than 2 modifiers on one element (e.g. bold + italic + underline together reads as noisy).

---

## 6. Widgets
