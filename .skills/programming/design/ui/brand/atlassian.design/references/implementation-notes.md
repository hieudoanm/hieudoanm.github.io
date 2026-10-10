# Implementation notes

Focused reference for **atlassian-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

Accent colors: gray, red, green, blue, yellow, orange, teal, purple, magenta, lime.

The defining property is that **swapping one accent for another leaves the
experience unchanged** — because accent color carries no semantic meaning.

- Use accents for expression: empty states, celebration, moments of personality.
- Never use an accent to mean success, danger, or warning. Those are roles.
- If a user would read a color as a status, it is not an accent.

---

## 7. Icons Have No Hover Tokens — By Design

There are deliberately **no `hovered` or `pressed` color tokens for icons**.
Instead, indicate icon state with a subtle neutral background.

- If you are about to invent an icon hover color, you have misread the system.
- `color.background.neutral.subtle` and its `.hovered` / `.pressed` variants are the
  mechanism.
- This is worth knowing because it looks like a missing feature and gets
  "fixed" incorrectly.

---

## 8. Light and Dark Themes

Design tokens currently support two themes, light and dark. Each color token maps
to a different value per theme.

- **Use tokens and the mapping is handled for you.** Atlassian's guidance is
  explicit: if you are using design tokens, you should not be mapping values
  yourself.
- Hand-mapping light values to dark values is the main source of dark-mode
  contrast bugs.
- If a value only exists in one theme, that is a gap in the token set, not a
  special case for your component.

---

## 9. Accessibility

Atlassian holds colors to **WCAG AA contrast ratios**:

| Requirement | Applies to                                     |
| ----------- | ---------------------------------------------- |
| **4.5:1**   | Text smaller than 24px                         |
| **3:1**     | UI essential to understanding, and text ≥ 24px |

- Check contrast with the token you actually applied, in the theme you actually
  shipped.
- Warning backgrounds need the dedicated `warning.inverse` tokens.
- Never rely on color alone to convey state — pair with an icon, label, or shape.
- Verify focus visibility against every surface, including bold backgrounds.
- Accent backgrounds in particular tend to be the failure case.
