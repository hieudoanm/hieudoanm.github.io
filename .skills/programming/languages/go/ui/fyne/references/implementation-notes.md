# Implementation notes

Focused reference for **fyne-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
