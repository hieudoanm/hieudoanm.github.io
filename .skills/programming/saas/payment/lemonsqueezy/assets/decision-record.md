# Lemon Squeezy Best Practices: Decision Record

Use this record when applying [Lemon Squeezy Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for selling digital products and subscriptions with Lemon Squeezy (now part of Stripe's merchant of record). Use when integrating checkout, managing licenses/entitlements, or consuming webhooks — covers MoR model, webhook signatures, and subscription lifecycle.

Lemon Squeezy is a **merchant of record (MoR)** for digital products — it owns tax, invoicing, and compliance. Best practice is leaning on that: LS-driven checkout, **webhooks as the entitlement source of truth**, and your server both issuing licenses/entitlements and verifying them.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Concepts
- [ ] 2. Checkout & Correlation
- [ ] 3. Webhooks & Entitlement
- [ ] 4. MoR & Compliance
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
