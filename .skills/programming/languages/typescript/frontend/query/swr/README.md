# SWR Best Practices

SWR (**stale-while-revalidate**) is a **React data-fetching hooks library** — useSWR(key, fetcher) with caching, revalidation, focus refetch, and dedupe. Practical SWR leans on **a single typed fetcher per app, key = cache identity, mutate/optimistic updates for mutations, and revalidation strategy deliberate (focus/interval/throttle)** — the key is the cache contract; the fetcher is the seam.

## When to use

Use when writing, structuring, or reviewing SWR.

## Core topics

- 1. Keys & FETCHERS
- 2. Revalidation Strategy
- 3. Mutations
- 4. Fallback & Hydration
- 5. Loading & Errors
- 6. Performance & Tuning

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [SWR Best Practices: Basic Usage](./examples/basic-usage.md)
- [SWR Best Practices: 5. Loading & Errors](./examples/reliability-and-edge-cases.md)
- [SWR Best Practices: 2. Revalidation Strategy](./examples/setup-and-configuration.md)
- [SWR Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [SWR Best Practices: Decision Record](./assets/decision-record.md)
- [SWR Best Practices: Starter Template](./assets/starter-template.md)
- [SWR Best Practices: Validation Plan](./assets/validation-plan.md)
- [SWR Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
