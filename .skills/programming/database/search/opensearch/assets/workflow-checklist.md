# OpenSearch Best Practices: Workflow Checklist

A practical run sheet for applying [OpenSearch Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: Assume OpenSearch **2.x** unless specified
- [ ] 1. Core Stack & Constraints: **Do not use OpenSearch as a transactional database**
- [ ] 2. Indexing & Data Modeling: **Design mappings before indexing data**
- [ ] 2. Indexing & Data Modeling: **Separate text and keyword intentionally**; choose analyzers per language/behavior
- [ ] 3. Security & Governance: **Enable and configure the OpenSearch Security plugin**
- [ ] 3. Security & Governance: Use **least-privilege roles**; **separate read, write, and admin permissions**
- [ ] 4. Performance & Reliability: **Avoid deep pagination with from + size** — prefer **search_after/scroll** for large result sets
- [ ] 4. Performance & Reliability: **Limit aggregation cardinality**
- [ ] 5. General Rules of Thumb: **Platform, not store** — treat indexes as rebuildable from primary sources
- [ ] 5. General Rules of Thumb: **Security is on by default, not an afterthought** — roles least-privilege, perms separate

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
