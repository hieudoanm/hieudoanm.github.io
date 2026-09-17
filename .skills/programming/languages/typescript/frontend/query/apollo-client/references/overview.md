# Overview

Focused reference for **apollo-client-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Apollo Client Best Practices

Apollo Client is **the GraphQL client for React** — `ApolloProvider` + `useQuery`/`useMutation` with a normalized cache. Practical Apollo leans on **declarative `useQuery` per view (with `fetchPolicy` deliberate), mutations `useMutation` + cache update strategy (refetchQueries vs `update`), fragment reuse (`gql` strings modularized), and cache normalization understood (`id`)**, with error/loading states explicit — GraphQL gives you control; Apollo bakes it into the cache.

---

## 1. Setup & Client

- **One `ApolloClient` per app — `uri`, `cache`, `link` chain:**

```ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({ uri: "/graphql", credentials: "include" }),
  cache: new InMemoryCache(),
});
```

- **Auth via `setContext` on the link (token from env/session store); the cache typed (`PossibleTypes`).**
- **SSR: `useFragment`/`getDataFromTree` wired only where SSR is real.**

---

## 2. Queries
