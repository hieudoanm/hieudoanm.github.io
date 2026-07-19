# libSQL Best Practices: Decision Record

Use this record when applying [libSQL Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for using libSQL — the SQLite-compatible, embeddable database with replication. Use when designing local-first/edge-first data models, planning SQLite→libSQL migrations, or building replicated read/write tunnels — covers topology awareness, replication lag, and offline behavior.

libSQL is **SQLite-first with replication**, not "Postgres-lite": a local embedded core plus remote URLs, primary/replica topology, and sync. Best practice is a **local-first, distributed-systems-aware** mental model — schemas must tolerate replication lag and eventual consistency, local reads are primary, and remote operations are treated as high-latency, potentially stale, and partition-prone.

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
- [ ] 3. Integrity & Safety
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
