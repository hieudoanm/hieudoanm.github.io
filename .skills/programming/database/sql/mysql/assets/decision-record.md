# MySQL Best Practices: Decision Record

Use this record when applying [MySQL Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for designing, querying, and operating MySQL in production. Use when writing schemas, optimizing slow queries, reviewing indexes, planning migrations, or debugging locks/deadlocks — covers InnoDB, transactions, indexing, replication, and observability.

MySQL is a client/server RDBMS whose behavior depends heavily on storage engine, isolation level, and locking. Best practice is respecting it as **critical infrastructure**: InnoDB by default, always-on primary keys, explicit transactions, deliberate indexes, versioned migrations, and observability over cargo-cult tuning.

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
- [ ] 3. Integrity, Security & Safety
- [ ] 4. Reliability, Performance & Operations
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
