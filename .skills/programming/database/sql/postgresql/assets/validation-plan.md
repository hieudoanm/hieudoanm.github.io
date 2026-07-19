# PostgreSQL Best Practices: Validation Plan

Use this plan to verify work guided by [PostgreSQL Best Practices](../SKILL.md). Replace generic entries with observable project-specific checks; do not treat an unchecked box as evidence.

## Preconditions

- Familiarity with the application’s data model and access patterns.
- For implementation, access to the database environment or representative schema.

## Skill-specific review

- [ ] **Index based on real queries** — not guesses
- [ ] **Avoid over-indexing write-heavy tables** (every index costs writes)
- [ ] Use EXPLAIN (ANALYZE, BUFFERS) when optimizing; read Seq Scan vs Index Scan
- [ ] Be explicit about **pagination**; avoid unbounded result sets (keyset over OFFSET at scale)
- [ ] Know index types: **btree** (default), **gin** (arrays/JSONB), **gist/brin** (ranges, large tables)
- [ ] Consider **caching vs indexing** trade-offs and read/write ratios
- [ ] Parameterized queries against SQL injection — **always**
- [ ] Least-privilege roles; separate read/write users
- [ ] Never log or store secrets in plaintext; use column/database encryption as required
- [ ] Restrict production access; review grants and extension usage

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
