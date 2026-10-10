# Overview

Focused reference for **memcached**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
