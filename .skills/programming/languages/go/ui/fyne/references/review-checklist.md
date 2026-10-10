# Review checklist

Focused reference for **fyne-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
