# Lynx Best Practices: Starter Template

A reusable starting point derived from the **2. Component Structure** section of [Lynx Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```typescript
import { Platform } from 'react-native'

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      web: {
        maxWidth: '100%',
      },
      default: {
        width: '100%',
      },
    }),
  },
})
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
