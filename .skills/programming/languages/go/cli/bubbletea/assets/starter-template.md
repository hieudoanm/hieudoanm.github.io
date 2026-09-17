# Bubble Tea Design Best Practices: Starter Template

A reusable starting point derived from the **2. Color Palette** section of [Bubble Tea Design Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
