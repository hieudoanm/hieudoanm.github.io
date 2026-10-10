# Mongoose Best Practices: Workflow Checklist

A practical run sheet for applying [Mongoose Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Schemas & Models: **Schemas are the document contract — tighter beats looser:**
- [ ] 1. Schemas & Models: **timestamps: true for createdAt/updatedAt; versionKey: false unless you need optimistic versioning.**
- [ ] 2. Queries: **Query, then execute — always await:** Model.find().where(...).exec(); never chain un-awaited promises:
- [ ] 2. Queries: **Projection via select("name email")/.select("-password")** — never ship whole documents when the consumer needs 2 fields
- [ ] 3. Validation & Middleware: **Validation at the schema layer** — required, enum, custom validate/validator for the closed rules:
- [ ] 3. Validation & Middleware: **Pre/post hooks for derived fields and cross-document concerns, kept small**:
- [ ] 4. Indexes: **Declare indexes in the schema; compound for the real access patterns:**
- [ ] 4. Indexes: **Everything you find/sort/group by should have an index** — MongoDB without an index scans the collection
- [ ] 5. Relationships & Aggregations: **Reference, don't nest** — store authorId: ObjectId, populate on read with /ref/ or $lookup in the aggregation pipeline:
- [ ] 5. Relationships & Aggregations: **populate for simple joins; aggregation $lookup for multi-stage pipelines.**

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
