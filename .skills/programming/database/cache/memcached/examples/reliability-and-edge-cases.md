# Memcached Best Practices: 4. Reliability & Performance

## Scenario

A project is working on **4. reliability & performance** for Memcached Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- Monitor: **hit/miss ratio, eviction count, memory utilization**
- **Tune slab sizes** if needed; avoid oversized values wasting slabs
- **Batch gets** where supported
- **Plan for cold-cache events** (restart, deployment, node loss) — thundering herd: stagger/recompute
- **Prefer Memcached when:** ultra-low latency matters, data is simple, operational simplicity is required

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Reliability & Performance** section of [SKILL.md](../SKILL.md).
