---
name: apollo-client-best-practices
description: Best practices for GraphQL data fetching with Apollo Client — the GraphQL client conventions for React apps. Use when writing, structuring, or reviewing Apollo Client — covers setup, queries/mutations, caching, fragments, and performance.
---

# Apollo Client Best Practices

Apollo Client is **the GraphQL client for React** — `ApolloProvider` + `useQuery`/`useMutation` with a normalized cache. Practical Apollo leans on **declarative `useQuery` per view (with `fetchPolicy` deliberate), mutations `useMutation` + cache update strategy (refetchQueries vs `update`), fragment reuse (`gql` strings modularized), and cache normalization understood (`id`)**, with error/loading states explicit — GraphQL gives you control; Apollo bakes it into the cache.

---

## 1. Setup & Client

- **One `ApolloClient` per app — `uri`, `cache`, `link` chain:**

```ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "/graphql", credentials: "include" }),
  cache: new InMemoryCache(),
});
```

- **Auth via `setContext` on the link (token from env/session store); the cache typed (`PossibleTypes`).**
- **SSR: `useFragment`/`getDataFromTree` wired only where SSR is real.**

---

## 2. Queries

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

---

## 6. Performance & DevTools

- **Bundle/fetch: `@apollo/client` fused; persisted queries where hot.**
- **React Profiler + Apollo DevTools for cache shapes; `gql` modularized so only used fields ship.**
- **End-to-end: typed hooks (`@graphql-codegen`) reduce string-drift — codegen on schema changes.**

---

## General Rules of Thumb

- **One client; declarative `useQuery` with explicit states.**
- **Mutations update via `refetchQueries` or normalized `update`.**
- **Fragments colocated & reused; schema/cache keys aligned.**
- **Optimistic + rollback; `fetchPolicy` deliberate.**
- **Typed codegen; profiler/devtools for shape debugging.**

---

## Quick-Start Checklist

- [ ] `ApolloClient` + typed `InMemoryCache`; link auth via setContext
- [ ] `useQuery` per view; loading/error/refetch states mapped
- [ ] `useMutation` + cache strategy (refetchQueries vs `update`)
- [ ] Fragments colocated/reused; `PossibleTypes`/codegen
- [ ] `typePolicies` for keys/merges; `id` always fetched
- [ ] Optimistic UI + rollback; DevTools checked; bundles lean