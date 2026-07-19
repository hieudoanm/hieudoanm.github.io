# Overview

Focused reference for **fyne-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Fyne Design Best Practices

A practical reference for making Fyne (Go GUI toolkit) apps look polished instead of default/plain. Includes concrete suggested values you can drop straight into code.

---

## 1. Custom Theme

The single biggest visual upgrade. Never ship with `theme.DefaultTheme()` alone.

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

**Suggested palette (dark):**

| Role           | Hex       |
| -------------- | --------- |
| Background     | `#1A1A1E` |
| Surface / Card | `#26262C` |
| Primary        | `#4F9CFF` |
| Foreground     | `#E8E8EC` |
| Muted text     | `#9A9AA5` |
| Error          | `#FF5C5C` |
| Success        | `#4FD68C` |

**Suggested palette (light):**

| Role           | Hex       |
| -------------- | --------- |
| Background     | `#F7F7F9` |
| Surface / Card | `#FFFFFF` |
| Primary        | `#3B7DD8` |
| Foreground     | `#1A1A1E` |
| Muted text     | `#6B6B75` |
| Error          | `#D64545` |
| Success        | `#2FA968` |
