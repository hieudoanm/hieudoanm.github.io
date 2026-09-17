# SWR Best Practices: Decision Record

Use this record when applying [SWR Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for data fetching with SWR — the React hooks data-revalidation conventions for Vercel-style apps. Use when writing, structuring, or reviewing SWR — covers keys, fetcher, revalidation, mutations, fallback, and caching.

SWR (**stale-while-revalidate**) is a **React data-fetching hooks library** — useSWR(key, fetcher) with caching, revalidation, focus refetch, and dedupe. Practical SWR leans on **a single typed fetcher per app, key = cache identity, mutate/optimistic updates for mutations, and revalidation strategy deliberate (focus/interval/throttle)** — the key is the cache contract; the fetcher is the seam.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Keys & FETCHERS
- [ ] 2. Revalidation Strategy
- [ ] 3. Mutations
- [ ] 4. Fallback & Hydration
- [ ] 5. Loading & Errors
- [ ] 6. Performance & Tuning
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
