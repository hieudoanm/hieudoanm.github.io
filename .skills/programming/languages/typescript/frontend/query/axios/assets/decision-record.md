# Axios Best Practices: Decision Record

Use this record when applying [Axios Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for HTTP requests with Axios — the promise-based HTTP client conventions for JS/TS apps. Use when writing, structuring, or reviewing Axios — covers instances, interceptors, error handling, typing, and testing.

Axios is the **promise-based HTTP client for browser + Node** — axios.create(instance) with interceptors, typed from TS generics. Practical Axios leans on **a single stamped instance per API (baseURL, timeout), interceptors for auth/error shaping only (not business logic), typed generic contracts, and defensive response validation** — the client is a boundary; interceptors cross it once.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Instances
- [ ] 2. Interceptors
- [ ] 3. Requests & Typing
- [ ] 4. Error Handling
- [ ] 5. Abort & Cancellation
- [ ] 6. Testing
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
