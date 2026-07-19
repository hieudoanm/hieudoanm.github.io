# Overview

Focused reference for **ratatui-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
