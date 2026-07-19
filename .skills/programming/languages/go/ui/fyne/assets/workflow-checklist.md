# Fyne Design Best Practices: Workflow Checklist

A practical run sheet for applying [Fyne Design Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 3. Spacing & Layout Rules: **Always wrap window content** in container.NewPadded(...) — never let widgets touch the window edge
- [ ] 3. Spacing & Layout Rules: **Use layout.NewSpacer()** inside HBox/VBox to distribute space intentionally, rather than nested boxes to fake gaps
- [ ] 5. Icons: Use widget.NewButtonWithIcon(label, theme.XIcon(), fn) instead of plain text buttons wherever an icon meaning exists (delete, add, settings, search)
- [ ] 5. Icons: Fyne's built-in icon set (theme.DocumentIcon(), theme.DeleteIcon(), theme.SettingsIcon(), theme.SearchIcon(), etc.) is enough for most toolbars — no need to import external icon fonts for basic apps
- [ ] 6. Cards, Borders, and Depth: Use canvas.Rectangle with CornerRadius (8–12px) for custom card backgrounds when you need rounding beyond widget.Card
- [ ] 6. Cards, Borders, and Depth: Subtle elevation: a slightly lighter/darker surface color (Surface token above) instead of drop shadows — Fyne doesn't do shadows natively, so rely on color contrast for depth
- [ ] 7. Buttons & Interactive States: Primary action = filled button with Importance: widget.HighImportance
- [ ] 7. Buttons & Interactive States: Secondary action = widget.MediumImportance or plain outlined style
- [ ] 8. General Rules of Thumb: **Whitespace > decoration.** Increasing padding/margins usually improves perceived polish more than adding colors
- [ ] 8. General Rules of Thumb: **Limit palette to 1 primary + 1 neutral scale + 1 semantic (error/success) set.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
