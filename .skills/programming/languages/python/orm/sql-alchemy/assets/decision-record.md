# SQLAlchemy Best Practices: Decision Record

Use this record when applying [SQLAlchemy Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for using SQLAlchemy — the ORM conventions for Python relational database access. Use when writing, structuring, or reviewing SQLAlchemy — covers engine/session lifecycle, ORM model design, queries, migrations, performance, and testing.

SQLAlchemy is Python's relational toolkit: a **Core** (SQL expression language) and an **ORM** on top. Practical SQLAlchemy leans on **short-lived sessions with a transaction boundary (Session/sessionmaker + context manager), typed models with explicit relationships, and explicit queries (select()) over magic strings**. It wraps SQL rather than hiding it — a query you can't explain in SQL is a query you shouldn't ship with magic.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Engine & Session Lifecycle
- [ ] 2. Model Design
- [ ] 3. Querying
- [ ] 4. Migrations & Schema Evolution
- [ ] 5. Performance
- [ ] 6. Testing
- [ ] General Rules of Thumb
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
