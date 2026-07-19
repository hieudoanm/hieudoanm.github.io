# Redis Best Practices: Decision Record

Use this record when applying [Redis Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for using Redis as a data structure server. Use when designing caching strategies, modeling keys/data structures, building rate limits, queues, or pub/sub, or debugging memory/performance — covers structures, TTLs, eviction, persistence, and operational safety.

Redis is a **data structure server** — Strings, Hashes, Lists, Sets, ZSets, Streams — not a magical cache. Best practice is deliberate usage: namespaced keys with clear ownership, explicit TTLs, bounded structures, correct structure per access pattern, and treating Redis as **ephemeral unless persistence is explicitly required**.

## Goal and constraints

- Goal:
- Non-goals:
- Constraints (platform, version, policy, budget, or timeline):
- Prerequisites to confirm:
- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Decisions to resolve

- [ ] 1. Core Stack & Constraints
- [ ] 2. Architecture & Design
- [ ] 3. Security & Data Safety
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
