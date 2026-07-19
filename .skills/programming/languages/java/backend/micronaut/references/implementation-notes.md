# Implementation notes

Focused reference for **micronaut-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```java
@Post
public User create(@Body @Valid CreateUser body) { ... }
```

- **Custom error mapping via `@Error`/`@ExceptionHandler`:**

```java
@ExceptionHandler
public HttpResponse<?> onNotFound(NotFoundException e) {
    return HttpResponse.notFound(e.getMessage());
}
```

- **Fail-fast validation before side effects** — invalid input never reaches a service.
- **Unknown exceptions logged + mapped to 500** — no stack trace to the client.

---

## 6. Data (Micronaut Data / JDBC)

- **Micronaut Data interfaces over manual JDBC where the domain is CRUD:**

```java
@JdbcRepository(dialect = Dialect.POSTGRES)
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
```

- **`findByEmail` / `findByActiveTrue` derived queries** — the method name is the query; explicit `@Query` for the complex SQL.
- **Repository methods transactional (`@Transactional`) only where multi-write invariants demand it; single writes are atomic anyway.**
- **N+1 avoided** — fetch joins/`@Join` annotations; never lazy-in-loop in hot paths.

---

## 7. Observability

- **Micronaut core includes `@Timed`/`@Counted`/health/`@Observable` metrics out of the box:**

```java
@Timed(name = "users.find", description = "find user latency")
public Optional<User> find(long id) { ... }
```

- **Health (`/health`), metrics (`/metrics`), trace (`/trace`) wired in the build** — operators' contract, not an afterthought.
- **Structured logging** — no `System.out`; log IDs + traced correlation if the platform uses it.
