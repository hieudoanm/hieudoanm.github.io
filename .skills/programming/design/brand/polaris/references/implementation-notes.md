# Implementation notes

Focused reference for **polaris-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
