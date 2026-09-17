# Implementation notes

Focused reference for **redis**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
