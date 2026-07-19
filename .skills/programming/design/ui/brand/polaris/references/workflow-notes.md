# Workflow notes

Focused reference for **polaris-design-system**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
