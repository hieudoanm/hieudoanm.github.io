# Client: Starter Template

A reusable starting point derived from the **2. Setup** section of [Client](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
