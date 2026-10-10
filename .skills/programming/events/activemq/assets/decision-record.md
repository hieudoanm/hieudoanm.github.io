# ActiveMQ Best Practices: Decision Record

Use this record when applying [ActiveMQ Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for JMS-compliant messaging and enterprise integration with ActiveMQ (Classic or Artemis). Use when designing queues/topics, choosing acknowledgement modes, configuring redelivery and DLQs, transactions, or tuning broker operations — treats ActiveMQ as message-oriented middleware, not a stream.

ActiveMQ (Classic or Artemis) is **message-oriented middleware** implementing JMS: messages are consumed, acknowledged, and removed. Best practice is JMS-first design — choose Queue vs Topic explicitly, prefer destination-level routing over selectors, acknowledge deliberately, use transactions for at-least-once + idempotency, and configure redelivery/DLQ as explicit design.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Constraints
- [ ] 2. Messaging Models & Destination Design
- [ ] 3. Reliability, Transactions & Delivery Semantics
- [ ] 4. Performance & Operations
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
