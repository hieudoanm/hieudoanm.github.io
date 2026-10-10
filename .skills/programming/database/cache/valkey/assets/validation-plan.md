# string with TTL — cache entry, expires on its own: Validation Plan

Use this plan to verify work guided by [string with TTL — cache entry, expires on its own](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] Single-threaded command loop: **avoid blocking O(N) commands** (KEYS, SMEMBERS on huge sets, HGETALL on huge hashes)
- [ ] Use **pipelines** and **MULTI/EXEC** to batch round-trips; Redis protocol is TCP + RESP2/RESP3
- [ ] Replication: primary-replica for read scale and failover; use **ACL** for user-level permissions
- [ ] **Sentinel** for HA/failover of primary; **Cluster** for automatic sharding across nodes
- [ ] Use **client-side caching** (RESP3) or RedisCache to reduce per-request round trips
- [ ] Using KEYS * in production—O(N) blocks the server
- [ ] Flushing or FLUSHALL without verification—irreversible data loss
- [ ] Assuming durability without AOF enabled
- [ ] Building RPC-style message systems on RPOP loops instead of BLPOP/streams

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
