# 2. Grid System and Layout

Focused reference for **bootstrap**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Grid System and Layout

- 12-column flexbox-based grid: `.container`, `.container-fluid`, `.row`, `.col`, `.col-md-6` etc.
- Breakpoints: `xs`, `sm`, `md`, `lg`, `xl`, `xxl` (576/768/992/1200/1400px).
- Utility classes for layout: `d-flex`, `justify-content-*`, `align-items-*`, `gap-*`, `order-*`.
- CSS Grid option: Bootstrap 5 provides `g-*` gutter and `row-cols-*` for equal-width auto columns.

```html
<div class="container">
  <div class="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3">
    <div class="col">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">Starter</h5>
          <p class="card-text">For side projects.</p>
        </div>
      </div>
    </div>
  </div>
</div>
```
