# RevenueCat Best Practices

RevenueCat abstracts **App Store / Play Store IAP** into one API — products, purchases, entitlements, and webhooks. Best practice is treating RevenueCat as the **single source of entitlement truth**: purchase through their SDK, consume their webhooks for the backend, and only grant features when entitlements are active.

## When to use

Use when integrating IAP on iOS/Android (and web), managing entitlement state, or this offering trial promotions.

## Core topics

- 1. Core Stack & Concepts
- 2. Integration & SDK Use
- 3. Entitlements & Backend Truth
- 4. Trials, Promotions & Store Compliance
- 5. Reliability & Operations

## Reference materials

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Examples

- [RevenueCat Best Practices: Basic Usage](./examples/basic-usage.md)
- [RevenueCat Best Practices: 5. Reliability & Operations](./examples/reliability-and-edge-cases.md)
- [RevenueCat Best Practices: 3. Entitlements & Backend Truth](./examples/setup-and-configuration.md)
- [RevenueCat Best Practices: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [RevenueCat Best Practices: Decision Record](./assets/decision-record.md)
- [RevenueCat Best Practices: Starter Template](./assets/starter-template.md)
- [RevenueCat Best Practices: Validation Plan](./assets/validation-plan.md)
- [RevenueCat Best Practices: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
