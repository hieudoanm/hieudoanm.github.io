# Workflow notes

Focused reference for **ratatui-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

- Prefer `Color::Rgb` (truecolor) but provide a fallback `Color::Indexed` palette for 256-color terminals if broad compatibility matters.
- Don't hardcode `Color::White`/`Color::Black` for text — use terminal-default (`Color::Reset`) or your theme's foreground so it respects the user's terminal background where sensible.
- One primary + one accent color; everything else neutral.

---

## 3. Layout Constraints

Ratatui's `Layout` is constraint-based — get this right and everything else follows:

| Pattern               | Constraint                                                       |
| --------------------- | ---------------------------------------------------------------- |
| Fixed header/footer   | `Constraint::Length(n)` (e.g. `Length(3)` for a bordered header) |
| Flexible main content | `Constraint::Min(0)` or `Constraint::Fill(1)`                    |
| Proportional split    | `Constraint::Percentage(n)` or `Constraint::Ratio(a, b)`         |
| Sidebar               | `Constraint::Length(24..32)` fixed width                         |

```rust
let chunks = Layout::default()
    .direction(Direction::Vertical)
    .constraints([
        Constraint::Length(3),   // header
        Constraint::Min(0),      // body
        Constraint::Length(1),   // status bar
    ])
    .split(frame.area());
```

**Rules of thumb:**

- Always leave 1 row for a status/help bar at the bottom — huge usability win for near-zero cost.
- Recompute layout every frame from `frame.area()` — never cache terminal size.
- Nest `Layout` calls for grids (outer vertical split, inner horizontal split per row).

---

## 4. Borders & Blocks
