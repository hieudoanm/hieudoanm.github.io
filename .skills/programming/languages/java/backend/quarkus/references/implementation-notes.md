# Implementation notes

Focused reference for **quarkus-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```java
@ConfigMapping(prefix = "app")
interface AppConfig { String dbUrl(); int retries(); }
```

- **Secrets via env/`Helidon`-style layer, never constants**; native builds bake config — env overrides still apply.

---

## 5. Data Access (Panache)

- **Panache entity/repository = minimal boilerplate; the mapping layer stays thin:**

```java
@Entity
public class User extends PanacheEntity {
    public String email;
    public boolean active;
}

var users = User.list("active", true);
```

- **Repository form for imperfectly-shaped data** (`@ApplicationScoped class UserRepository implements PanacheRepository<User>`).
- **Queries with `Order`/`firstResult`/`range` pagination** — never load-all + slice.
- **N+1 avoided** (`@Query` fetch joins); `@Transaction` only for the true multi-write invariants.
- **`Fluent`/HQL typed queries for the complex cases** — Panache is not a reason to write stringly SQL.

---

## 6. Reactive & Messaging

- **Mutiny `Uni`/`Multi` for genuinely non-blocking paths; Vert.x clients for I/O:**
- Prefer the imperative layers until a measured queue/event source demands reactive — reactive has a real cognitive cost.
- **`smallrye-reactive-messaging` for Kafka/MQTT/AMQP** — the connector config is the contract; dead-letter/retry policy configured, not guessed.
- **Async correctness** — VM concurrency pitfalls noted; futures/callbacks bound, no silent thread-leak.

---

## 7. Observability

- **`smallrye-health` (`/q/health`), metrics (`/q/metrics`), tracing (`/q/trace`) come from extensions** — the `/q/` base path is the ops contract:
