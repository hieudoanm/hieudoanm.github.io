# string with TTL — cache entry, expires on its own: 2. Data Structure Usage

## Source guidance

This example applies the **2. Data Structure Usage** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Strings**: caching, counters (`INCR`), bit operations (`SETBIT`/`GETBIT`/`BITCOUNT`), raw-paced.
- **Hashes**: objects/records; pre-size and use `HINCRBY`.
- **Lists**: queues; use `LPUSH`/`RPOP` or `BLPOP` for blocking consumers.
- **Sets**: deduplication, membership tests (`SISMEMBER`), union/intersect.
- **Sorted sets**: leaderboards, rate limiting (`ZINCRBY`, `ZRANGEBYSCORE`), time-series ingestion.
- **Streams**: append-only log + consumer groups for durable messaging.

## Example

This excerpt is from the cited **2. Data Structure Usage** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for valkey.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
