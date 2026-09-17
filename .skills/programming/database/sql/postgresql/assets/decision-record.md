# PostgreSQL Best Practices: Decision Record

Use this record when applying [PostgreSQL Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for designing, querying, and operating PostgreSQL. Use when writing schemas or SQL, optimizing slow queries, choosing indexes, or planning migrations — covers MVCC, transactions, indexing, EXPLAIN, and safe schema changes.

PostgreSQL is a production-grade relational database built on MVCC, a planner/executor, and rich data types. Best practice is treating it as a **mission-critical system**: database-enforced integrity over app-only checks, deliberate indexes, safe (additive) schema changes, and queries tuned against real row counts and workload.

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
- [ ] 5. Security
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
