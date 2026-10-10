# string with TTL — cache entry, expires on its own: Basic Usage

Valkey — open-source in-memory key-value data store, a community fork of Redis for caching, queues, and real-time workloads.

## Scenario

Use this example as a starting point when applying **valkey** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Data Structure Usage** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
