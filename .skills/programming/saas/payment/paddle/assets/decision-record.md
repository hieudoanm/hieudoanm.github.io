# Paddle Best Practices: Decision Record

Use this record when applying [Paddle Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for selling digital products and subscriptions with Paddle. Use when integrating checkout, handling merchant-of-record tax/refunds, or consuming webhooks — covers webhook signatures, product/subscription modeling, and revenue recognition.

Paddle is a **merchant of record** (MoR): it handles sales tax, VAT, invoicing, and refunds for digital goods. Best practice is leaning on that model — Paddle owns tax/fiscal obligations, you consume **webhooks** for payment/fulfillment, and you keep product/catalog and prices server-side while honoring Paddle's pricing model (License pricing / Catalogs).

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Concepts
- [ ] 2. Checkout & Subscription Modeling
- [ ] 3. Webhooks & Fulfillment
- [ ] 4. Data, Revenue & Operations
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
