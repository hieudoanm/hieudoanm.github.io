# Apache Iceberg Best Practices: Workflow Checklist

A practical run sheet for applying [Apache Iceberg Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Table Creation & Specs: **Declare schema + PARTITIONED BY at create — the partition spec is part of the identity:**
- [ ] 1. Table Creation & Specs: **Prune to access patterns: partition by the filter dimension most used; bucket by join keys.**
- [ ] 2. Writes & Snapshots: **Each commit creates a snapshot — atomic, isolated reads:**
- [ ] 2. Writes & Snapshots: **MERGE/COPY INTO for upserts/Merged-final; OVERWRITE vs MERGE semantics differ — spot the intent.**
- [ ] 3. Partitioning & Data Layout: **Transform-based partitioning: days(), truncate(n), bucket(n, col) — not raw columns only:**
- [ ] 3. Partitioning & Data Layout: select days() for time-range filters, bucket() for high-cardinality keys
- [ ] 4. Maintenance Tasks: **Routine maintenance keeps "table health":**
- [ ] 4. Maintenance Tasks: **expire_snapshots honors retention; older_than > the longest still-referenced read.**
- [ ] 5. Time Travel & Governance: **FOR SYSTEM_VERSION, FOR SYSTEM_TIME, and branch/tag management for reproducible reprocessing:**
- [ ] 5. Time Travel & Governance: **Tags/branches for "golden" releases — mundane audits rely on stable snapshots.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
