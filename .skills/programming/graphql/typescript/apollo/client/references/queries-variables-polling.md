# 3. Queries, Variables & Polling

Focused reference for **apollo-client**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Queries, Variables & Polling

- Write queries with **fragments** and **`useQuery`** for reuse and cache-update safety.
- Pass variables: `useQuery(GET_USER, { variables: { id } })`.

```tsx
const USER_FIELDS = gql`fragment UserFields on User { id name email }`

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      ...UserFields
      posts(first: 10) { id title } # every Post needs its id for cache identity
    }
  }
  ${USER_FIELDS}
`

const { data, loading, error, refetch } = useQuery(GET_USER, {
  variables: { id },
  fetchPolicy: 'cache-and-network',
  skip: !id,
})
```

- `pollInterval` for periodic refresh; `skip` for conditional queries.
- `fetchPolicy` (cache-first default): `cache-only`, `cache-and-network`, `network-only`, `no-cache`.
- **Refetch**: `refetch({ newVars })` re-executes the query; `refetchQueries`.
