# hbase shell -n runs non-interactively; in 2.x every table lives in a namespace: Basic Usage

Apache HBase — distributed, scalable, column-oriented NoSQL database on Hadoop HDFS for real-time read/write of large tables.

## Scenario

Use this example as a starting point when applying **apache-hbase** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Schema and Column Families** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
