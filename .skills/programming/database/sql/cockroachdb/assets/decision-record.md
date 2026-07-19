# CockroachDB Best Practices: Decision Record

Use this record when applying [CockroachDB Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for operating CockroachDB as a distributed, globally consistent SQL database. Use when designing schemas, writing distributed queries, planning multi-region deployments, or migrating from Postgres — covers serializable isolation, distributed transactions, retries, and region-aware design.

CockroachDB is a **distributed SQL database with Raft-based replication and serializable isolation** — not "Postgres with replicas". Best practice is distributed-systems-first thinking: distributed transactions by default with retries as normal behavior, latency-aware keys and queries, retry-safe application logic, and no single-node database assumptions.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Decisions to resolve

- [ ] 1. Core Stack & Constraints
- [ ] 2. Data Modeling & Architecture
- [ ] 3. Integrity & Consistency
- [ ] 4. Reliability & Performance
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
