# Css: Starter Template

A reusable starting point derived from the **3. Selectors and Specificity** section of [Css](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```css
/* :where() scores 0 — reset without raising specificity */
:where(h1, h2, h3) {
  margin-block: 0;
}

/* :has() styles a parent based on its descendants */
.field:has(:user-invalid) {
  outline: 2px solid var(--color-danger);
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
