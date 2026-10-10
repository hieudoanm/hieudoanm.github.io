# Redis Best Practices: 4. Reliability & Performance

## Scenario

A project is working on **4. reliability & performance** for Redis Best Practices. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- **Choose eviction policies deliberately** (`noeviction`, `allkeys-lru`, `volatile-lru`)
- Monitor **memory usage and hit ratios**
- **Avoid hot keys** (single-key contention); distribute where needed
- **Use pipelining for batch operations** (or Lua) to cut round-trips
- Understand **O(N) vs O(1) command costs** (`SORT`, `SMEMBERS`, big `LRANGE`)
- **Plan for restart, failover (Sentinel/Cluster), and cold-cache storms**
- Be explicit about trade-offs when durability is required

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Reliability & Performance** section of [SKILL.md](../SKILL.md).
