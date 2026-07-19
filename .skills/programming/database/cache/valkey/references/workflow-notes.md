# Workflow notes

Focused reference for **valkey**, excerpted from SKILL.md. The skill file remains the canonical guide.

- Single-threaded command loop: **avoid blocking O(N) commands** (`KEYS`, `SMEMBERS` on huge sets, `HGETALL` on huge hashes).
- Use **pipelines** and **MULTI/EXEC** to batch round-trips; `Redis` protocol is TCP + RESP2/RESP3.
- Replication: primary-replica for read scale and failover; use **ACL** for user-level permissions.
- **Sentinel** for HA/failover of primary; **Cluster** for automatic sharding across nodes.
- Use **client-side caching** (RESP3) or `RedisCache` to reduce per-request round trips.

## 5. Persistence Considerations

- **RDB** (default): periodic snapshots; trade-durability for write throughput.
- **AOF**: append `fsync` every write (`always`→slowest) with `everysec` as the common compromise.
- **Hybrid RDB/AOF** persistence for faster restart recovery (ongoing improvements across versions).
- Understand data can be lost if persistence config (AOF off + no sync) is used incorrectly.

## 6. Common Pitfalls

- Using `KEYS *` in production—O(N) blocks the server.
- Flushing or `FLUSHALL` without verification—irreversible data loss.
- Assuming durability without AOF enabled.
- Building RPC-style message systems on `RPOP` loops instead of `BLPOP`/streams.

## General Rules of Thumb

- Pick the right structure per access pattern: cache (string), object (hash), queue (list), messages (streams).
- Batch round-trips with pipelines; never loop `GET` per item.
- Design keys with TTL for ephemeral data; namespace with `type:id` conventions.
- Run single-threaded workloads everywhere; move CPU-heavy work off the store.

## Quick-Start Checklist

- [ ] Choose persistence (RDB, AOF, or hybrid) based on durability needs.
- [ ] Design keys with namespaces and TTLs.
- [ ] Use correct structure type (hash vs string vs list vs set vs sorted set vs stream).
- [ ] Enable AOF (everysec) for durability-critical data.
- [ ] Use pipelines/MULTI for batching; avoid blocking commands.
- [ ] Add replication/Cluster or Sentinel for HA and scaling.
- [ ] Set ACLs/users; avoid running as default superuser.
- [ ] Monitor `INFO` memory, eviction, latency, and hit rate.
