# 6. Common Pitfalls

Focused reference for **uikit**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Common Pitfalls

- Missing `uikit-icons` → icon glyphs don't render.
- Not importing required companion (e.g., `uikit.js` for interactions) → components stay inert.
- Treating UIkit as pure-CSS: most composites need JS initialized.

```html
<!-- Bad: icons render as empty spans without the icons script -->
<script src="/node_modules/uikit/dist/js/uikit.min.js"></script>

<!-- Good: include the icons build too -->
<script src="/node_modules/uikit/dist/js/uikit.min.js"></script>
<script src="/node_modules/uikit/dist/js/uikit-icons.min.js"></script>

<!-- Icons are then referenced via uk-icon -->
<span uk-icon="icon: plus; ratio: 1.4"></span>
```
