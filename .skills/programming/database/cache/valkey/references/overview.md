# Overview

Focused reference for **valkey**, excerpted from SKILL.md. The skill file remains the canonical guide.

Valkey is an **in-memory, NoSQL key-value data store** — a high-performance in-memory database and **community fork of Redis** (launched 2024) supporting caching, queues/messaging, real-time data, and ephemeral or persistent data with `AOF`/`RDB` durability.

## 1. Core Concepts

- Keys are byte strings; values are data structures: strings, hashes, lists, sets, sorted sets, streams, Geohash, and more.
- Commands are atomic; many accept N keys (e.g., `MSET`, `EVAL`/Lua, transactions, pipelines).
- **Expiration**: per-key TTL; event-driven _expired-keys_ not lazy.
- **Modules** extend capabilities (e.g., RediSearch-compatible search, JSON types).
- Persistence: `RDB` snapshot, `AOF` append-only, or both.

## 2. Data Structure Usage

- **Strings**: caching, counters (`INCR`), bit operations (`SETBIT`/`GETBIT`/`BITCOUNT`), raw-paced.
- **Hashes**: objects/records; pre-size and use `HINCRBY`.
- **Lists**: queues; use `LPUSH`/`RPOP` or `BLPOP` for blocking consumers.
- **Sets**: deduplication, membership tests (`SISMEMBER`), union/intersect.
- **Sorted sets**: leaderboards, rate limiting (`ZINCRBY`, `ZRANGEBYSCORE`), time-series ingestion.
- **Streams**: append-only log + consumer groups for durable messaging.

```bash
# string with TTL — cache entry, expires on its own
SET user:123:profile '{"name":"alice"}' PX 300000

# hash for one entity — no key sprawl per field
HSET order:456:meta status paid total 99.00 currency USD
HINCRBY order:456:meta attempts 1

# sorted set for a leaderboard
ZADD leaderboard:weekly 1320 "user:123"
ZRANGE leaderboard:weekly 0 9 REV WITHSCORES

# stream + consumer group — durable messaging
XADD events:orders '*' user 123 total 99.00
XGROUP CREATE events:orders billing '$' MKSTREAM
```

## 3. Key Design

- Name keys with a **namespace + ID** convention, e.g., `user:123`, `order:456`.
- Use **hash** for a single entity's fields rather than separate string keys per field.
- Set **TTL** for cache-like data; use `EXPIRE` / `PX` and `SETEX`.
- Avoid hot keys (single key storming) — shard or use randomness in suffixes.
- Instrument with **`Scan`** (cursor-based) for full-db iteration in production (not `KEYS`).

```bash
# one round-trip per batch, not per key: pipeline the writes
valkey-cli --pipe <<'BATCH'
SET user:123:profile '{"name":"alice"}' EX 300
HSET user:123:prefs locale en-GB
EXPIRE user:123:prefs 300
SADD cache:search:visited "postgres"
BATCH

# never KEYS in production — SCAN is incremental and non-blocking
valkey-cli --scan --pattern 'order:*' --count 500
```

## 4. Performance and Operations
