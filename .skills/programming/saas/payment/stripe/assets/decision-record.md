# Stripe Best Practices: Decision Record

Use this record when applying [Stripe Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for integrating Stripe payments into a backend. Use when building checkout, subscriptions, webhooks, or payment processing — covers idempotency, webhook signatures, payment-method handling, and monitoring.

Stripe is the reference payments API. Best practice is treating every call as **idempotent and event-driven**: use idempotency keys, rely on **webhooks as the source of truth** for payment/intent/dispute state, verify signatures, keep secrets server-side, and never trust client-supplied amounts.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Principles
- [ ] 2. Integration & Checkout
- [ ] 3. Webhooks & State
- [ ] 4. Data & Endpoints
- [ ] 5. Reliability & Monitoring
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
