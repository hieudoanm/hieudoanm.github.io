# Fyne Design Best Practices: Basic Usage

Best practices for building visually polished desktop GUIs with Fyne (Go). Use when creating, styling, or reviewing a Fyne app — covers theming, color, spacing, typography, and widget patterns with suggested values.

## Scenario

Use this example as a starting point when applying **fyne-design** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Custom Theme** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```go
type appTheme struct{}

func (t appTheme) Color(name fyne.ThemeColorName, variant fyne.ThemeVariant) color.Color {
    switch name {
    case theme.ColorNameBackground:
        if variant == theme.VariantDark {
            return color.NRGBA{R: 0x1a, G: 0x1a, B: 0x1e, A: 0xff}
        }
        return color.NRGBA{R: 0xf7, G: 0xf7, B: 0xf9, A: 0xff}
    case theme.ColorNamePrimary:
        return color.NRGBA{R: 0x4f, G: 0x9c, B: 0xff, A: 0xff}
    case theme.ColorNameForeground:
        if variant == theme.VariantDark {
            return color.NRGBA{R: 0xe8, G: 0xe8, B: 0xec, A: 0xff}
        }
        return color.NRGBA{R: 0x1a, G: 0x1a, B: 0x1e, A: 0xff}
    case theme.ColorNameInputBackground:
        if variant == theme.VariantDark {
            return color.NRGBA{R: 0x26, G: 0x26, B: 0x2c, A: 0xff}
        }
        return color.NRGBA{R: 0xff, G: 0xff, B: 0xff, A: 0xff}
    }
    return theme.DefaultTheme().Color(name, variant)
}

func (t appTheme) Font(s fyne.TextStyle) fyne.Resource   { return theme.DefaultTheme().Font(s) }
func (t appTheme) Icon(n fyne.ThemeIconName) fyne.Resource { return theme.DefaultTheme().Icon(n) }
func (t appTheme) Size(n fyne.ThemeSizeName) float32       { return theme.DefaultTheme().Size(n) }
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
