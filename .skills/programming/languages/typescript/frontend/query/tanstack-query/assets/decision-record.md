# TanStack Query Best Practices: Decision Record

Use this record when applying [TanStack Query Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for server state with TanStack Query — the React Query conventions for async state in JS apps. Use when writing, structuring, or reviewing TanStack Query — covers QueryClient, keys, queries, mutations, caching, infinite queries, and testing.

TanStack Query (React Query) manages **server state — cached queries (useQuery) and mutations (useMutation) with a QueryClient** — the cache is the source of truth for fetched data. Practical TanStack Query leans on **a single QueryClient with per-app defaults, structured query keys (hierarchical), staleTime deliberate, mutations updating the cache via invalidateQueries/setQueryData, and useSuspenseQuery-ready loading states** — separating server state from client state is the library's reason to exist.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. QueryClient & Defaults
- [ ] 2. Query Keys
- [ ] 3. useQuery & States
- [ ] 4. Mutations & Cache Updates
- [ ] 5. Infinite & Prefetching
- [ ] 6. Testing & Devtools
- [ ] General Rules of Thumb
- [ ] Quick-Start Checklist

## Decision

- Chosen approach:
- Alternatives considered:
- Evidence and tradeoffs:
- Assumptions or deviations from the skill:

## Consequences and review

- Expected benefits:
- Risks and mitigations:
- Validation required before adoption:
- Revisit when:
