# Workflow notes

Focused reference for **mikroorm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 3. Identity Map & Unit of Work

- **The identity map: one DB row ⇒ one entity instance per `em`** — it's a feature, not a leak:

```ts
const u1 = await em.findOne(User, id);
const u2 = await em.findOne(User, id);
u1 === u2;   // true inside the same em context
```

- **Tracked objects flush together**: `em.persist(x).flush()` — or let the UoW collect changes and commit once:

```ts
em.assign(user, { balance: "0.00" });
await em.flush();          // persistence of every change in the context
```

- **`em.persist`/`flush` after mutation; `em.remove` for deletion; `em.populate` for eager.**
- **Detached entities** (from a closed context, or `@SerializedPrimaryKey` сокm raw objects) — re-attach deliberately or query fresh; never mutate a detached instance expecting persistence.
- **Beware long-lived `em` holding stale identity** — fork fresh contexts per unit of work.

---

## 4. Querying & Relations

- **`em.find` with `where`/`orderBy`/`limit`/`offset` reads as the query; filtering by relation via `where: { user: { active: true } }`:**

```ts
const users = await em.find(User, { active: true }, {
  populate: ["visits"],
  orderBy: { createdAt: "DESC" },
  limit: 20,
});
```

- **`populate` eagerly for hot paths; never trigger lazy `Collection` access in a loop (N+1).**
- **`em.findOne(... )` with `filters` (soft-delete default) understood**: `@Filter` makes every query obey the rule — know it's on.
- **Aggregations/joins via `em.createQueryBuilder`/`qb.leftJoinAndSelect` only for the dynamic cases** — the QueryBuilder is SQL with typing, use it for the genuinely complex stuff.
- **Raw SQL (`em.getConnection().execute`) as the last resort, boxed in a named repository**.

---

## 5. Migrations & Schema
