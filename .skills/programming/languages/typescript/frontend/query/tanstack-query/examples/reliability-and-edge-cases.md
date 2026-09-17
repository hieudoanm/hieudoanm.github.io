# TanStack Query Best Practices: 6. Testing & Devtools

## Source guidance

This example applies the **6. Testing & Devtools** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Wrap tests with a fresh `QueryClient` (retry: false, gcTime: Infinity):**
- **Devtools (`@tanstack/react-query-devtools`) inspect cache/staleness — the debugging lens.**
- **Cache correctness tests: after mutation, query invalidation observed (queryClient assertions).**

## Example

```tsx
const testClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for tanstack-query-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
