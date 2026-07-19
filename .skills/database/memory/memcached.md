---
name: memcached
description: Best practices for using Memcached as a simple, non-persistent cache. Use when designing cache-aside strategies, choosing keys/TTLs, tuning slab/memory usage, or deciding between Memcached and Redis — covers eviction, consistent hashing, and cache-loss-tolerant design.
---

# Memcached Best Practices

Memcached is a **distributed, in-memory, non-persistent key-value cache** — values are opaque blobs, scaling is client-managed, and data loss is acceptable by design. Best practice is **boring, stable designs**: cache-aside for hot recomputable data, short deterministic keys, small values, explicit TTLs, and graceful handling of misses and evictions.

---

## 1. Core Stack & Constraints

- **Non-persistent** — data can vanish at any time; **never rely on Memcached for correctness**
- **No complex data structures** — values are opaque blobs
- Keys must be **short and deterministic**; values **small** (< 1MB, ideally much smaller)
- TTLs **explicit and intentional**; expect **evictions at any time**
- **No server-side computation**; scaling is **client-managed**
- **Do not store critical or sensitive data**

```bash
set user:42:profile 0 300 "<serialized payload>" 0
get user:42:profile
```

---

## 2. Architecture & Design

- Use Memcached only for **hot, recomputable data**
- Prefer the **cache-aside** pattern: read cache → on miss, load DB, populate cache
- **Design idempotent cache fills** and **handle cache misses gracefully**
- **Avoid key explosion** (caches of caches, per-request variants)
- Use **consistent hashing** so node changes cause minimal invalidation
- Treat **cache invalidation as best-effort**; assume **partial cache availability**
- **Document cache keys and TTL rationale**

```

function getUserProfile(id) {
  const key = `user:${id}:profile`;               // short, deterministic
  const hit = memcached.get(key);
  if (hit) return hit;                             // cache hit
  const profile = db.loadUserProfile(id);          // miss -> source of truth
  memcached.set(key, profile, 300);                // idempotent fill, explicit TTL
  return profile;
}
```

---

## 3. Security & Data Safety

- **Never expose Memcached to the public internet**; bind to **private networks only**
- **Assume data is plaintext** — do not store **secrets or PII**
- Rely on **network-level security** (firewalls, VPC); Memcached has no auth
- **Accept that cached data can disappear at any time** — by design

---

## 4. Reliability & Performance

- Monitor: **hit/miss ratio, eviction count, memory utilization**
- **Tune slab sizes** if needed; avoid oversized values wasting slabs
- **Batch gets** where supported
- **Plan for cold-cache events** (restart, deployment, node loss) — thundering herd: stagger/recompute
- **Prefer Memcached when:** ultra-low latency matters, data is simple, operational simplicity is required

---

## 5. General Rules of Thumb

- **Meme is a cache, not a store** — correctness never depends on it
- **Simple and boring wins** — short keys, small values, explicit TTL, cache-aside
- **Loss is the contract** — design cache fills idempotent and misses graceful
- **Redis when you need structures/persistence; Memcached when you need pure speed and simplicity**

---

## Quick-Start Checklist

- [ ] Only hot, recomputable data cached; correctness never depends on it
- [ ] Cache-aside pattern; idempotent fills; graceful miss handling
- [ ] Short, deterministic keys; small values; explicit TTLs
- [ ] Key explosion avoided; consistent hashing for node changes
- [ ] Invalidation best-effort; partial availability assumed
- [ ] Private network only; no secrets/PII; plaintext assumed
- [ ] Hit ratio, evictions, memory monitored; slabs tuned if needed
- [ ] Cold-cache events planned; keys + TTL rationale documented
