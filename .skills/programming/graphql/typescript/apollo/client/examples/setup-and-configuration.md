# Client: 2. Setup

## Source guidance

This example applies the **2. Setup** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Dependencies: `@apollo/client` (+ `graphql`), transport: HTTP (`HttpLink`) or WebSocket (`GraphQLWsLink`).
- Create `ApolloClient({ uri, cache: new InMemoryCache({ typePolicies }) })`.
- Wrap app in `<ApolloProvider client={client}>`.
- React helpers: `useQuery(MY_QUERY, { variables })` returns `{ data, loading, error, refetch, ... }`.

## Example

This excerpt is from the cited **2. Setup** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for apollo-client.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
