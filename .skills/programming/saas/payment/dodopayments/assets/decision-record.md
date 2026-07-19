# Dodo Payments Best Practices: Decision Record

Use this record when applying [Dodo Payments Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for integrating Dodo Payments, a payments platform for digital products. Use when accepting payments/subscriptions, handling local payment methods, or consuming webhooks — covers robust online payments, signature verification, and entitlement flow.

Dodo Payments is a payments platform (payments + subscriptions, checkout links/SDK). Best practice is the standard payment-service contract: **server-side session/checkout**, **webhook signatures verified**, **idempotent entitlement grants**, and **no client-trusted amounts**.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Concepts
- [ ] 2. Integration & Checkout
- [ ] 3. Webhooks & Entitlement
- [ ] 4. Data & Security
- [ ] 5. Reliability & Operations
- [ ] 6. General Rules of Thumb
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
