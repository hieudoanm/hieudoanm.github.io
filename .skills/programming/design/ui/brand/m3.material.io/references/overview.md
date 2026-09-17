# Overview

Focused reference for **google-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Google Design System (Material Design 3)

Every product ends up with a design system. The question is whether you
**inherit** one or **derive** one from content (see `design/brand/nothing.md`).
Mixing the two is the usual reason UI feels inconsistent with no explainable
cause. This skill covers the inherit branch, using M3 because its token model is
role-based and maps cleanly onto CSS variables, Tailwind v4, and DaisyUI 5.

**You buy:** cohesion, passing contrast, platform familiarity, and a decision you
don't have to re-litigate. **You pay:** you look like everything else using it,
and real needs outside it need a workaround or a declared divergence.

---

## 1. Core Principles

- **Roles, not names** — a token says what it _does_ (`on-surface`), never what
  it looks like (`gray-800`). Name-by-color breaks the moment a theme changes.
- **Ink on ground** — every color token is a surface/ink pair (`surface` +
  `on-surface`). Contrast then holds by construction instead of by review.
- **One source per feel** — elevation from surface tint, interaction from state
  layers, emphasis from color. Don't stack shadows to fake depth that has a token.
- **The system is the decision record** — a component library is disposable; the
  resolved ratios and thresholds are the asset.
- **Constraints buy consistency** — the point of inheriting is that the common
  case is cheap and the unusual case is deliberate.

---

## 2. Color Is a Set of Roles

| Role                                         | Use                                  |
| -------------------------------------------- | ------------------------------------ |
| `primary` / `on-primary`                     | Brand emphasis, filled buttons       |
| `primary-container` / `on-primary-container` | Low-emphasis brand fill, chips       |
| `surface` / `on-surface`                     | Page and card ground                 |
| `surface-container-{low,high,highest}`       | Nested surfaces, by elevation        |
| `surface-variant` / `on-surface-variant`     | Secondary text, icons, dividers      |
| `outline` / `outline-variant`                | Borders, focus rings, disabled fills |
| `error` / `on-error` / `error-container`     | Destructive actions, validation      |

- **Never** reference a raw ramp in a component — `bg-blue-500` can't respond to a
  theme and is unauditable for contrast.
- **`on-*` is not optional.** Every ground ships with its ink. This one rule
  prevents most contrast regressions.
- Extend the vocabulary only with a declared custom role.

---
