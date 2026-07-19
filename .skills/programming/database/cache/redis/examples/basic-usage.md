# Redis Best Practices: Basic Usage

Best practices for using Redis as a data structure server. Use when designing caching strategies, modeling keys/data structures, building rate limits, queues, or pub/sub, or debugging memory/performance — covers structures, TTLs, eviction, persistence, and operational safety.

## Scenario

Use this example as a starting point when applying **redis** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack & Constraints** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```bash
SET user:42:profile '{"name":"alice"}' EX 300
RPUSH queue:jobs "job-1"
ZADD leaderboard 100 "alice"
XADD events:orders * user 42 total 99.00
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
