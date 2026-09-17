# 1. Core Concepts

Focused reference for **apollo-client**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 1. Core Concepts

- **`ApolloClient`** instance holds the connection (in-memory cache + HTTP/WebSocket link).
- **Queries**: `useQuery` (hook) / `useLazyQuery`; **Mutations**: `useMutation`; **Subscriptions**: `useSubscription` via `GraphQLWsLink`.
- **Normalized caching**: objects stored by ID (default `id` or `_id`) and refetched automatically via `cache` policies.
- **Links**: the transport layer (`HttpLink`, `GraphWsLink`); middleware links for auth headers, retries, error handling.
- **Policies** (`typePolicies`) shape cache behavior: `keyFields`, `merge`/`read` for pagination, `fieldPolicy`.
