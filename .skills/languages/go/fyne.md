---
name: fyne-design
description: Best practices for building visually polished desktop GUIs with Fyne (Go). Use when creating, styling, or reviewing a Fyne app — covers theming, color, spacing, typography, and widget patterns with suggested values.
---

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

Pick one primary accent color and use it sparingly (buttons, links, active states) — not everywhere.

---

## 2. Sizing Tokens (`theme.Size`)

Override these for consistent spacing instead of hardcoding padding per widget:

| Token                    | Default | Suggested                         |
| ------------------------ | ------- | --------------------------------- |
| `SizeNamePadding`        | 4       | 8                                 |
| `SizeNameInnerPadding`   | 8       | 12                                |
| `SizeNameText`           | 14      | 14–15                             |
| `SizeNameHeadingText`    | 24      | 22–26                             |
| `SizeNameSubHeadingText` | 18      | 17–18                             |
| `SizeNameCaptionText`    | 11      | 12                                |
| `SizeNameInputBorder`    | 1       | 1–1.5                             |
| `SizeNameScrollBar`      | 16      | 10–12 (slimmer feels more modern) |

---

## 3. Spacing & Layout Rules

- **Always wrap window content** in `container.NewPadded(...)` — never let widgets touch the window edge.
- **Use `layout.NewSpacer()`** inside `HBox`/`VBox` to distribute space intentionally, rather than nested boxes to fake gaps.
- **Prefer `container.NewBorder(top, bottom, left, right, center)`** for app shells (header/sidebar/footer/content) over deeply nested `VBox`/`HBox`.
- **Group related controls** with `widget.NewCard(title, subtitle, content)` — gives border + padding + hierarchy for free.
- **Consistent gutter:** 8–16px between sibling elements, 16–24px between distinct sections.
- **Don't mix layout containers arbitrarily** — pick `Border` for the overall shell, `Form` for label/input pairs, `Grid` for equal-sized tiles, `VBox`/`HBox` only for simple stacks.

---

## 4. Typography Hierarchy

Default Fyne text is flat (~14px everywhere). Create hierarchy explicitly:

| Use             | Widget/Approach                                      | Size  | Style                                  |
| --------------- | ---------------------------------------------------- | ----- | -------------------------------------- |
| Page title      | `canvas.Text`                                        | 24–26 | Bold                                   |
| Section heading | `canvas.Text`                                        | 17–18 | Bold                                   |
| Body text       | `widget.NewLabel`                                    | 14    | Regular                                |
| Caption / hint  | `widget.NewLabel` + `theme.ColorNameForegroundMuted` | 12    | Regular, muted color                   |
| Button label    | default                                              | 14    | Medium/Bold via `TextStyle{Bold:true}` |

Avoid more than 3 distinct text sizes on one screen — it starts looking noisy.

---

## 5. Icons

- Use `widget.NewButtonWithIcon(label, theme.XIcon(), fn)` instead of plain text buttons wherever an icon meaning exists (delete, add, settings, search).
- Fyne's built-in icon set (`theme.DocumentIcon()`, `theme.DeleteIcon()`, `theme.SettingsIcon()`, `theme.SearchIcon()`, etc.) is enough for most toolbars — no need to import external icon fonts for basic apps.
- Icon size should match nearby text size — don't let icons dominate visually; 20–24px alongside 14px text is a good ratio.

---

## 6. Cards, Borders, and Depth

- Use `canvas.Rectangle` with `CornerRadius` (8–12px) for custom card backgrounds when you need rounding beyond `widget.Card`.
- Subtle elevation: a slightly lighter/darker surface color (Surface token above) instead of drop shadows — Fyne doesn't do shadows natively, so rely on color contrast for depth.
- Keep border radius consistent across the whole app (pick one value, e.g. 8px, and reuse it).

---

## 7. Buttons & Interactive States

- Primary action = filled button with `Importance: widget.HighImportance`.
- Secondary action = `widget.MediumImportance` or plain outlined style.
- Destructive action = `widget.DangerImportance` (red).
- Don't give every button the same visual weight — one primary action per screen max.

---

## 8. General Rules of Thumb

- **Whitespace > decoration.** Increasing padding/margins usually improves perceived polish more than adding colors.
- **Limit palette to 1 primary + 1 neutral scale + 1 semantic (error/success) set.**
- **Align everything to a grid** — use consistent multiples of 4 or 8 for all spacing values.
- **Test both light and dark variants** — Fyne respects OS theme by default, so your custom theme must handle both `theme.VariantLight` and `theme.VariantDark`.
- **Reference:** [Fyne theme docs](https://developer.fyne.io/explore/) and the `theme` package source for the full list of overridable tokens.

---

## Quick-Start Checklist

- [ ] Custom `fyne.Theme` implemented (colors for both variants)
- [ ] Padding token increased from default 4 → 8
- [ ] Window content wrapped in `container.NewPadded`
- [ ] App shell uses `container.NewBorder`, not nested boxes
- [ ] Related controls grouped in `widget.NewCard`
- [ ] Text hierarchy defined (title/heading/body/caption sizes)
- [ ] Icons added to primary action buttons
- [ ] One consistent corner radius used app-wide
- [ ] Only one `HighImportance` button per screen
