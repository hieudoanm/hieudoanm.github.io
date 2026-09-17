# hbase shell -n runs non-interactively; in 2.x every table lives in a namespace

create_namespace 'shop' # two families, not many columns: d is the hot scalar payload, i the sparse lookup index create 'shop.orders', {NAME => 'd', VERSIONS => 1, COMPRESSION => 'ZSTD', TTL => 7776000}, # 90 days {NAME => 'i', VERSIONS => 1, COMPRESSION => 'SNAPPY'}, SPLITS => ['03-', '07-', '0b-'] # pre-split on the salt prefix # retention and compression are family properties, adjustable after creation alter...

## When to use

Use when implementing, configuring, evaluating, or troubleshooting hbase shell -n runs non-interactively; in 2.x every table lives in a namespace in a project.

## Core topics

- 1. Core Concepts
- 2. Row Key Design
- 3. Schema and Column Families
- 4. Reads and Writes
- 5. Operations and Tuning
- 6. Common Pitfalls

## Reference materials

- [1. Core Concepts](./references/core-concepts.md)
- [Overview](./references/overview.md)
- [2. Row Key Design](./references/row-key-design.md)
- [Schema and Column Families](./references/schema-and-column-families.md)

## Examples

- [hbase shell -n runs non-interactively; in 2.x every table lives in a namespace: Basic Usage](./examples/basic-usage.md)
- [hbase shell -n runs non-interactively; in 2.x every table lives in a namespace: 5. Operations and Tuning](./examples/reliability-and-edge-cases.md)
- [hbase shell -n runs non-interactively; in 2.x every table lives in a namespace: 3. Schema and Column Families](./examples/setup-and-configuration.md)
- [hbase shell -n runs non-interactively; in 2.x every table lives in a namespace: Quick-Start Checklist](./examples/testing-and-validation.md)

## Assets

- [hbase shell -n runs non-interactively; in 2.x every table lives in a namespace: Decision Record](./assets/decision-record.md)
- [hbase shell -n runs non-interactively; in 2.x every table lives in a namespace: Starter Template](./assets/starter-template.md)
- [hbase shell -n runs non-interactively; in 2.x every table lives in a namespace: Validation Plan](./assets/validation-plan.md)
- [hbase shell -n runs non-interactively; in 2.x every table lives in a namespace: Workflow Checklist](./assets/workflow-checklist.md)

## Canonical guide

- [SKILL.md](./SKILL.md)
