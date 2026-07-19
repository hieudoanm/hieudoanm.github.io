# React Best Practices: Starter Template

A reusable starting point derived from the **5. Performance Optimization** section of [React Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```tsx
const HeavyComponent = React.lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
