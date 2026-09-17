# 2. Setup

Focused reference for **apollo-client**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 2. Setup

- Dependencies: `@apollo/client` (+ `graphql`), transport: HTTP (`HttpLink`) or WebSocket (`GraphQLWsLink`).
- Create `ApolloClient({ uri, cache: new InMemoryCache({ typePolicies }) })`.

```ts
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = new HttpLink({ uri: '/graphql' })
const authLink = setContext((_operation, { headers }) => ({
  headers: { ...headers, authorization: `Bearer ${sessionStorage.getItem('token') ?? ''}` },
}))

export const client = new ApolloClient({
  link: authLink.concat(httpLink), // request -> auth header -> network
  cache: new InMemoryCache({ typePolicies: { User: { keyFields: ['id'] } } }),
})
```

- Wrap app in `<ApolloProvider client={client}>`.
- React helpers: `useQuery(MY_QUERY, { variables })` returns `{ data, loading, error, refetch, ... }`.
