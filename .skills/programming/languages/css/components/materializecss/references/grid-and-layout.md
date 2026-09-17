# 2. Grid and Layout

Focused reference for **materializecss**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Grid and Layout

- 12-column **flexbox `row`/`col` grid** with breakpoints (s/m/l/xl).
- Utilities: `container`, `section`, `divider`, `valign-wrapper`, hide/show via `hide-on-*`.
- Offsets and push/pull for column reordering.

```html
<div class="container">
  <div class="row">
    <div class="col s12 m6 l4">
      <div class="card"><div class="card-content">Columns 1</div></div>
    </div>
    <div class="col s12 m6 l4">
      <div class="card"><div class="card-content">Columns 2</div></div>
    </div>
    <div class="col s12 m6 l4">
      <div class="card"><div class="card-content">Columns 3</div></div>
    </div>
  </div>
</div>
```
