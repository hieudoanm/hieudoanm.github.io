# Review checklist

Focused reference for **elasticsearch**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Search engine, not store** — treat ES as disposable and rebuildable
- **Mapping is the schema** — design it before data flows in; keep field names bounded
- **text vs keyword decides correctness** of filters and full-text — choose per field
- **Reference: search_after, not deep offsets** — memory and stability follow

---

## Quick-Start Checklist

- [ ] Mappings designed before indexing; index templates in place
- [ ] text vs keyword chosen per field; analyzers language-appropriate
- [ ] No dynamic mapping explosions; no excessive nesting
- [ ] Denormalized model; no join-heavy parent-child patterns
- [ ] Implicit aliases + planned re-indexing; refresh intervals explicit
- [ ] Pagination via `search_after`; no deep `from+size`
- [ ] Aggregation cardinality bounded; shard count tuned (no over-sharding)
- [ ] Heap/circuit breakers monitored; rebuildable-from-source assumption held
