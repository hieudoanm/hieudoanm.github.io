# PayPal Best Practices: Decision Record

Use this record when applying [PayPal Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for integrating PayPal payments. Use when adding checkout, subscriptions/billing, or handling webhooks — covers order/v2 API, webhook verification, and dispute handling.

PayPal offers checkout and merchant APIs (REST v2 Orders/Catalog/Subscriptions) plus the classic flow. Best practice is using the **Orders v2 API** for modern checkout, **verifying webhooks** for order/billing state, and reconciling against the order ID rather than trusting client callbacks.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Concepts
- [ ] 2. Checkout Integration
- [ ] 3. Subscriptions & Billing
- [ ] 4. Webhooks & Verification
- [ ] 5. Security & Operations
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
