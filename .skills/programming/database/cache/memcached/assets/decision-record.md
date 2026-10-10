# Memcached Best Practices: Decision Record

Use this record when applying [Memcached Best Practices](../SKILL.md) to a concrete project decision.

## Context

Best practices for using Memcached as a simple, non-persistent cache. Use when designing cache-aside strategies, choosing keys/TTLs, tuning slab/memory usage, or deciding between Memcached and Redis — covers eviction, consistent hashing, and cache-loss-tolerant design.

Memcached is a **distributed, in-memory, non-persistent key-value cache** — values are opaque blobs, scaling is client-managed, and data loss is acceptable by design. Best practice is **boring, stable designs**: cache-aside for hot recomputable data, short deterministic keys, small values, explicit TTLs, and graceful handling of misses and evictions.

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
