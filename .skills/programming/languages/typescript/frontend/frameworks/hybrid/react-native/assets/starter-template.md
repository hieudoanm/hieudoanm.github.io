# React Native Best Practices: Starter Template

A reusable starting point derived from the **9. APIs** section of [React Native Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```typescript
const fetchData = async () => {
  try {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
