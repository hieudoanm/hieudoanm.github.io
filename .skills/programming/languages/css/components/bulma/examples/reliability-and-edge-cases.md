# Bulma: 6. Common Pitfalls

## Source guidance

This example applies the **6. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Assuming all components are interactive without adding the needed JS (modals/burger).
- Over-relying on the default look for strong brand identity.
- Importing the full CSS when you only need parts.

## Example

```javascript
// Bulma is CSS-only: wire the navbar burger (and other toggles) yourself
const burger = document.querySelector('.navbar-burger');
const menu = document.getElementById(burger.dataset.target);

burger.addEventListener('click', () => {
  burger.classList.toggle('is-active');
  menu.classList.toggle('is-active');
});
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for bulma.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
