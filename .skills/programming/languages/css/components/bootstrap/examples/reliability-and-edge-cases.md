# Bootstrap: 5. Common Pitfalls

## Source guidance

This example applies the **5. Common Pitfalls** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Importing JS but missing Popper for tooltips/popovers.
- Overriding components by hacky class overrides instead of Sass variables.
- Neglecting responsiveness on custom content (fixed widths outside grid).
- Conflict between Bootstrap and existing CSS (order/layer management).

## Example

```html
<!-- Bad: bootstrap.js alone leaves tooltips/popovers without Popper -->
<script src="bootstrap/dist/js/bootstrap.js"></script>

<!-- Good: the bundle ships Bootstrap + Popper together -->
<script src="bootstrap/dist/js/bootstrap.bundle.min.js"></script>
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for bootstrap.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
