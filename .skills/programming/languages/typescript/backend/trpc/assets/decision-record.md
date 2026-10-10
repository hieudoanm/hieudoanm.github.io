# tRPC Best Practices: Decision Record

Use this record when applying [tRPC Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for building TypeScript client/server APIs with tRPC — the end-to-end typed procedure framework conventions. Use when writing, structuring, or reviewing tRPC — covers routers/procedures, input schemas, middleware, context, error handling, and testing.

tRPC gives **end-to-end typed APIs** — the same Router types flow from server (@trpc/server) to client (@trpc/client) without codegen. Practical tRPC leans on **small routers per domain exposing sub routers, zod input/output schemas on every procedure, middleware for context/auth/rate-limit**, and **Context built at request time (never global)**. Type theory isn't the feature — the total package (types + validation + errors) is the API contract.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Router Structure
- [ ] 2. Procedures & Input Schemas
- [ ] 3. Context
- [ ] 4. Middleware & Authorization
- [ ] 5. Error Handling
- [ ] 6. Client Integration
- [ ] 7. Testing
- [ ] General Rules of Thumb

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
