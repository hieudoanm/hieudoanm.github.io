# Svelte Best Practices: Starter Template

A reusable starting point derived from the **2. Component Structure** section of [Svelte Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```svelte
<script lang="ts">
  interface Props {
    title: string
    count?: number
  }

  export let title: Props['title']
  export let count: Props['count'] = 0
</script>
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
