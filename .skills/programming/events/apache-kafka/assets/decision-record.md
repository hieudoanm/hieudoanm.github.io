# Apache Kafka Best Practices: Decision Record

Use this record when applying [Apache Kafka Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for event streaming with Apache Kafka. Use when designing topics and schemas, building producers/consumers, choosing delivery semantics, debugging consumer lag, or planning streaming pipelines — treats Kafka as an event log and streaming backbone, not a queue or database.

Kafka is an **event log and streaming backbone** — immutable, append-only events retained independently of consumption, replayed freely, ordered per partition. Best practice is designing topics around business events with stable naming and versioned schemas, choosing partition keys intentionally, committing offsets deliberately, and building idempotent consumers because reprocessing and duplicates are the expected contract.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Constraints
- [ ] 2. Topic & Data Modeling
- [ ] 3. Reliability & Delivery Guarantees
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
