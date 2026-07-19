# Review checklist

Focused reference for **redis**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
