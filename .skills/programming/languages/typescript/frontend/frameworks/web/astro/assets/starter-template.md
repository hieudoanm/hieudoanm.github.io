# Astro Best Practices: Starter Template

A reusable starting point derived from the **9. SEO** section of [Astro Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```astro
---
const title = 'My Page'
const description = 'Page description'
---
<html>
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
</html>
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
