# MongoDB Best Practices: Decision Record

Use this record when applying [MongoDB Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for schema design and operations with MongoDB. Use when modeling documents, choosing embed vs reference, designing indexes, building aggregation pipelines, or preparing for scale — treats MongoDB as a schema-designed document database, not schemaless storage.

MongoDB is a document database whose performance hinges on **schema design**, not SQL-style normalization. Best practice is designing documents around **query patterns**: embed for one-to-few, reference for fan-outs, index deliberately, never scan collections, and plan shard keys before scaling.

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
- [ ] 3. Security & Data Integrity
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
