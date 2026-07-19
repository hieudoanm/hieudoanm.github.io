# TanStack Query Best Practices: Basic Usage

Best practices for server state with TanStack Query — the React Query conventions for async state in JS apps. Use when writing, structuring, or reviewing TanStack Query — covers QueryClient, keys, queries, mutations, caching, infinite queries, and testing.

## Scenario

Use this example as a starting point when applying **tanstack-query-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. QueryClient & Defaults** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
