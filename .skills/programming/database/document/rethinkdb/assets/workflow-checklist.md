# rethinkdb: Workflow Checklist

A practical run sheet for applying [rethinkdb](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **Tables** hold JSON documents; documents are like rows with flexible schemas
- [ ] 1. Core Concepts: **Databases** group tables; each table can be sharded and replicated per shard
- [ ] 2. ReQL Essentials: Chain operations: table('users').filter({active: true}).pluck('name', 'email')
- [ ] 2. ReQL Essentials: Aggregations and grouping: .group(...).count(), .sum(...), .orderBy(...)
- [ ] 3. Secondary Indexes and Performance: Add indexes via table.indexCreate('field'); drop unused indexes
- [ ] 3. Secondary Indexes and Performance: Compound and multi indexes for common query shapes
- [ ] 4. Changefeeds and Real-Time Model: Subscribe like table('chat').changes(); pass includeInitial: true to seed state
- [ ] 4. Changefeeds and Real-Time Model: Use squash: true or an integer interval (ms) to coalesce bursts of writes
- [ ] 5. Operations and Architecture: Clustered deployment with **shard per table**, optionally replicated (replicas: 2)
- [ ] 5. Operations and Architecture: Table metadata on the cluster; use the web admin or driver for reconfigurations

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
