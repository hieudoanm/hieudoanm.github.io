# Lynx Best Practices: 5. Performance

## Source guidance

This example applies the **5. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Web-specific optimizations** — optimize for web performance:
- **Lazy loading** — lazy load components for web:
- **Image optimization** — optimize images for web:

## Example

```typescript
import { useMemo, useCallback } from 'react'

const optimizedComponent = useMemo(() => {
  return <ExpensiveComponent />
}, [dependencies])

const handleClick = useCallback(() => {
  // Handle click
}, [dependencies])
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for lynx-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
