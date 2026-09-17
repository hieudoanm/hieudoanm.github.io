# Fyne Design Best Practices: Starter Template

A reusable starting point derived from the **1. Custom Theme** section of [Fyne Design Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
