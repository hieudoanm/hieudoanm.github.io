# Component composition patterns

This document describes implementation principles, not a complete Astryx
component API. For exact component names, properties, and supported variants,
use the [official component catalogue](https://astryx.atmeta.com/components)
and the version installed by the project.

## Use the library before writing a replacement

For buttons, fields, menus, dialogs, navigation, and feedback:

1. Find the closest documented component.
2. Check its semantic element, accessible name, keyboard behavior, and states.
3. Use its supported size and visual variants.
4. Add a wrapper only for project-specific composition.
5. Write a replacement only when the library has no suitable primitive or the
   product has a documented reason to diverge.

Do not copy the live site's generated CSS class names. They are build output,
not a stable extension point.

## Button

- Use a real `<button>` for actions and an `<a>` for navigation.
- Give icon-only controls an accessible name.
- Keep disabled and pending states distinct from normal and hover states.
- Preserve a visible keyboard focus indicator.
- Prefer the system's variants and semantic accent token to custom colors.

For a plain-CSS integration or an isolated example, use the semantic token
pattern below; replace the selector and variables with the supported API of the
project's installed Astryx version:

```css
.action {
  min-height: var(--size-element-md);
  padding-inline: var(--spacing-4);
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-element);
  background: var(--color-accent);
  color: var(--color-on-accent);
  font: inherit;
  font-weight: var(--font-weight-medium);
}

.action:focus-visible {
  outline: var(--focus-outline-width) var(--focus-outline-style)
    var(--focus-outline-color);
  outline-offset: var(--focus-outline-offset);
}
```

## Form field

- Pair each input with a persistent visible label.
- Use `aria-describedby` for help and validation text.
- Keep error state available as text, not only a color or icon.
- Use the system's control size, border, focus, and disabled tokens.
- Do not use placeholder text as the sole label.

## Card or panel

- Use the surface token for the panel, body token for the page, and border token
  for separation.
- Keep heading hierarchy semantic; a card title is not automatically an
  `h2`.
- Make a whole card clickable only when the interaction is genuinely a single
  destination. Avoid nested links or buttons inside a clickable wrapper.
- Use elevation and radius sparingly, following the selected theme's values.

## Dialog and popover

- Prefer the documented primitive so focus management, Escape behavior, and
  focus restoration are handled correctly.
- Give the dialog an accessible title and keep its actions reachable at small
  viewport heights.
- Check layering, backdrop contrast, scroll containment, and reduced motion.

## Responsive composition

- Let content determine height; avoid fixed heights for text-rich surfaces.
- Stack controls when columns become too narrow.
- Keep touch targets usable and preserve clear focus/selection on touch-only
  devices.
- Test long labels, translated copy, and zoom rather than checking only the
  ideal desktop width.