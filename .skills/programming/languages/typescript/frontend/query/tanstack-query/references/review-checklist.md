# Review checklist

Focused reference for **tanstack-query-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```tsx
const testClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
```

- **Devtools (`@tanstack/react-query-devtools`) inspect cache/staleness — the debugging lens.**
- **Cache correctness tests: after mutation, query invalidation observed (queryClient assertions).**

---

## General Rules of Thumb

- **One QueryClient; defaults decided per data volatility.**
- **Hierarchical stable keys; factory helpers.**
- **`isLoading` vs `isFetching` distinct; `staleTime` deliberate.**
- **Mutations invalidate/setQueryData; optimistic with rollback.**
- **Infinite/prefetch/suspense for the right shapes; fresh client in tests.**

---

## Quick-Start Checklist

- [ ] `QueryClient` with defaults (staleTime/retry/refetch); provided at root
- [ ] Structured query keys + factories; stable references
- [ ] `useQuery` with distinct loading/fetching/error states
- [ ] Mutations invalidate after success; optimistic `setQueryData` + rollback
- [ ] `useInfiniteQuery`/`prefetch`/suspense shapes used deliberately
- [ ] Tests use a fresh client (retry false); DevTools wired for debug
