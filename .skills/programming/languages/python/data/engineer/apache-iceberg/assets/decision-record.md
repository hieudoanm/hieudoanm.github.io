# Apache Iceberg Best Practices: Decision Record

Use this record when applying [Apache Iceberg Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for open table formats with Apache Iceberg — the table-format conventions for data lakehouse infrastructure. Use when writing, structuring, or reviewing Iceberg tables — covers table creation, partitioning, snapshots, time travel, compaction, and maintenance.

Iceberg is an **open table format for data lakes — ACID semantics, schema/propagation, snapshots of table state, and time travel on object storage.** Practical Iceberg leans on **partitioning designed around your access patterns (not imitation of old partitions), PartitionSpec set at creation (evolve-aware), snapshots as the version primitive (AS OF queries/expire), and routine maintenance (optimize/expire_snapshots/remove_orphan_files)** — governance and query speed are joined at the hip.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with Python and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Table Creation & Specs
- [ ] 2. Writes & Snapshots
- [ ] 3. Partitioning & Data Layout
- [ ] 4. Maintenance Tasks
- [ ] 5. Time Travel & Governance
- [ ] 6. Engines & Ops
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
