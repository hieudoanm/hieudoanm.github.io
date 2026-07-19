# 5. Common Pitfalls

Focused reference for **bootstrap**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 5. Common Pitfalls

- Importing JS but missing Popper for tooltips/popovers.
- Overriding components by hacky class overrides instead of Sass variables.
- Neglecting responsiveness on custom content (fixed widths outside grid).
- Conflict between Bootstrap and existing CSS (order/layer management).

```html
<!-- Bad: bootstrap.js alone leaves tooltips/popovers without Popper -->
<script src="bootstrap/dist/js/bootstrap.js"></script>

<!-- Good: the bundle ships Bootstrap + Popper together -->
<script src="bootstrap/dist/js/bootstrap.bundle.min.js"></script>
```
