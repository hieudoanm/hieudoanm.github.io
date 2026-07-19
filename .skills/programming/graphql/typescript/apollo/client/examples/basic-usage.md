# apollo-client: Basic Usage

Apollo Client — TypeScript/JavaScript GraphQL client for caching, state management, and subscriptions in React, React Native, and other frameworks.

## Scenario

Use this example as a starting point when applying **apollo-client** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Setup** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
