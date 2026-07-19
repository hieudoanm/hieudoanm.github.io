# Elasticsearch Best Practices: Decision Record

Use this record when applying [Elasticsearch Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for designing indexes, queries, and clusters with Elasticsearch (search and analytics). Use when writing mappings, building search queries/aggregations, tuning shards, planning migrations/re-indexing, or debugging slow searches — treats ES as a search engine, not a system of record.

Elasticsearch is a **search and analytics engine**, not a transactional database or source of truth — data is rebuilt from primary storage. Best practice is designing mappings before indexing, separating text from keyword deliberately, avoiding mapping explosions and wildcards on high-cardinality fields, controlling shards, and using search_after over deep from+size pagination.

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
- [ ] 3. Safety & Data Integrity
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
