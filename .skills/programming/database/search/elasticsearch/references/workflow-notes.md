# Workflow notes

Focused reference for **elasticsearch**, excerpted from SKILL.md. The skill file remains the canonical guide.

---

## 2. Indexing & Data Modeling

- **Design mappings before indexing data**
- **Separate `text` vs `keyword` intentionally** — `text` analyzed for full-text; `keyword` exact for filters/aggregations/scripts
- Use **analyzers appropriate to language and use case**
- **Avoid mapping explosions** (unbounded field names from dynamic keys)
- **Prefer denormalization over joins** (parent/child is expensive)
- **Control index and shard count deliberately** (target big shards, not many small ones)
- Use **index aliases for versioning**; plan **re-indexing as a normal operation**

---

## 3. Safety & Data Integrity

- **Assume data can be rebuilt from primary storage**
- Avoid destructive operations without warnings: **index deletion, reindex with overwrite**
- Be explicit about **update vs upsert** behavior
- **Avoid scripts unless necessary**; treat **cluster-level operations as high risk**
