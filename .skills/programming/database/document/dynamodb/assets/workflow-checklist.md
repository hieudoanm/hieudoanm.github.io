# DynamoDB Best Practices: Workflow Checklist

A practical run sheet for applying [DynamoDB Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Stack & Constraints: **Design for queries, not tables** — model access patterns first
- [ ] 1. Core Stack & Constraints: **Avoid Scan in production** — query with keys/GSIs
- [ ] 2. Data Modeling & Access Patterns: **Start with access patterns first**; encode entity type and relationships in keys
- [ ] 2. Data Modeling & Access Patterns: Use **composite keys deliberately** (PK + SK)
- [ ] 3. Security, Consistency & Data Safety: Use **IAM roles with least privilege**; prefer **fine-grained access (condition keys)**
- [ ] 3. Security, Consistency & Data Safety: Decide **consistency per operation** — eventual (default) vs strong
- [ ] 4. Reliability, Scaling & Performance: DynamoDB **scales automatically — but keys still matter**
- [ ] 4. Reliability, Scaling & Performance: Monitor: **consumed capacity, throttling events, hot partitions**
- [ ] 5. General Rules of Thumb: **Keys are the schema** — entity type and access path live in PK/SK
- [ ] 5. General Rules of Thumb: **One table, sparse GSIs, no scans** — the DynamoDB idiom

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
