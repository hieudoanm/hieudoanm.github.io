# 6. Common Pitfalls

Focused reference for **bulma**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Common Pitfalls

- Assuming all components are interactive without adding the needed JS (modals/burger).
- Over-relying on the default look for strong brand identity.
- Importing the full CSS when you only need parts.

```javascript
// Bulma is CSS-only: wire the navbar burger (and other toggles) yourself
const burger = document.querySelector('.navbar-burger');
const menu = document.getElementById(burger.dataset.target);

burger.addEventListener('click', () => {
  burger.classList.toggle('is-active');
  menu.classList.toggle('is-active');
});
```
