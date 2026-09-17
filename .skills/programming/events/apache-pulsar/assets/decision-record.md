# Apache Pulsar Best Practices: Decision Record

Use this record when applying [Apache Pulsar Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for event streaming with Apache Pulsar. Use when designing tenants/namespaces/topics, choosing subscription types, configuring schemas and retention, planning geo-replication, or debugging backlog/latency — treats Pulsar as a distributed log with cursor-based consumption, not an ephemeral queue.

Pulsar is a **distributed log with cursor-based consumption** — messages are retained independently of consumption and read positions (cursors) are first-class state managed by subscribers. Best practice is tenant/namespace design for isolation and quotas, intentional subscription types (exclusive/shared/failover/key_shared), schema-based messages with safe versioning, and explicit retention/TTL management separated from consumption.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with the project and the problem being addressed.
- For implementation, access to the relevant source code or development environment.

## Decisions to resolve

- [ ] 1. Core Stack & Constraints
- [ ] 2. Topic, Subscription & Schema Design
- [ ] 3. Reliability & Delivery Guarantees
- [ ] 4. Performance, Scaling & Operations
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
