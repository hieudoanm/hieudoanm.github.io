# Implementation notes

Focused reference for **tanstack-query-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
