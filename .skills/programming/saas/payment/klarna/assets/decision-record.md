# Klarna Best Practices: Decision Record

Use this record when applying [Klarna Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for integrating Klarna payment and Pay Later services. Use when offering Klarna checkout, affecting order flows with a payment SDK/v2 API, or handling webhooks — covers session creation, authorization, and capture (order management).

Klarna offers **Checkout (v2), Payment (v3), and Pay Later** products. Best practice is session-first integration: create a **Checkout Session** server-side, the client renders the iframe, your server **captures/holds the order** after authorization, and **webhooks** tell you the final state.

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
- [ ] 3. Authorization & Capture
- [ ] 4. Webhooks & Notifications
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
