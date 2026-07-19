# MariaDB Best Practices: Decision Record

Use this record when applying [MariaDB Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for operating MariaDB in production. Use when designing schemas, choosing storage engines, migrating from MySQL, tuning replication/Galera, or planning backups — treats MariaDB as independent infrastructure, not a MySQL clone.

MariaDB is a MySQL-compatible RDBMS that has diverged over time with its own storage engines (InnoDB, XtraDB, Aria, ColumnStore) and replication (standard primary–replica, Galera). Best practice is treating it as **independent infrastructure**: choose engines deliberately, treat MySQL compatibility as a decision rather than a guarantee, and validate schemas and topology under production-scale conditions.

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
