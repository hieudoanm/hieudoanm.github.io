# string with TTL — cache entry, expires on its own: Starter Template

A reusable starting point derived from the **2. Data Structure Usage** section of [string with TTL — cache entry, expires on its own](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
