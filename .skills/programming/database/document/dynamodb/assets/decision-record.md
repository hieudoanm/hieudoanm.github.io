# DynamoDB Best Practices: Decision Record

Use this record when applying [DynamoDB Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for modeling and operating DynamoDB. Use when designing access patterns, keys and single-table schemas, building GSIs, handling hot partitions, or tuning capacity — treats DynamoDB as a query-driven NoSQL store, not a schemaless SQL replacement.

DynamoDB scales automatically but only for the **access patterns you design for**. Best practice is access-pattern-first modeling: partition key + sort key encode relationships, GSIs are sparse and deliberate (each costs money), Scan is avoided, and every item has a clear query purpose.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Decisions to resolve

- [ ] 1. Core Stack & Constraints
- [ ] 2. Data Modeling & Access Patterns
- [ ] 3. Security, Consistency & Data Safety
- [ ] 4. Reliability, Scaling & Performance
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
