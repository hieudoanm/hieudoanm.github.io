# Mongoose Best Practices: Decision Record

Use this record when applying [Mongoose Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for using Mongoose — the MongoDB ODM conventions for Node.js. Use when writing, structuring, or reviewing Mongoose — covers schemas, models, queries, validation, indexing, transactions, and testing.

Mongoose is the MongoDB object-document mapper for Node.js — it puts a **schema and validation layer over flexible documents**. Practical Mongoose leans on **explicit schemas that are stricter than need be, lean documents (referenced, not nested blobs), and queries that hit the indexes you define**. MongoDB rewards documents shaped for the access pattern — so design the schema from the query, then let the ODM enforce it.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Decisions to resolve

- [ ] 1. Schemas & Models
- [ ] 2. Queries
- [ ] 3. Validation & Middleware
- [ ] 4. Indexes
- [ ] 5. Relationships & Aggregations
- [ ] 6. Transactions & Atomicity
- [ ] 7. Performance & Memory
- [ ] 8. Testing

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
