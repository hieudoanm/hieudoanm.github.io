# fauna: Workflow Checklist

A practical run sheet for applying [fauna](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **Tables** hold documents; each document has a unique ref, a schema-driven shape, and automatic timestamps/versions
- [ ] 1. Core Concepts: **FQL is the primary query language**: chaining structured operations with an elegant, C#-like syntax
- [ ] 2. FQL Query Syntax: Reads: doc = DocumentWithVersion("product/123"), table.all() vs table.byId(id)
- [ ] 2. FQL Query Syntax: Writes: fql create, update, and delete ops; batch with compose, do, or map for multiple ops
- [ ] 3. Data Modeling and Indexes: **Indexes**: keep secondary lookups fast — create an index on the fields you query by (e.g., by_user, by_status_created_at)
- [ ] 3. Data Modeling and Indexes: Model **relationships** explicitly using the document graph (like edges) rather than keeping arrays of ids awkwardly
- [ ] 4. Authorization: Fauna has a role-based access control with **role documents** and built-in **JWT** client auth
- [ ] 4. Authorization: Create collections then roles; attach _privileges_ per collection/database
- [ ] 5. Operations and Deployment: It is a managed service — no installation; use the web dashboard or CLI (fauna npm)
- [ ] 5. Operations and Deployment: Driver: official fauna-js (ESM, FQL, or legacy fql-lite)

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
