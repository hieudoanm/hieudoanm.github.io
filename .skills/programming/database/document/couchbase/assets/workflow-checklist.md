# couchbase: Workflow Checklist

A practical run sheet for applying [couchbase](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **Buckets** are the top-level containers (like databases) that hold documents
- [ ] 1. Core Concepts: **Scopes and collections** (Couchbase Server 7+) provide hierarchical organization within a bucket, analogous to schemas/tables
- [ ] 2. Access Patterns: **Key-value** operations (get/set/upsert) for single-document access: the lowest latency path, consistent with the memory-first design
- [ ] 2. Access Patterns: **N1QL queries** for analytical or ad-hoc lookups; require a primary or secondary index to be efficient
- [ ] 3. Indexing Strategy: Create **secondary indexes** on the fields you filter/order by
- [ ] 3. Indexing Strategy: **Defer the primary index** on large buckets — it is only needed as a fallback for full scans
- [ ] 4. Operational Model: **Replication**: each bucket is distributed across servers by vBucket (default 1024). Set replica count (1–3) per bucket
- [ ] 4. Operational Model: **Rebalance** redistributes data when nodes join/leave; avoid it during heavy traffic spikes
- [ ] 5. Working with the SDKs: Use the official SDKs (couchbase npm / couchbase PyPI / Java / Go / .NET)
- [ ] 5. Working with the SDKs: Connect once and reuse the cluster handle; handle AmbiguousTimeoutError, DocumentNotFoundException, and CasMismatchException in application logic

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
