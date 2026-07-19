# 6. Common Pitfalls

Focused reference for **materializecss**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Common Pitfalls

- Forgetting JS initialization → tabs/dropdowns don't open.
- Using outdated components (it's based on older Material Design).
- Self-size-dates and pickers needing explicit locale/options.

```html
<!-- Bad: CSS only, so tabs/sidenav/modals stay inert -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />

<!-- Good: load the bundle, then initialise -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => M.AutoInit());
</script>
```
