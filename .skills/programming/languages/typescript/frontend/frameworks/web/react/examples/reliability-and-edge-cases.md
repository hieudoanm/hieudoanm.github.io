# React Best Practices: 5. Performance Optimization

## Source guidance

This example applies the **5. Performance Optimization** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **React.memo for expensive components** — memoize components that re-render unnecessarily:
- **Code splitting** — use `React.lazy` and `Suspense` for code splitting:
- **Virtualization for long lists** — use react-window or react-virtual for long lists
- **Avoid unnecessary re-renders** — use proper memoization techniques

## Example

```tsx
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  return <div>{/* expensive rendering */}</div>
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for react-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
