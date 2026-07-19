# Nuxt Best Practices: Starter Template

A reusable starting point derived from the **10. Styling** section of [Nuxt Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```vue
<style module>
.button {
  padding: 8px 16px;
}
</style>

<template>
  <button :class="$style.button">Click me</button>
</template>
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
