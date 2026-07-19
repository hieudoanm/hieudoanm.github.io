# Overview

Focused reference for **tanstack-query-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# TanStack Query Best Practices

TanStack Query (React Query) manages **server state — cached queries (`useQuery`) and mutations (`useMutation`) with a QueryClient** — the cache is the source of truth for fetched data. Practical TanStack Query leans on **a single `QueryClient` with per-app defaults, structured query keys (hierarchical), `staleTime` deliberate, mutations updating the cache via `invalidateQueries`/`setQueryData`, and `useSuspenseQuery`-ready loading states** — separating server state from client state is the library's reason to exist.

---

## 1. QueryClient & Defaults

- **One client; defaults used intentionally:**

```ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
});
```

- **Provide at the root; per-query overrides on top of the defaults.**
- **`staleTime` matches data volatility; `gcTime` for cache retention.**

---

## 2. Query Keys

- **Keys are the cache schema — hierarchical and serializable:**
