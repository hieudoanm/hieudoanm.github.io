# Bubble Tea Design Best Practices: Basic Usage

Best practices for building visually polished terminal UIs with Bubble Tea (Go). Use when creating, styling, or reviewing a Bubble Tea TUI app — covers Lip Gloss styling, layout, color, and component patterns with suggested values.

## Scenario

Use this example as a starting point when applying **bubbletea-design** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Color Palette** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
