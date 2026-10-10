# Workflow notes

Focused reference for **tanstack-query-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
