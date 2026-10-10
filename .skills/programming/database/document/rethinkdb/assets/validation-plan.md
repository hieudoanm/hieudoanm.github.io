# rethinkdb: Validation Plan

Use this plan to verify work guided by [rethinkdb](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] Add indexes via table.indexCreate('field'); drop unused indexes
- [ ] Compound and multi indexes for common query shapes
- [ ] **Avoid table scans** for predicates: always prefer a secondary index by adding index: ... to filter/between
- [ ] The optimizer (explain) reveals query plans — use it to verify index usage
- [ ] Changefeeds add overhead per query; batch frequent changes with includeInitial and squash intervals
- [ ] Using changefeeds on full-table scans — filter early and index the feed's base query
- [ ] Relying on table scans for predicates and seeing latency grow linearly
- [ ] Treating updates as full-document replace (.update vs .replace)
- [ ] Hard durability for every download/upload burst without batching

## Test record

| Check | Expected result | Evidence / command | Outcome |
|---|---|---|---|
| Primary success path | Meets the stated acceptance criteria |  |  |
| Boundary or failure case | Behaves safely and predictably |  |  |
| Regression / compatibility | Existing required behavior remains intact |  |  |

## Release decision

- Result: <!-- pass / pass with known limitations / fail -->
- Known limitations:
- Follow-up owner and date:
