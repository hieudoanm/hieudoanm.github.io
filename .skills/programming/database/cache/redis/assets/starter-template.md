# Redis Best Practices: Starter Template

A reusable starting point derived from the **1. Core Stack & Constraints** section of [Redis Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```bash
SET user:42:profile '{"name":"alice"}' EX 300
RPUSH queue:jobs "job-1"
ZADD leaderboard 100 "alice"
XADD events:orders * user 42 total 99.00
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
