# Clerk Best Practices: Decision Record

Use this record when applying [Clerk Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for adding authentication to modern apps with Clerk. Use when wiring up sign-in/sign-up, sessions, organization support, or webhooks — covers session validation, frontend/backend patterns, and identity data.

Clerk is a developer-friendly authentication service with prebuilt components and session management. Best practice is leaning on its **sessions and prebuilt components** for speed while keeping authorization server-side: validate sessions (JWT or webhooks) in your backend, sync identity via webhooks, and never trust client-only state.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Concepts
- [ ] 2. Integration Patterns
- [ ] 3. Authorization & Trust
- [ ] 4. Security & Operations
- [ ] 5. General Rules of Thumb
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
