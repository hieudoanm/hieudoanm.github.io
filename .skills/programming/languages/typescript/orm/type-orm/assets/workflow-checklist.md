# TypeORM Best Practices: Workflow Checklist

A practical run sheet for applying [TypeORM Best Practices](../SKILL.md). Tailor each item to the current project and record evidence where the decision matters.

## Before starting

- [ ] Confirm the task is within this skill's scope.
- [ ] Check applicable versions, project conventions, and prerequisites.
- [ ] Define a measurable outcome and relevant constraints.

## Apply the skill

- [ ] 1. DataSource & Connection: **One DataSource per app, initialized once at startup:**
- [ ] 1. DataSource & Connection: **synchronize: false in everything except throwaway dev DBs** — schema drift via sync is a prod incident waiting
- [ ] 2. Entities: **Entities are the schema and the type — front loaded with intention:**
- [ ] 2. Entities: **Column types chosen per DB** — numeric for money (never float), timestamptz for instants ({ type: "timestamptz" }), varchar(n) bounded
- [ ] 3. Relations & Querying: **FindOptions for the 90% structured query; relations loaded explicitly:**
- [ ] 3. Relations & Querying: **relations/leftJoinAndSelect chosen eagerly** — never lazy relation access that fires extra queries in a loop (N+1)
- [ ] 4. Transactions: **dataSource.transaction() for multi-entity invariants:**
- [ ] 4. Transactions: **Use the transactional EntityManager for every operation inside the callback** — a stray repo.save bypasses atomicity
- [ ] 5. Migrations: **Migrations are the schema's history — generated, then reviewed:**
- [ ] 5. Migrations: **Review each generated migration** — autogenerate reflects entity-current, not intent; data backfills are hand-written

## Complete the work

- [ ] Review tradeoffs and failure cases before adopting the result.
- [ ] Run the validation appropriate to the change.
- [ ] Record important assumptions and deviations for future maintainers.
