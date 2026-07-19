# TypeORM Best Practices: 2. Entities

## Source guidance

This example applies the **2. Entities** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Entities are the schema and the type — front loaded with intention:**
- **Column types chosen per DB** — `numeric` for money (never `float`), `timestamptz` for instants (`{ type: "timestamptz" }`), `varchar(n)` bounded.
- **`@Index()` on hot query/filter keys; composite via `@Index(["a", "b"]).`**
- **Relations declared once (`@ManyToOne`/`@OneToMany` with `inverseSide`)** — the FK column is explicit, the JS side optional.
- **Named the class after the domain and `@Entity` name explicit** — `User` in code, `user` table; no magic.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for typeorm-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
