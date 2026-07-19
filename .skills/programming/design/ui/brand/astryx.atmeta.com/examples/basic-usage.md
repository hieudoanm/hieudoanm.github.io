# Astryx: Theme-aware component styling

This example demonstrates semantic CSS token usage for a small custom
component. For production code, prefer the component API from the project's
installed Astryx version.

## Scenario

A feature needs a primary action and a text field that should follow the
project's active Astryx theme, including dark mode. Avoid embedding a guessed
brand color in either component.

## CSS example

```css
.primary-action {
  min-height: var(--size-element-lg);
  padding-inline: var(--spacing-4);
  border: var(--border-width) solid var(--color-accent);
  border-radius: var(--radius-element);
  background: var(--color-accent);
  color: var(--color-on-accent);
  font: inherit;
  font-weight: var(--font-weight-medium);
}

.primary-action:focus-visible,
.text-field:focus-visible {
  outline: var(--focus-outline-width) var(--focus-outline-style)
    var(--focus-outline-color);
  outline-offset: var(--focus-outline-offset);
}

.text-field {
  min-height: var(--size-element-lg);
  padding-inline: var(--spacing-3);
  border: var(--border-width) solid var(--color-border-emphasized);
  border-radius: var(--radius-element);
  background: var(--color-background-surface);
  color: var(--color-text-primary);
}
```

## Markup

```html
<button class="primary-action" type="button">Save changes</button>

<label for="project-name">Project name</label>
<input
  class="text-field"
  id="project-name"
  name="project-name"
  type="text"
  aria-describedby="project-name-help"
/>
<small id="project-name-help">Choose a name your team will recognize.</small>
```

The sample variables are from the published base token layer documented in
[`../references/tokens.css`](../references/tokens.css). An active theme may
override them. Do not add that snapshot as a production dependency; use
Astryx's documented integration and theme setup.

## Review

- The action is a button, while the field has a persistent label.
- Both controls use semantic values instead of hard-coded palette colors.
- Focus is visible when navigating by keyboard.
- Confirm contrast and appearance with the actual theme in both light and dark
  modes.

## Source

See [SKILL.md](../SKILL.md), the
[official component catalogue](https://astryx.atmeta.com/components), and the
[official theme gallery](https://astryx.atmeta.com/themes).
