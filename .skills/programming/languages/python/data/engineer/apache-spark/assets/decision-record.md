# Apache Spark Best Practices: Decision Record

Use this record when applying [Apache Spark Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for distributed data processing with Apache Spark — the DataFrame/Dataset and structured-streaming conventions. Use when writing, structuring, or reviewing Spark (PySpark or Scala) — covers dataframes, transformations, partitioning, joins, shuffle control, and streaming.

Spark is a **distributed compute engine — DataFrames/RDD executed as lazy transformations against a cluster** (transfer: wide vs narrow dependencies). Practical Spark leans on **DataFrame/Dataset APIs (optimization, not RDD), narrow transformations, partitioning/skew management, broadcast joins for small tables, and shuffle minimization** — "lazy, partitioned, minimal-shuffle" describes the discipline; the Spark UI is your profiler.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. DataFrame Discipline
- [ ] 2. Transformations & Lineage
- [ ] 3. Partitioning & Skew
- [ ] 4. Joins & Shuffle Control
- [ ] 5. Caching & Persistence
- [ ] 6. Structured Streaming
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
