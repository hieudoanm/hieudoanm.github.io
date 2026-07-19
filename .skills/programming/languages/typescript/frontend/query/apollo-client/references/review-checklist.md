# Review checklist

Focused reference for **apollo-client-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
