# Materializecss: 6. Common Pitfalls

## Source guidance

This example applies the **6. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Forgetting JS initialization → tabs/dropdowns don't open.
- Using outdated components (it's based on older Material Design).
- Self-size-dates and pickers needing explicit locale/options.

## Example

```html
<!-- Bad: CSS only, so tabs/sidenav/modals stay inert -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />

<!-- Good: load the bundle, then initialise -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => M.AutoInit());
</script>
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for materializecss.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
