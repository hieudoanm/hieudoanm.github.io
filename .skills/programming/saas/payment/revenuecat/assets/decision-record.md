# RevenueCat Best Practices: Decision Record

Use this record when applying [RevenueCat Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for in-app purchases and subscriptions with RevenueCat. Use when integrating IAP on iOS/Android (and web), managing entitlement state, or this offering trial promotions — treats RevenueCat as the entitlement source of truth for native stores.

RevenueCat abstracts **App Store / Play Store IAP** into one API — products, purchases, entitlements, and webhooks. Best practice is treating RevenueCat as the **single source of entitlement truth**: purchase through their SDK, consume their webhooks for the backend, and only grant features when entitlements are active.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Concepts
- [ ] 2. Integration & SDK Use
- [ ] 3. Entitlements & Backend Truth
- [ ] 4. Trials, Promotions & Store Compliance
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
