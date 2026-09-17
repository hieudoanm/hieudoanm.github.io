---
name: "mongoose-best-practices"
description: "Best practices for using Mongoose — the MongoDB ODM conventions for Node.js. Use when writing, structuring, or reviewing Mongoose — covers schemas, models, queries, validation, indexing, transactions, and testing."
tags:
  - "programming"
  - "language"
  - "typescript"
  - "orm"
  - "mongoose"
when_to_use: "Use when writing, structuring, or reviewing Mongoose."
prerequisites:
  - "Basic familiarity with TypeScript and the project conventions."
  - "For implementation, access to the relevant source code and development environment."
related_skills:
  - "../sequelize/SKILL.md"
  - "../../SKILL.md"
  - "../mikro-orm/SKILL.md"
avoid_when:
  - "When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions."
status: "active"
---

# Mongoose Best Practices

Mongoose is the MongoDB object-document mapper for Node.js — it puts a **schema and validation layer over flexible documents**. Practical Mongoose leans on **explicit schemas that are stricter than need be, lean documents (referenced, not nested blobs), and queries that hit the indexes you define**. MongoDB rewards documents shaped for the access pattern — so design the schema from the query, then let the ODM enforce it.

## When to use

Use when writing, structuring, or reviewing Mongoose.

## Prerequisites

- Basic familiarity with TypeScript and the project conventions.
- For implementation, access to the relevant source code and development environment.

## Scope boundary

- When the project does not use this technology or pattern, or the task falls outside its scope; follow the project’s existing stack and conventions.

## Essential checks

- **Design the document for the query, then enforce it with the schema.**
- **Reference, don't nest; project, don't ship; lean, don't hydrate.**
- **Indexes are the access plan — declared in schema, verified with explain.**
- **Atomic operators first; transactions for multi-doc invariants.**
- **timestamps: true, versionKey deliberate, validation at the boundary.**
- **Explain before you profile; lean() for reads you don't mutate.**
- [ ] Explicit schema: required/enum/minmax; timestamps: true; typed model<T>()
- [ ] Await every query; .lean() on read-only paths; .select() projections

## Focus areas

- 1. Schemas & Models
- 2. Queries
- 3. Validation & Middleware
- 4. Indexes
- 5. Relationships & Aggregations
- 6. Transactions & Atomicity
- 7. Performance & Memory
- 8. Testing

## Detailed references

- [Implementation notes](./references/implementation-notes.md)
- [Overview](./references/overview.md)
- [Review checklist](./references/review-checklist.md)
- [Workflow notes](./references/workflow-notes.md)

## Related materials

- [Examples](./examples/)
- [Supporting assets](./assets/)
