# hbase shell -n runs non-interactively; in 2.x every table lives in a namespace: 3. Schema and Column Families

## Source guidance

This example applies the **3. Schema and Column Families** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Keep **column family count low** (1–3); each family = separate storage files (HFiles), so many families mean more seeks/compactions.
- Choose column families by access patterns: hot columns in one family, cold in another.
- Compression (LZO/LZ4/ZSTD) per family in `COMPRESSION` column.
- TTL per family for automatic expiry of old data (`TTL`), and `IN_MEMORY` for hot families (default off).

## Example

This excerpt is from the cited **3. Schema and Column Families** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for apache-hbase.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
