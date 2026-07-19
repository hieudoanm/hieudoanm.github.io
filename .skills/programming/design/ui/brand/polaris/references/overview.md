# Overview

Focused reference for **polaris-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Polaris Design System (Shopify)

Polaris is Shopify's unified UI framework, and the front door to every merchant
surface: app admin, embedded app home, checkout, customer accounts, and POS. It is
the reference implementation of Shopify's merchant-first design philosophy.

**You buy:** a dense, high-signal component vocabulary that merchant users already
recognize from the products they run their business on, plus a token layer that
covers the full scale of a commerce app.

**You pay:** the look is recognisably Shopify, and the admin merchant is not the
same audience as the storefront shopper — Polaris has historically needed local
translation between those two contexts.

**Direction:** the current Polaris is web components; the React package is the
legacy line. Check which one your target surface targets before you copy examples
from a blog post.

---

## 1. Core Principles

- **The merchant is busy and interrupted.** Every extra click and every wasted
  vertical pixel costs them money. Density is a feature.
- **Ship the obvious thing.** Polaris favours a small set of well-understood
  patterns over novel ones.
- **Roles, not colors.** Tokens describe what a value _does_ (`bg`, `text`, `fill`),
  never what it looks like.
- **Depth is rationed.** Elevation exists to communicate stacking order, not to
  decorate. Most surfaces are flat.
- **Consistency is a feature for the user, not the team.** The merchant should not
  have to learn a new interaction model per app.
- **Accessibility is table stakes.** WCAG 2.1 AA, not a phase of the project.

---

## 2. The Token Namespace

All Polaris tokens are CSS custom properties in the `--p-*` namespace, grouped by
category:

| Category   | Example                                                                              |
| ---------- | ------------------------------------------------------------------------------------ |
| Background | `--p-color-bg`, `--p-color-bg-surface-secondary`                                     |
| Fill       | `--p-color-bg-fill-brand`, `--p-color-bg-fill-success`, `--p-color-bg-fill-critical` |
| Text       | `--p-color-text`, `--p-color-text-secondary`                                         |
| Border     | `--p-color-border`                                                                   |
| Icon       | `--p-color-icon`                                                                     |
| Space      | `--p-space-0` … `--p-space-16`                                                       |
| Radius     | `--p-border-radius-*`                                                                |
| Shadow     | `--p-shadow-*`                                                                       |
| Font       | `--p-font-family-sans`, `--p-font-size-*`, `--p-font-weight-*`                       |

- **Spacing is a 4px base.** `--p-space-4` is 1rem / 16px. Odd steps exist for
  intermediate needs; a value that is not on the scale is a bug.
- **Radius is a named scale**, not one value — different components genuinely need
  different radii. Read the step names from the token list rather than assuming
  pixel values.
- **`fill` vs `bg`:** `bg` is the page and surface ground; `fill` is the saturated
  or interactive color painted _into_ a component. Mixing them is the usual cause
  of a button that looks wrong.

Read the current token list before quoting a step into a design document; the
namespace has grown over time.
