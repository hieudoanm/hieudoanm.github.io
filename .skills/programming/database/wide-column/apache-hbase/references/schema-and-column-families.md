# Schema and Column Families

Focused reference for [Apache HBase](../SKILL.md) schema design.

## Design rules

- Keep the number of column families small; each family affects storage and compaction behavior.
- Group columns by access pattern and retention needs, not by application object shape alone.
- Set TTL or compression at the column-family level only when the workload requires it.
- Benchmark schema choices with representative reads, writes, and compactions.

## Example

```text
create 'events', {NAME => 'hot', TTL => 2592000}
describe 'events'
```

Confirm that the cluster supports the selected compression codec and that the TTL matches retention requirements.
