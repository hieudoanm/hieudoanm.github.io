# Polaris Design System (Shopify): 4. Depth Without Shadows

## Source guidance

This example applies the **4. Depth Without Shadows** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

Polaris builds hierarchy out of surfaces first, shadow second:
1. Flat on the page ground.
2. One surface step in (`bg-surface-secondary`) for sections and grouped cards.
3. Shadow only for genuinely floating things — popovers, menus, dialogs, dragged
items.
If everything has a shadow, nothing is floating and the hierarchy has flattened.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for polaris-design-system.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
