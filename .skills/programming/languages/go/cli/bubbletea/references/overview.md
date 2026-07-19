# Overview

Focused reference for **bubbletea-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
