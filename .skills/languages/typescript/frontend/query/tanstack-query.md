---
name: tanstack-query-best-practices
description: Best practices for server state with TanStack Query — the React Query conventions for async state in JS apps. Use when writing, structuring, or reviewing TanStack Query — covers QueryClient, keys, queries, mutations, caching, infinite queries, and testing.
---

# TanStack Query Best Practices

TanStack Query (React Query) manages **server state — cached queries (`useQuery`) and mutations (`useMutation`) with a QueryClient** — the cache is the source of truth for fetched data. Practical TanStack Query leans on **a single `QueryClient` with per-app defaults, structured query keys (hierarchical), `staleTime` deliberate, mutations updating the cache via `invalidateQueries`/`setQueryData`, and `useSuspenseQuery`-ready loading states** — separating server state from client state is the library's reason to exist.

---

## 1. QueryClient & Defaults

- **One client; defaults used intentionally:**

```ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
});
```

- **Provide at the root; per-query overrides on top of the defaults.**
- **`staleTime` matches data volatility; `gcTime` for cache retention.**

---

## 2. Query Keys

- **Keys are the cache schema — hierarchical and serializable:**

```ts
["products", { id }]           // whole collection
["products", productId, "reviews" ]   // nested resource
```

- **Keys stable (no inline object identity churn — array membership).**
- **Query key factories centralize keys (`productKeys.list()`, `productKeys.detail(id)`) for reuse.**

---

## 3. useQuery & States

- **`useQuery` per resource; states explicit:**

```tsx
const { data, isLoading, error, isFetching } = useQuery({
  queryKey: productsKey,
  queryFn: fetchProducts,
});
```

- **`isLoading` (no data) vs `isFetching` (background refetch) rendered distinctly.**
- **`enabled` gating; `select` for view-mapped/shapeless derived data (memoized).**

---

## 4. Mutations & Cache Updates

- **`useMutation` updates the cache — `invalidateQueries` as the default, `setQueryData` for surgical:**

```tsx
const mutation = useMutation({
  mutationFn: createOrder,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ordersKey }),
});

// optimistic
await queryClient.cancelQueries({ queryKey: ordersKey });
queryClient.setQueryData(ordersKey, (old) => [newItem, ...(old ?? [])]);
```

- **Invalidate onSuccess (refetch updated data); optimistic with rollback (`onError: invalidate`).**
- **Mutation keys mirror resource keys; `onSettled` for teardown.**

---

## 5. Infinite & Prefetching

- **`useInfiniteQuery` for pagination/`getNextPageParam`:**

```tsx
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ["items", "infinite"],
  queryFn: ({ pageParam = 0 }) => fetchPage(pageParam),
  getNextPageParam: (last) => last.nextCursor,
});
```

- **`prefetchQuery`/`ensureQueryData` at route level for fast mounts.**
- **`useSuspenseQuery` for Suspense-driven trees; `placeholderData`/`keepPreviousData` for paging UX.**

---

## 6. Testing & Devtools

- **Wrap tests with a fresh `QueryClient` (retry: false, gcTime: Infinity):**

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