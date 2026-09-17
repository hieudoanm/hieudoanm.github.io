# Elasticsearch Best Practices: Workflow Checklist

A practical run sheet for applying [Elasticsearch Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: Assume Elasticsearch **8.x** unless stated otherwise
- [ ] 1. Core Stack & Constraints: **Do not treat ES as a transactional database** — it is not the source of truth
- [ ] 2. Indexing & Data Modeling: **Design mappings before indexing data**
- [ ] 2. Indexing & Data Modeling: **Separate text vs keyword intentionally** — text analyzed for full-text; keyword exact for filters/aggregations/scripts
- [ ] 3. Safety & Data Integrity: **Assume data can be rebuilt from primary storage**
- [ ] 3. Safety & Data Integrity: Avoid destructive operations without warnings: **index deletion, reindex with overwrite**
- [ ] 4. Performance & Reliability: **Design queries to limit scanned documents**
- [ ] 4. Performance & Reliability: **Avoid deep pagination with from + size** — prefer **search_after** (or PIT) for deep paging
- [ ] 5. General Rules of Thumb: **Search engine, not store** — treat ES as disposable and rebuildable
- [ ] 5. General Rules of Thumb: **Mapping is the schema** — design it before data flows in; keep field names bounded

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
