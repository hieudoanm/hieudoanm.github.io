# SolidJS Best Practices: 7. Performance

## Source guidance

This example applies the **7. Performance** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Fine-grained reactivity** — Solid's reactivity is already optimized
- **Memoization** — use createMemo for expensive computations:
- **Lazy loading** — lazy load components:
- **Resource for async data** — use createResource for async operations:

## Example

```typescript
const expensiveValue = createMemo(() => {
  return heavyComputation(data())
})
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for solidjs-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
