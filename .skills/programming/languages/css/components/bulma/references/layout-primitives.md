# 2. Layout Primitives

Focused reference for **bulma**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Layout Primitives

- Columns: `.columns` / `.column` flexbox grid; size via `.is-1`…`.is-12`, offsets `.is-offset-*`.
- Next: containers `.container`, sections `.section`, and spacing helpers.
- Multi-line auto-fit: `.columns.is-multiline` + per-column widths.

```html
<div class="container">
  <div class="columns is-multiline is-variable is-4">
    <div class="column is-4">
      <div class="box">Column one</div>
    </div>
    <div class="column is-4">
      <div class="box">Column two</div>
    </div>
    <div class="column is-4">
      <div class="box">Column three</div>
    </div>
  </div>
</div>
```
