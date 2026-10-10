# Overview

Focused reference for **mikroorm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# MikroORM Best Practices

MikroORM is a TypeScript data-mapper ORM with a **unit of work**: entities are plain objects, and `em.flush()` persists every tracked change in one transaction. Practical MikroORM leans on **a single `MikroORM`/`EntityManager` per request, `em.fork()` for isolated contexts, entities as the schema (decorators or schema-first), and explicit `populate` over lazy `ref` access**. The magic is real but bounded — understand what managed vs detached means and the ORM stays predictable.

---

## 1. ORM Setup & Context

- **One `MikroORM` instance; a request-scoped `EntityManager` via `fork()`:**

```ts
export const orm = await MikroORM.init({
  entities: [User, Visit],
  dbName: process.env.DB_NAME,
  host: process.env.DB_HOST,
  migrations: { path: "./migrations" },
  debug: process.env.SQL_ECHO === "true",
});

// per request/handler:
const em = orm.em.fork();
```

- **Never share one `em` across concurrent requests** — the identity map + UoW are request-scoped by design.
- **`fork()` in tests/background workers for isolation; `orm.em` is the global factory, not the shared context.**
- **`synchronize: false` (schema via migrations) except throwaway dev DBs.**
- **Explicit `migrations`/`seeder` paths wired once** — disposed in `close()` on app shutdown.

---

## 2. Entities

- **Decorator entities are the schema and the type:**

```ts
@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property({ length: 255, unique: true })
  email!: string;

  @Property({ columnType: "numeric" })
  balance!: string;           // money as string; avoid float

  @Enum(() => UserRole)
  role!: UserRole;

  @ManyToMany(() => Visit)
  visits = new Collection<Visit>(this);

  @Property({ onCreate: () => new Date() })
  createdAt = new Date();
}
```

- **Tight types at the DB boundary** — `columnType: "numeric"` for money (stay away from float), timestamps via `onCreate`/`onUpdate`, `varchar(n)` bounded.
- **`Collection<T>` for to-many relations; `Reference<T>` only for pure-reference laziness (else `populate`).**
- **Enums as TS enums (`@Enum`)** — not magic strings in code.
- **Opaque vs owned**: `Embeddable`/`@Embedded` for value objects kept inside the row; relations get real FKs.

---
