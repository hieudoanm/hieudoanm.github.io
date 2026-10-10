# graphql: Workflow Checklist

A practical run sheet for applying [graphql](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. Core Concepts: **Schema**: the contract — types, fields, and relationships, written in SDL (Schema Definition Language)
- [ ] 1. Core Concepts: **Resolver**: server function per field that returns data for that field, with types enforced by the framework
- [ ] 2. Schema Design: Compose types, interface, union, enums, inputs, and scalars
- [ ] 2. Schema Design: Strong typing — each field has a type; nullable vs non-null (String!) encodes contract rigor
- [ ] 3. Queries and Mutations: Query example: { user(id: 1) { name email posts { title } } }
- [ ] 3. Queries and Mutations: Mutations are designed with an **input and output pattern**: mutation { createUser(input: {...}) { user { id name } } }
- [ ] 4. Performance: **N+1 problem**: resolvers that fire one DB query per parent row — solve with **DataLoader** (batching + caching per request) or joins in single resolvers
- [ ] 4. Performance: **Batching**: DataLoader loader.load(key) coalesces concurrent loads per tick
- [ ] 5. Architectures: **GraphQL Gateway / Federation**: compose multiple microservices into one graph (Apollo Federation, Mercurius Federation)
- [ ] 5. Architectures: **Monolith-graph**: single server serving the whole schema, simplest to start

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
