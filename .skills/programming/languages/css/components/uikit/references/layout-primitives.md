# 2. Layout Primitives

Focused reference for **uikit**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Layout Primitives

- Flexbox utilities: `uk-flex`, `uk-flex-center`, `uk-flex-between`, `uk-flex-wrap`.
- Grid: `uk-grid`, `uk-grid-small/large`, `uk-child-width-*`, `uk-grid-divider`.
- Containers: `uk-container`, `uk-container-expand`; section modifiers (`uk-section`).

```html
<div class="uk-container">
  <div class="uk-grid-small uk-child-width-1-3@m" uk-grid>
    <div><div class="uk-card uk-card-body uk-card-primary">One</div></div>
    <div><div class="uk-card uk-card-body uk-card-primary">Two</div></div>
    <div><div class="uk-card uk-card-body uk-card-primary">Three</div></div>
  </div>
</div>
```
