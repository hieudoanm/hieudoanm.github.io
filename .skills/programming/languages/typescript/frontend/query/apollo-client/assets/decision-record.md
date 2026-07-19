# Apollo Client Best Practices: Decision Record

Use this record when applying [Apollo Client Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for GraphQL data fetching with Apollo Client — the GraphQL client conventions for React apps. Use when writing, structuring, or reviewing Apollo Client — covers setup, queries/mutations, caching, fragments, and performance.

Apollo Client is **the GraphQL client for React** — ApolloProvider + useQuery/useMutation with a normalized cache. Practical Apollo leans on **declarative useQuery per view (with fetchPolicy deliberate), mutations useMutation + cache update strategy (refetchQueries vs update), fragment reuse (gql strings modularized), and cache normalization understood (id)**, with error/loading states explicit — GraphQL gives you control; Apollo bakes it into the cache.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Setup & Client
- [ ] 2. Queries
- [ ] 3. Mutations
- [ ] 4. Fragments & Schemas
- [ ] 5. Cache & Normalization
- [ ] 6. Performance & DevTools
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
