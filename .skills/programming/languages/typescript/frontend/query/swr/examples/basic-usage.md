# SWR Best Practices: Basic Usage

Best practices for data fetching with SWR — the React hooks data-revalidation conventions for Vercel-style apps. Use when writing, structuring, or reviewing SWR — covers keys, fetcher, revalidation, mutations, fallback, and caching.

## Scenario

Use this example as a starting point when applying **swr-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Keys & FETCHERS** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```ts
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => {
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return r.json();
});

function useOrders() {
  return useSWR("/api/orders", fetcher);
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
