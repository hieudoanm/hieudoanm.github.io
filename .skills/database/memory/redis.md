---
name: redis
description: Best practices for using Redis as a data structure server. Use when designing caching strategies, modeling keys/data structures, building rate limits, queues, or pub/sub, or debugging memory/performance — covers structures, TTLs, eviction, persistence, and operational safety.
---

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

---

## 2. Architecture & Design

- **One responsibility per keyspace**; model data around **access patterns**
- **Prefer Hashes over many small keys** (`HMSET user:42 {name,email,level}`)
- Use **Sets/ZSets for membership and ranking**; **Streams for event-like workloads**
- Use **Lua scripts** for atomic multi-step logic
- **Design idempotent writes** where possible
- Document **eviction behavior and failure modes**
- **Separate cache, queue, and coordination concerns** into distinct keyspaces/instances

---

## 3. Security & Data Safety

- **Never expose Redis to the public internet**
- Use **authentication** (`requirepass` / **ACLs**); **limit commands via ACLs** where possible
- **Do not store sensitive data unless encrypted**
- Be **explicit about persistence guarantees**; assume data can be lost unless configured (RDB snapshots, AOF)

---

## 4. Reliability & Performance

- **Choose eviction policies deliberately** (`noeviction`, `allkeys-lru`, `volatile-lru`)
- Monitor **memory usage and hit ratios**
- **Avoid hot keys** (single-key contention); distribute where needed
- **Use pipelining for batch operations** (or Lua) to cut round-trips
- Understand **O(N) vs O(1) command costs** (`SORT`, `SMEMBERS`, big `LRANGE`)
- **Plan for restart, failover (Sentinel/Cluster), and cold-cache storms**
- Be explicit about trade-offs when durability is required

```bash
# pipelining: batch instead of one round-trip per op
redis-cli --pipe < batch.txt
```

---

## 5. General Rules of Thumb

- **Use the right structure for the pattern** — Hash over many keys, ZSet for ranks, Stream for events
- **Ephemeral by default** — treat every read as a miss and design cache fills to be safe
- **Bounded, namespaced, TTL'd** — the three invariants of healthy keys
- **Watch O(N) and hot keys** — scale is won in key design, not instance count

---

## Quick-Start Checklist

- [ ] Namespaced keys with clear ownership; TTLs explicit
- [ ] Correct data structure per access pattern; Hashes over key sprawl
- [ ] Bounded structures; no large values; no `KEYS` — only `SCAN`
- [ ] Eviction policy chosen deliberately; memory + hit ratio monitored
- [ ] Pipelining/Lua for batches; known O(N) vs O(1) costs
- [ ] Hot keys avoided; failover/cold-start plans in place
- [ ] Not exposed publicly; auth + ACLs; sensitive data not plaintext
- [ ] Persistence guarantees explicit; cache/queue/coordination separated
