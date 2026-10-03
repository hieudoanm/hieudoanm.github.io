---
name: ratatui-design
description: Best practices for building visually polished terminal UIs with Ratatui (Rust). Use when creating, styling, or reviewing a Ratatui TUI app — covers layout constraints, color, widgets, and theming patterns with suggested values.
---

# Ratatui Design Best Practices

Ratatui is immediate-mode: every frame you fully redraw the UI from a `Frame`. Visual polish comes from disciplined use of `Style`, `Layout` constraints, and consistent widget choices — there's no CSS-equivalent to fall back on.

---

## 1. Core Crates

- `ratatui` — core rendering, widgets, layout
- `crossterm` (or `termion`) — terminal backend
- `ratatui::style::{Style, Color, Modifier}` — styling primitives
- `tui-textarea` / `tui-input` — text editing widgets (not in core)
- `throbber-widgets-tui` — spinners for async feedback

---

## 2. Color Palette

Define a `Theme` struct once and pass it through your app state — never scatter raw `Color::Rgb(...)` calls across render functions.

```rust
pub struct Theme {
    pub background: Color,
    pub surface: Color,
    pub primary: Color,
    pub accent: Color,
    pub foreground: Color,
    pub muted: Color,
    pub border: Color,
    pub border_focused: Color,
    pub error: Color,
    pub success: Color,
}

impl Theme {
    pub fn dark() -> Self {
        Self {
            background: Color::Rgb(0x1a, 0x1a, 0x1e),
            surface: Color::Rgb(0x26, 0x26, 0x2c),
            primary: Color::Rgb(0x4f, 0x9c, 0xff),
            accent: Color::Rgb(0xa7, 0x8b, 0xfa),
            foreground: Color::Rgb(0xe8, 0xe8, 0xec),
            muted: Color::Rgb(0x9a, 0x9a, 0xa5),
            border: Color::Rgb(0x3a, 0x3a, 0x42),
            border_focused: Color::Rgb(0x4f, 0x9c, 0xff),
            error: Color::Rgb(0xff, 0x5c, 0x5c),
            success: Color::Rgb(0x4f, 0xd6, 0x8c),
        }
    }
}
```

**Rules of thumb:**

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

- Use `List` with `.highlight_style()` and `.highlight_symbol("▶ ")` for selectable items rather than manually rendering `Paragraph` per row.
- Use `Table` for tabular data with `.header()` styled distinctly (bold, different background) from body rows.
- Use `Gauge` or `LineGauge` for progress, `Sparkline` for compact trend data.
- Use `Tabs` widget for top-level navigation instead of custom text-based tab bars.
- Use `Paragraph` with `.wrap(Wrap { trim: true })` for any body text that might overflow — unwrapped text silently clips in Ratatui.

---

## 7. Focus & Interaction Feedback

- Maintain an explicit `Focus` enum in app state; every focusable `Block` reads from it to pick border style.
- Show a status/help line listing key bindings for the current mode (e.g. `q quit · ↑↓ navigate · enter select`).
- For async work, render a spinner (`throbber-widgets-tui`) or a `Gauge` — never leave the frame static during a network/file operation.

---

## 8. General Rules of Thumb

- **Redraw only on change** (event-driven `tick`/`poll`) rather than a tight render loop, to avoid flicker and CPU burn.
- **Test at 80x24** minimum in addition to your dev terminal size.
- **One border style, one accent color, one highlight style** — reused everywhere for consistency.
- **Keep render functions pure** — pass `&Theme` and `&AppState` in, don't mutate state during drawing.

---

## Quick-Start Checklist

- [ ] `Theme` struct defined once, threaded through render calls
- [ ] Layout built from `Constraint`s, recomputed from `frame.area()` each frame
- [ ] Status/help bar reserved at bottom (`Constraint::Length(1)`)
- [ ] Every panel wrapped in a `Block` with consistent `BorderType`
- [ ] Focused panel visually distinct from unfocused
- [ ] Titles padded with spaces inside border text
- [ ] Text uses `Paragraph` with `Wrap` where overflow is possible
- [ ] Spinner/gauge shown for any async operation
