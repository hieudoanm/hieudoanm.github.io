# Review checklist

Focused reference for **mongodb**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Schema first, queries second** — design is the product, not an afterthought
- **Embed or reference by access pattern**, not purity
- **Indexes are mandatory** — production reads must not scan
- **Scale is designed in** — shard keys and document size decided upfront

---

## Quick-Start Checklist

- [ ] Schema designed from query patterns before code
- [ ] Embed vs reference chosen by cardinality/access; documents bounded
- [ ] No unbounded document growth; `$lookup`/nested arrays used deliberately
- [ ] Indexes on all hot query fields; no production collection scans
- [ ] Pagination safe (bounded skip/search-after); no N+1
- [ ] Shard key planned before scaling; no monotonic hotspots
- [ ] Auth/RBAC enabled; db not internet-exposed; input validated app-side
- [ ] Aggregation tested with production-like volumes; write/read concerns explicit
