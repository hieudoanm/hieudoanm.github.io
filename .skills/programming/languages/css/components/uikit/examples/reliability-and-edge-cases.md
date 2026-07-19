# Uikit: 6. Common Pitfalls

## Source guidance

This example applies the **6. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Missing `uikit-icons` → icon glyphs don't render.
- Not importing required companion (e.g., `uikit.js` for interactions) → components stay inert.
- Treating UIkit as pure-CSS: most composites need JS initialized.

## Example

```html
<!-- Bad: icons render as empty spans without the icons script -->
<script src="/node_modules/uikit/dist/js/uikit.min.js"></script>

<!-- Good: include the icons build too -->
<script src="/node_modules/uikit/dist/js/uikit.min.js"></script>
<script src="/node_modules/uikit/dist/js/uikit-icons.min.js"></script>

<!-- Icons are then referenced via uk-icon -->
<span uk-icon="icon: plus; ratio: 1.4"></span>
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for uikit.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
