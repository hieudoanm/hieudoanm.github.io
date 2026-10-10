# Review checklist

Focused reference for **opensearch**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **Platform, not store** — treat indexes as rebuildable from primary sources
- **Security is on by default, not an afterthought** — roles least-privilege, perms separate
- **Bounded and deliberate** — mappings, shards, aggregations, and pagination all controlled
- **Operations are part of design** — ISM, snapshots, and rollover are normal ops

---

## Quick-Start Checklist

- [ ] Mappings before indexing; index templates explicit; aliases for versioning
- [ ] text vs keyword chosen per field; dynamic mappings controlled
- [ ] Denormalized model; no join-heavy patterns
- [ ] Security plugin enabled; least-privilege roles; read/write/admin separated
- [ ] Destructive ops audited; snapshot repositories protected
- [ ] `search_after` for deep pagination; no deep `from+size`
- [ ] Shards sized deliberately; aggregations bounded; heap/GC/circuit breakers monitored
- [ ] ISM lifecycle defined; re-indexing/upgrades planned; realistic load testing
