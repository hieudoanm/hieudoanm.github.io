# Implementation notes

Focused reference for **memcached**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
