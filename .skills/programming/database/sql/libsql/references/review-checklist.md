# Review checklist

Focused reference for **libsql**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## Quick-Start Checklist

- [ ] SQLite-compatible SQL; no non-portable features without explicit note
- [ ] Stable PKs (UUIDs); schemas tolerate replication lag
- [ ] Conflict-minimizing, merge-friendly data model
- [ ] Local reads optimized; writes batched; no tight remote write loops
- [ ] Writes idempotent where possible; write path (primary vs replica) explicit
- [ ] Transactions per logical write unit; no out-of-band file manipulation
- [ ] Offline-first and partition scenarios tested; `updated_at`/sync metadata present
- [ ] Latency measured for read vs write; consistency expectations documented
