# Apollo Client Best Practices: Starter Template

A reusable starting point derived from the **1. Setup & Client** section of [Apollo Client Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "/graphql", credentials: "include" }),
  cache: new InMemoryCache(),
});
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
