# 3. Secondary Indexes and Performance

Focused reference for **rethinkdb**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Secondary Indexes and Performance

- Add indexes via `table.indexCreate('field')`; drop unused indexes.
- Compound and multi indexes for common query shapes.
- **Avoid table scans** for predicates: always prefer a secondary index by adding `index: ...` to `filter`/`between`.
- The optimizer (`explain`) reveals query plans — use it to verify index usage.
- Changefeeds add overhead per query; batch frequent changes with `includeInitial` and `squash` intervals.
