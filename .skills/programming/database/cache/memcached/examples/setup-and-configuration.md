# Memcached Best Practices: 2. Architecture & Design

## Scenario

A project is working on **2. architecture & design** for Memcached Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- Use Memcached only for **hot, recomputable data**
- Prefer the **cache-aside** pattern: read cache → on miss, load DB, populate cache
- **Design idempotent cache fills** and **handle cache misses gracefully**
- **Avoid key explosion** (caches of caches, per-request variants)
- Use **consistent hashing** so node changes cause minimal invalidation
- Treat **cache invalidation as best-effort**; assume **partial cache availability**
- **Document cache keys and TTL rationale**

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **2. Architecture & Design** section of [SKILL.md](../SKILL.md).
