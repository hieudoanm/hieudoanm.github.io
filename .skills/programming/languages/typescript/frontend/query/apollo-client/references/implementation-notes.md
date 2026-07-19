# Implementation notes

Focused reference for **apollo-client-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 4. Fragments & Schemas

- **Reusable `gql` fragments colocated with the component; shared shape contract:**

```graphql
fragment OrderFields on Order {
  id
  amount
  status
}
```

- **Parts reused across query/mutation — no duplicated inline fragments.**
- **`PossibleTypes`/schema introspection for cache policy (`typePolicies` on id/simple fields).**

---

## 5. Cache & Normalization

- **Normalized by `__typename + id`; `typePolicies` for keys/merges:**

```ts
const cache = new InMemoryCache({
  typePolicies: {
    Order: { fields: { items: { merge(existing, incoming) { return incoming; } } } },
  },
});
```

- **`id` always requested (or a `typePolicy` key) — else FieldPolicy drift.**
- **`cache.writeFragment`/`readFragment` for surgical reads/writes; evictions deliberate (paginated lists).**
