---
name: polaris-design-system
description: Build commerce and merchant-facing web UI on Shopify's Polaris design system. Covers the --p-* token namespace, 4px spacing, role-based color (bg, text, fill, border, icon), depth restraint, the current web-components direction versus the legacy React package, per-surface context (Admin, Checkout, POS, customer accounts), accessibility, and brand customization. Use when building or reviewing admin tooling, merchant dashboards, checkout surfaces, or any Shopify app UI.
---

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

---

## 3. Color Is a Role System

Three ideas do most of the work:

1. **Grounds** — `bg` and `bg-surface-*` stack to create depth without shadow.
   Prefer a surface token to a shadow token.
2. **Ink** — `text` and `text-secondary`. Secondary ink is for supporting copy, not
   for making primary copy lighter until it passes.
3. **Semantics** — `bg-fill-brand` for the primary action,
   `bg-fill-success` for positive outcomes, `bg-fill-critical` for destructive and
   error states.

```css
.page {
  background: var(--p-color-bg);
  color: var(--p-color-text);
}

.page__section {
  background: var(--p-color-bg-surface-secondary);
}
```

- Never hard-code a Polaris color. There is no such thing as "close enough to the
  admin blue."
- Status is never color alone — pair it with an icon or a label.
- Destructive actions get `bg-fill-critical`, and the label must be unambiguous
  ("Archive product", not "OK").

---

## 4. Depth Without Shadows

Polaris builds hierarchy out of surfaces first, shadow second:

1. Flat on the page ground.
2. One surface step in (`bg-surface-secondary`) for sections and grouped cards.
3. Shadow only for genuinely floating things — popovers, menus, dialogs, dragged
   items.

```css
.card {
  background: var(--p-color-bg-surface-secondary);
  border-radius: var(--p-border-radius-300);
}
.popover {
  background: var(--p-color-bg-surface);
  box-shadow: var(--p-shadow-300);
}
```

If everything has a shadow, nothing is floating and the hierarchy has flattened.

---

## 5. Typography and Spacing

- One sans family, system-font backed. Size and weight carry hierarchy; do not
  introduce a second family.
- `--p-font-size-*` and `--p-font-weight-*` are the levers. Weight contrast beats
  size contrast for separating a section title from body copy in a dense UI.
- Space the layout on the 4px scale with `--p-space-*`. Related items get less gap
  than unrelated groups; that gap difference is the primary grouping signal in a
  dense screen.
- Tables and list rows get compact vertical rhythm. A merchant scanning 50 orders
  should not scroll for whitespace.

---

## 6. Surfaces and Their Contexts

Polaris components are not interchangeable across merchant contexts. A single
element often needs a different component per surface:

| Surface           | Pressure                                      |
| ----------------- | --------------------------------------------- |
| App admin         | Long sessions, dense tables, bulk actions     |
| Embedded app home | Merchant onboarding and navigation            |
| Checkout          | Guest, mobile, one-shot, high-stakes          |
| Customer accounts | Consumer-facing, low power, high trust needed |
| POS               | Touch targets, speed, one-handed, noisy       |

- In **checkout** and **customer accounts** you are serving a shopper, not a
  merchant. Density tuned for admin is hostile here.
- In **POS**, touch target size and single-handed reach beat information density.
- When a spec says "use the Polaris button", ask _which_ surface first.

---

## 7. Implementation

- **Web components** are the current Polaris line. Check the tag names in the
  current docs rather than copying React examples.
- The React package (`@shopify/polaris`) is the legacy implementation; new work
  should target the direction Polaris is actually shipping.
- Apps should centralize token overrides in a single file. Overrides scattered
  across components are how a "Polaris" app stops looking like Polaris.
- Brand customization is meant to happen at the token layer, in one place.

```css
/* tokens.css — the only file allowed to override Polaris tokens */
:root {
  --p-color-bg-fill-brand: #4a4af4;
}
```

---

## 8. Accessibility

- Polaris targets **WCAG 2.1 AA**. Treat any contrast regression as a defect, not
  a design preference.
- Every interactive element needs an accessible name. Icon-only buttons need an
  explicit label — an icon is not a name.
- Focus must be visible on every interactive element, including custom cards and
  table rows that behave like buttons.
- Never remove a control with `display: none` to express state; disable it and
  explain why. Hiding removes information the merchant needed.
- Bulk-action patterns need a confirmation step that names the count.
- Test keyboard-only through the whole task, not just the screen you are editing.

---

## 9. Declaring Divergence

1. Express divergence as a token override in `tokens.css`, never as a component
   restyle.
2. Re-check contrast after any color override.
3. Record which overrides exist and why — an undocumented token override is
   indistinguishable from a bug.
4. If you are overriding interaction patterns rather than values, you are no longer
   using Polaris; say so explicitly and manage that surface separately.

---

## General Rules of Thumb

- Reference `--p-*` tokens; never hard-code a Polaris color or spacing value.
- Stacking surfaces beats stacking shadows.
- Density tuned per surface — admin is not checkout, POS is not admin.
- Name every icon-only control.
- Keep all overrides in one token file.
- Treat WCAG 2.1 AA as a gate, not a goal.
- Prefer the current web-components target over legacy React examples.
- Write down every divergence.

---

## Quick-Start Checklist

- [ ] Correct Polaris target chosen for the surface (admin, checkout, accounts, POS)
- [ ] Component layer matches Polaris's current direction
- [ ] Colors referenced via `--p-color-*` roles only
- [ ] Spacing from the `--p-space-*` 4px scale
- [ ] Hierarchy built from surfaces; shadows only on floating elements
- [ ] Every interactive element has an accessible name
- [ ] Keyboard path and focus visibility verified for the whole task
- [ ] Bulk and destructive actions confirmed and clearly labelled
- [ ] Overrides centralized in one token file and documented

---

## Sources

- Polaris / Shopify developer docs — https://shopify.dev/docs/api/polaris
- Polaris site (legacy line) — https://polaris.shopify.com/
- Design tokens (legacy line) — https://polaris.shopify.com/design/design-tokens

Note: the design-tokens path now redirects to the Shopify developer documentation,
which describes the web-components direction. Confirm which line you are targeting
before following any example.
