# Apollo Client Best Practices: Basic Usage

Best practices for GraphQL data fetching with Apollo Client — the GraphQL client conventions for React apps. Use when writing, structuring, or reviewing Apollo Client — covers setup, queries/mutations, caching, fragments, and performance.

## Scenario

Use this example as a starting point when applying **apollo-client-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Setup & Client** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "/graphql", credentials: "include" }),
  cache: new InMemoryCache(),
});
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
