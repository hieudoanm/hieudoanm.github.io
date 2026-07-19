# Workflow notes

Focused reference for **fyne-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
