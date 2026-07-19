# Zustand Best Practices: Decision Record

Use this record when applying [Zustand Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for state management with Zustand — the minimal hook-store conventions for React. Use when writing, structuring, or reviewing Zustand — covers stores, selectors, actions, middleware (persist/devtools/immer), and testing.

Zustand is a **minimal hook-based store** — a create() store with set/get returns a hook (useCountStore) where **selectors ((s) => s.count) drive granular re-renders**. Practical Zustand leans on **small stores per domain, selector functions over whole-store reads, actions as plain functions (no strict reducers)**, and **middleware (persist, devtools, immer) only where the feature is genuinely used**. The knobs are few — the discipline is in the selector and state shape.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Creating a Store
- [ ] 2. Selectors & Re-renders
- [ ] 3. Actions & Async
- [ ] 4. Middleware
- [ ] 5. Store Composition
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
