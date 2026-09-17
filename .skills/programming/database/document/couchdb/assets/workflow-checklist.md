# optimistic concurrency: create, then always send _rev back on update: Workflow Checklist

A practical run sheet for applying [optimistic concurrency: create, then always send _rev back on update](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **Documents** are JSON objects stored under a unique _id with a _rev (revision) token
- [ ] 1. Core Concepts: **Databases** are collections of documents; views/indexes are per-database
- [ ] 2. Access via HTTP: REST API: GET/PUT/POST/DELETE /db/{docid}
- [ ] 2. Access via HTTP: Maintenance: GET /_all_dbs, _changes feed, _compact, _replicate
- [ ] 3. Views and Indexes: **Design documents** (_design/*) contain view functions; they run against a snapshot of the database (B-tree) and are rebuilt lazily via the _view endpoints
- [ ] 3. Views and Indexes: Map function: emit(key, value); reduce optional: sum, count, or custom
- [ ] 4. Conflicts and Replication: Replication is asynchronous; each node can have different revision trees
- [ ] 4. Conflicts and Replication: **Conflicts** appear as _conflicts in a document; resolve by updating the base revision with merged content
- [ ] 5. Operational Practices: Run at least 3 nodes; use the cluster module (Paxos-based) for automatic sharding
- [ ] 5. Operational Practices: Compact databases and views periodically: _compact and _view_cleanup release disk (tombstone overhead)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
