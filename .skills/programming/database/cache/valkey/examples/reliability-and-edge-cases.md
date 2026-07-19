# string with TTL — cache entry, expires on its own: 4. Performance and Operations

## Scenario

A project is working on **4. performance and operations** for string with TTL — cache entry, expires on its own. The team needs to apply this guidance without losing the constraints that make the skill relevant.

## Worked example

Use the following source guidance as a short decision checklist:

- Single-threaded command loop: **avoid blocking O(N) commands** (`KEYS`, `SMEMBERS` on huge sets, `HGETALL` on huge hashes).
- Use **pipelines** and **MULTI/EXEC** to batch round-trips; `Redis` protocol is TCP + RESP2/RESP3.
- Replication: primary-replica for read scale and failover; use **ACL** for user-level permissions.
- **Sentinel** for HA/failover of primary; **Cluster** for automatic sharding across nodes.
- Use **client-side caching** (RESP3) or `RedisCache` to reduce per-request round trips.

1. Apply the guidance to the concrete project and record any assumptions.
2. Check the result against the section's intended outcome and the surrounding skill guidance.
3. Validate relevant edge cases with project-specific tests or review.

## Source

Based on the **4. Performance and Operations** section of [SKILL.md](../SKILL.md).
