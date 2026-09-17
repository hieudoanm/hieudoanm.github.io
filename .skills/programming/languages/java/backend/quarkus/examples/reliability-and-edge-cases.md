# Quarkus Best Practices: 5. Data Access (Panache)

## Source guidance

This example applies the **5. Data Access (Panache)** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Panache entity/repository = minimal boilerplate; the mapping layer stays thin:**
- **Repository form for imperfectly-shaped data** (`@ApplicationScoped class UserRepository implements PanacheRepository<User>`).
- **Queries with `Order`/`firstResult`/`range` pagination** — never load-all + slice.
- **N+1 avoided** (`@Query` fetch joins); `@Transaction` only for the true multi-write invariants.
- **`Fluent`/HQL typed queries for the complex cases** — Panache is not a reason to write stringly SQL.

## Example

```java
@Entity
public class User extends PanacheEntity {
    public String email;
    public boolean active;
}

var users = User.list("active", true);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for quarkus-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
