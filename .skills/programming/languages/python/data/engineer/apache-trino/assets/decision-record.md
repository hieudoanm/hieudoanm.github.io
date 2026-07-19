# Apache Trino Best Practices: Decision Record

Use this record when applying [Apache Trino Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for distributed SQL querying with Trino — the federated-query-engine conventions. Use when writing, structuring, or reviewing Trino SQL/queries — covers catalogs/schemas, query patterns, joins, bucketing, resource groups, and connectors.

Trino is a **distributed SQL query engine for federated analytics across many connectors (Hive, Iceberg, Postgres, Kafka…)** — stateless, ANSI-ish, streaming results. Practical Trino leans on **catalog-qualified queries (catalog.schema.table), pushing work down (filters/joins at the source), correct join style (hash vs broadcast) aware of connector behavior, and bucketing on join keys for performance** — "push down, stream, and minimize shuffle" is the engine's discipline; the EXPLAIN is your map.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Catalog & Schema Model
- [ ] 2. Query Patterns
- [ ] 3. Joins & Performance Levers
- [ ] 4. Bucketing & Table Design
- [ ] 5. Resource Management
- [ ] 6. Governance & Reproducibility
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
