# SQLite Best Practices: Decision Record

Use this record when applying [SQLite Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for using SQLite as an embedded application database. Use when designing schemas, choosing journal modes, writing queries, planning migrations, or debugging locking/concurrency — treats SQLite as a serious embedded database, not a server DB or toy.

SQLite is a file-based, embedded SQL database — single-writer by design, with journaling (rollback/WAL) governing durability and concurrency. Best practice is treating it as a **serious embedded database**: explicit schemas, foreign keys on, WAL for concurrent reads, transactional batching, and no massaging into a multi-writer server role.

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
