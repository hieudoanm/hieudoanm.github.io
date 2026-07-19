# Review checklist

Focused reference for **memcached**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
