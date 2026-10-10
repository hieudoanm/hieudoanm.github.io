# Ratatui Design Best Practices: Basic Usage

Best practices for building visually polished terminal UIs with Ratatui (Rust). Use when creating, styling, or reviewing a Ratatui TUI app — covers layout constraints, color, widgets, and theming patterns with suggested values.

## Scenario

Use this example as a starting point when applying **ratatui-design** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Color Palette** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
