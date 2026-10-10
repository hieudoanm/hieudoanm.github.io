# TanStack Query Best Practices

TanStack Query (React Query) manages **server state — cached queries (useQuery) and mutations (useMutation) with a QueryClient** — the cache is the source of truth for fetched data. Practical TanStack Query leans on **a single QueryClient with per-app defaults, structured query keys (hierarchical), staleTime deliberate, mutations updating the cache via invalidateQueries/setQueryData, and useSuspenseQuery-ready loading...

## When to use

Use when writing, structuring, or reviewing TanStack Query.

## Core topics

- 1. QueryClient & Defaults
- 2. Query Keys
- 3. useQuery & States
- 4. Mutations & Cache Updates
- 5. Infinite & Prefetching
- 6. Testing & Devtools

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [TanStack Query Best Practices: Basic Usage](./examples/basic-usage.md)
- [TanStack Query Best Practices: 6. Testing & Devtools](./examples/reliability-and-edge-cases.md)
- [TanStack Query Best Practices: 4. Mutations & Cache Updates](./examples/setup-and-configuration.md)
- [TanStack Query Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [TanStack Query Best Practices: Decision Record](./assets/decision-record.md)
- [TanStack Query Best Practices: Starter Template](./assets/starter-template.md)
- [TanStack Query Best Practices: Validation Plan](./assets/validation-plan.md)
- [TanStack Query Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
