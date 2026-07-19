# OpenSearch Best Practices: Decision Record

Use this record when applying [OpenSearch Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for designing indexes, queries, and operations with OpenSearch (search and analytics). Use when writing mappings, building queries/aggregations, configuring Index State Management, tuning shards, or planning upgrades — covers the security plugin, ISM, snapshots, and cluster stability.

OpenSearch is a **search and analytics platform**, not a system of record. Best practice is operationally aware design: mappings before indexing, text vs keyword separated deliberately, controlled dynamic mappings, the security plugin enabled with least-privilege roles, ISM for lifecycle, and search_after over deep pagination.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Decisions to resolve

- [ ] 1. Core Stack & Constraints
- [ ] 2. Indexing & Data Modeling
- [ ] 3. Security & Governance
- [ ] 4. Performance & Reliability
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
