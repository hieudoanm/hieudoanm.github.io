# hbase shell -n runs non-interactively; in 2.x every table lives in a namespace: Starter Template

A reusable starting point derived from the **3. Schema and Column Families** section of [hbase shell -n runs non-interactively; in 2.x every table lives in a namespace](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```bash
# hbase shell -n runs non-interactively; in 2.x every table lives in a namespace
create_namespace 'shop'
# two families, not many columns: d is the hot scalar payload, i the sparse lookup index
create 'shop.orders',
       {NAME => 'd', VERSIONS => 1, COMPRESSION => 'ZSTD', TTL => 7776000},   # 90 days
       {NAME => 'i', VERSIONS => 1, COMPRESSION => 'SNAPPY'},
       SPLITS => ['03-', '07-', '0b-']                    # pre-split on the salt prefix
# retention and compression are family properties, adjustable after creation
alter 'shop.orders', {NAME => 'd', TTL => 2592000}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
