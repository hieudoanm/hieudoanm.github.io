# 3. Components

Focused reference for **bootstrap**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Components

- Buttons, alerts, badges, cards, navs/navbar, forms, dropdowns, modals, toasts, tooltips, popovers, carousel.
- Interaction components require JS: initialize with `data-bs-*` attributes for simplicity.
- Accessibility: many components ship with ARIA roles; verify contrast and keyboard support.

```html
<!-- data-bs-* attributes initialise plugins without writing JS -->
<div class="dropdown">
  <button
    class="btn btn-primary dropdown-toggle"
    type="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Actions
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="/settings">Settings</a></li>
    <li><a class="dropdown-item text-danger" href="/delete">Delete</a></li>
  </ul>
</div>

<button
  class="btn btn-outline-secondary"
  data-bs-toggle="modal"
  data-bs-target="#confirmModal"
>
  Open modal
</button>
```
