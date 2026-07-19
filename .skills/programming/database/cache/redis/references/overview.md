# Overview

Focused reference for **redis**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Redis Best Practices

Redis is a **data structure server** — Strings, Hashes, Lists, Sets, ZSets, Streams — not a magical cache. Best practice is deliberate usage: namespaced keys with clear ownership, explicit TTLs, bounded structures, correct structure per access pattern, and treating Redis as **ephemeral unless persistence is explicitly required**.

---

## 1. Core Stack & Constraints

- Redis **7+**
- Keys must be **namespaced** (`user:{id}:profile`) with **clear ownership**
- **Use TTLs intentionally**, never by accident
- **Avoid unbounded data structures** and large values (> a few MB)
- **Never use `KEYS` in production** — use `SCAN`
- **Avoid blocking commands in hot paths**
- Treat Redis as **ephemeral unless persistence is explicitly required**
- **Never use Redis as the primary system of record unless justified**

```bash
SET user:42:profile '{"name":"alice"}' EX 300
RPUSH queue:jobs "job-1"
ZADD leaderboard 100 "alice"
XADD events:orders * user 42 total 99.00
```
