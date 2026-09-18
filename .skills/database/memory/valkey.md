---
name: valkey
description: Valkey — open-source in-memory key-value data store, a community fork of Redis for caching, queues, and real-time workloads.
---

Valkey is an **in-memory, NoSQL key-value data store** — a high-performance in-memory database and **community fork of Redis** (launched 2024) supporting caching, queues/messaging, real-time data, and ephemeral or persistent data with `AOF`/`RDB` durability.

## 1. Core Concepts

- Keys are byte strings; values are data structures: strings, hashes, lists, sets, sorted sets, streams, Geohash, and more.
- Commands are atomic; many accept N keys (e.g., `MSET`, `EVAL`/Lua, transactions, pipelines).
- **Expiration**: per-key TTL; event-driven *expired-keys* not lazy.
- **Modules** extend capabilities (e.g., RediSearch-compatible search, JSON types).
- Persistence: `RDB` snapshot, `AOF` append-only, or both.

## 2. Data Structure Usage

- **Strings**: caching, counters (`INCR`), bit operations (`SETBIT`/`GETBIT`/`BITCOUNT`), raw-paced.
- **Hashes**: objects/records; pre-size and use `HINCRBY`.
- **Lists**: queues; use `LPUSH`/`RPOP` or `BLPOP` for blocking consumers.
- **Sets**: deduplication, membership tests (`SISMEMBER`), union/intersect.
- **Sorted sets**: leaderboards, rate limiting (`ZINCRBY`, `ZRANGEBYSCORE`), time-series ingestion.
- **Streams**: append-only log + consumer groups for durable messaging.

## 3. Key Design

- Name keys with a **namespace + ID** convention, e.g., `user:123`, `order:456`.
- Use **hash** for a single entity's fields rather than separate string keys per field.
- Set **TTL** for cache-like data; use `EXPIRE` / `PX` and `SETEX`.
- Avoid hot keys (single key storming) — shard or use randomness in suffixes.
- Instrument with **`Scan`** (cursor-based) for full-db iteration in production (not `KEYS`).

## 4. Performance and Operations

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