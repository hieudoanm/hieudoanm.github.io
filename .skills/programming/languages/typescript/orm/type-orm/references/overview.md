# Overview

Focused reference for **typeorm-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# TypeORM Best Practices

TypeORM is a TypeScript ORM for relational databases that models tables as **classes decorated with metadata** (`@Entity`, `@Column`). Practical TypeORM leans on **a single `DataSource` created once, entities that are both the schema and the type shape, explicit relation loading (`relations:`/`FindOptions`), and migrations as the only schema evolution path**. The Repository/EntityManager boundary keeps queries typed; the query builder is there for the genuinely dynamic cases.

---

## 1. DataSource & Connection

- **One `DataSource` per app, initialized once at startup:**

```ts
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  entities: [User, Visit],
  migrations: ["./migrations/*.{ts,js}"],
  synchronize: false,        // NEVER synchronize in shipping code
  logging: process.env.SQL_ECHO === "true",
});
```

- **`synchronize: false` in everything except throwaway dev DBs** — schema drift via sync is a prod incident waiting.
- **Reuse the pool** — one connection from DI, not a new `DataSource` per request.
- **`getRepository(Entity)`/`dataSource.getRepository` over re-scanning `EntityManager` per call** — repositories are cheap, consistent wrappers.

---

## 2. Entities

- **Entities are the schema and the type — front loaded with intention:**

```ts
@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
```

- **Column types chosen per DB** — `numeric` for money (never `float`), `timestamptz` for instants (`{ type: "timestamptz" }`), `varchar(n)` bounded.
- **`@Index()` on hot query/filter keys; composite via `@Index(["a", "b"]).`**
- **Relations declared once (`@ManyToOne`/`@OneToMany` with `inverseSide`)** — the FK column is explicit, the JS side optional.
- **Named the class after the domain and `@Entity` name explicit** — `User` in code, `user` table; no magic.
