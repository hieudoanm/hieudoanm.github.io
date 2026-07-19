# Workflow notes

Focused reference for **apollo-client-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`useQuery` per view; loading/error explicit; `fetchPolicy` deliberate:**

```jsx
const { data, loading, error, refetch } = useQuery(GET_ORDERS, {
  fetchPolicy: "cache-and-network",
});
```

- **Default `cache-first` is fine; `network-only`/`no-cache` for volatile mutations.**
- **Variables via the options; `refetch`/`loading` boundaries render states.**

---

## 3. Mutations

- **`useMutation`; update the cache by design:**

```jsx
const [createOrder] = useMutation(CREATE_ORDER, {
  refetchQueries: [{ query: GET_ORDERS }],
});
```

- **Small mutations: `refetchQueries`; complex ones: `update(cache, { data: createOrder })` with normalized writes.**
- **Optimistic UI: `optimisticResponse` + rollback on error; `onError`/`onCompleted` for hooks.**

---
