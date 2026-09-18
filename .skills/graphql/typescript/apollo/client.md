---
name: apollo-client
description: Apollo Client — TypeScript/JavaScript GraphQL client for caching, state management, and subscriptions in React, React Native, and other frameworks.
---

Apollo Client is the **industry-standard GraphQL client** for TypeScript/JS apps. It provides **normalized, in-memory caching**, optimistic UI, pagination helpers, and reactive state management — letting you query a GraphQL API with confidence and performance.

## 1. Core Concepts

- **`ApolloClient`** instance holds the connection (in-memory cache + HTTP/WebSocket link).
- **Queries**: `useQuery` (hook) / `useLazyQuery`; **Mutations**: `useMutation`; **Subscriptions**: `useSubscription` via `GraphQLWsLink`.
- **Normalized caching**: objects stored by ID (default `id` or `_id`) and refetched automatically via `cache` policies.
- **Links**: the transport layer (`HttpLink`, `GraphWsLink`); middleware links for auth headers, retries, error handling.
- **Policies** (`typePolicies`) shape cache behavior: `keyFields`, `merge`/`read` for pagination, `fieldPolicy`.

## 2. Setup

- Dependencies: `@apollo/client` (+ `graphql`), transport: HTTP (`HttpLink`) or WebSocket (`GraphQLWsLink`).
- Create `ApolloClient({ uri, cache: new InMemoryCache({ typePolicies }) })`.
- Wrap app in `<ApolloProvider client={client}>`.
- React helpers: `useQuery(MY_QUERY, { variables })` returns `{ data, loading, error, refetch, ... }`.

## 3. Queries, Variables & Polling

- Write queries with **fragments** and **`useQuery`** for reuse and cache-update safety.
- Pass variables: `useQuery(GET_USER, { variables: { id } })`.
- `pollInterval` for periodic refresh; `skip` for conditional queries.
- `fetchPolicy` (cache-first default): `cache-only`, `cache-and-network`, `network-only`, `no-cache`.
- **Refetch**: `refetch({ newVars })` re-executes the query; `refetchQueries`.

## 4. Mutations & Optimistic UI

- `useMutation(MUTATE, { onCompleted, onError })();` call with `{ variables }`.
- `update` function mutates the cache after success (read/write query) — keeps UI consistent.
- **Optimistic UI**: pass `optimisticResponse`; rollback automatically on error.
- **Error handling**: Apollo surfaces `graphQLErrors` (server) vs `networkError` (link); define ErrorLink for global handling.
- `refetchQueries` after mutations that invalidate lists.

## 5. Cache & Normalization

- Normalized cache stores objects by `__typename:id` keys; `keyFields` override for composite/synthetic keys.
- Use **`field policies`** for pagination (`read` + `merge`) — e.g., `concatPagination`/`offsetLimitPagination` helpers.
- **Cache manipulation**: `cache.readQuery`/`writeQuery`, `cache.modify` for direct item updates.
- `gc` collects unused; monitor `cache.extract()` for debugging.

## 6. Subscriptions

- HTTP+WS link: `split` to route subscription operations to `GraphQLWsLink`.
- `useSubscription` with `onData`; update cache in response to events.
- Reconnect: `retry` policy on the websocket.
- Prefer **loose coupling** for real-time — combine with queries where volume is high.

## 7. TypeScript Codegen

- Generate typed hooks with **GraphQL Code Generator** (codegen.yml → sources/schema → `gql` exports).
- `typedDocumentNode`/`gql` exports give exact `data` types per query.
- This eliminates most manual typing surprises and keeps API drift visible at compile time.

## 8. Common Pitfalls

- Forgetting `keyFields` on types without `id` → wrong cache identity, stale UI.
- Allowing **cache-first** everywhere for volatile data → stale sessions.
- Mutating in `update` without `read/write` — shape mismatch causing console errors.
- N+1 fragments or unnecessary nested queries on large collections.
- Ignoring error `graphQLErrors` in favor of fat network errors.

## General Rules of Thumb

- Always generate typed hooks (codegen) — types are the contract.
- Configure `typePolicies`/`keyFields` early to prevent cache identity bugs.
- Use optimistic + `update` for snappy mutations; `refetchQueries` for integrations.
- Keep subscriptions scoped; never poll when a subscription exists.
- Prefer `cache-and-network` over pure `network-only` where freshness matters.

## Quick-Start Checklist

- [ ] Create `ApolloClient` + `InMemoryCache`; set up HTTP/WS links.
- [ ] Wrap app tree in `<ApolloProvider>`.
- [ ] Run GraphQL Codegen for typed hooks.
- [ ] Add `typePolicies`/`keyFields` for your models.
- [ ] Use `useQuery`/`useMutation`; add `update`/`refetchQueries`.
- [ ] Add optimistic responses for latency-sensitive flows.
- [ ] Set up `ErrorLink` for global error surfaces.
- [ ] Instrument cache status and query stats in dev.