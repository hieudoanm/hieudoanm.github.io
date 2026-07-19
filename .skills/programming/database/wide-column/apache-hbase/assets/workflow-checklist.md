# hbase shell -n runs non-interactively; in 2.x every table lives in a namespace: Workflow Checklist

A practical run sheet for applying [hbase shell -n runs non-interactively; in 2.x every table lives in a namespace](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **Table = row key + column families**. Column families are groups of columns stored together; individual columns within a family are dynamic
- [ ] 1. Core Concepts: Cells are **versioned**: each write is timestamped; reads default to the latest version (configurable VERSIONS)
- [ ] 2. Row Key Design: Row keys define locality, range scans, and hotspot avoidance
- [ ] 2. Row Key Design: **Pre-split tables** to avoid the initial single-region fork in the road
- [ ] 3. Schema and Column Families: Keep **column family count low** (1–3); each family = separate storage files (HFiles), so many families mean more seeks/compactions
- [ ] 3. Schema and Column Families: Choose column families by access patterns: hot columns in one family, cold in another
- [ ] 4. Reads and Writes: get needs row key; scan supports range by start/stop row; use setFilter/filters (SingleColumnValueFilter, PrefixFilter) for filtering
- [ ] 4. Reads and Writes: **Writes are fast**: append to WAL + memstore, flushed async to HFiles. Use Batch (async) and CheckAndMutate/CheckAndPut for atomic read-modify-write
- [ ] 5. Operations and Tuning: **Compactions**: L0 + major compaction in the background; monitor compactions status; schedule idle-time major compactions
- [ ] 5. Operations and Tuning: **Block cache**: hbase.blockcache and in-table BLOCKCACHE for hot reads; hfile.block.cache.size (~40% recommended) tunes cache vs memstore

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
