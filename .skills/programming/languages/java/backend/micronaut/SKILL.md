---
name: micronaut-best-practices
description: Best practices for building Java microservices with Micronaut — the compile-time AOT-oriented framework conventions. Use when writing, structuring, or reviewing Micronaut — covers annotations/wiring, routing, DI, configuration, validation, data, testing, and observability.
---

# Micronaut Best Practices

Micronaut is a compile-time, annotation-driven JVM framework — **dependency injection, configuration, and validation resolved at compile time, not runtime reflection**, giving fast startup and low memory. Practical Micronaut leans on **constructor injection with `@Singleton`/`@Inject`, `@Controller` route classes, `@ConfigurationProperties`/`@Configuration` for typed config**, and **Micronaut Data / validation annotations** at the boundaries. The AOT angle means the wiring errors you'd catch at runtime become compile-time errors.

---

## 1. Application & Bootstrapping

- **`@MicronautTest` for tests; pure DI wiring in the runtime:**

```java
@Singleton
public class GreetService {
    public String greet(String name) { return "Hello, " + name; }
}
```

- **`Micronaut.run()` from a `@Application`-annotated main; the composition root is build-time discovered.**
- **Beans explicit: `@Singleton`/`@Prototype`/`@RequestScope` — lifecycle chosen by state** (`@RequestScope` for request-bound beans, `@Singleton` for stateless services).
- **No reflection/service-locator at runtime** — dedupe with compile-time beans; tests override via `@MockBean`/`@Replaces`.

---

## 2. Routing & Handlers

- **`@Controller` classes with `@Get/@Post/@Put/@Delete` methods** — one resource per controller:

```java
@Controller("/users")
public class UserController {
    private final UserService service;
    public UserController(UserService service) { this.service = service; }

    @Get("/{id}")
    public User get(@PathVariable long id) { return service.find(id); }

    @Post
    public User create(@Body @Valid CreateUser body) { return service.create(body); }
}
```

- **`@PathVariable`/`@QueryValue`/`@Header`/`@Body` typed parameters — validation runs at the boundary.**
- **Constructor input for the service; no field injection** — the dependency graph is visible in the constructor.

---

## 3. Dependency Injection

- **Constructor injection everywhere**; beans assembled by the compile-time graph:

```java
@Singleton
public class UserService {
    private final UserRepository repo;
    public UserService(UserRepository repo) { this.repo = repo; }
}
```

- **`@Factory` for beans that need post-processing (HTTP clients, clients-of-external-API):**

```java
@Factory
public class Clients {
    @Bean @Singleton
    public HttpClient http(UriBuilder uri) { return HttpClient.newHttpClient(); }
}
```

- **No `new` in bean code** — the graph resolves; testing changes the graph via `@MockBean`.
- **DI scopes used deliberately** — request-scoped state is a boundary with a teardown contract.

---

## 4. Configuration

- **Typed config via `@ConfigurationProperties` (or `@Configuration` + `@Value` scoped):**

```yaml
app:
  db:
    url: jdbc:postgresql://localhost/db
  retries: 3
```

```java
@ConfigurationProperties("app")
public class AppConfig {
    private Db db;
    public static class Db { private String url; /* getters/setters */ }
}
```

- **`@ConfigurationProperties` bean injected once; `@Value("${app.retries}")` for the odd scalar only.**
- **Env-driven overrides** (`APP_DB_URL`) via property mapping; secrets from env, never constants.
- **Validation of config at startup** (`@NotBlank` on config properties) — a bad config fails fast in dev and deploy.

---

## 5. Validation & Error Handling

- **Bean Validation (`@Valid`, `@NotBlank`, `@Size`) at the request boundary (see `@Valid CreateUser`); `@NotNull` in services:**

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

---

## 8. Testing

- **`@MicronautTest` spins the full context; inject mocks/real beans:**

```java
@MicronautTest
class UserControllerTest {
    @Inject
    ObjectMapper mapper;

    @MockBean(UserService.class)
    UserService svc() { return mock(UserService.class); }
}
```

- **Service/repository tests against a real container Postgres for the mapping layer; fakes elsewhere.**
- **Contract cases**: valid, invalid, not-found, validation-failure — at the HTTP boundary and the service boundary.

---

## General Rules of Thumb

- **Constructor injection; compile-time bean resolution is the Micronaut superpower.**
- **Routes via `@Controller`; typed params with validation at the boundary.**
- **`@ConfigurationProperties` typed config; config validated at startup.**
- **Validation + exception-mapping once; fail fast before side effects.**
- **Micronaut Data derived queries; RBAC expected, N+1 avoided.**
- **Health/metrics/logging wired early; `@MicronautTest` + seam fakes.**

---

## Quick-Start Checklist

- [ ] `@Singleton`/`@RequestScope` chosen by state; constructor injection everywhere
- [ ] `@Controller` per resource; typed `@PathVariable`/`@Body` params
- [ ] `@Validation` at the request boundary; `@ExceptionHandler` mapping
- [ ] `@ConfigurationProperties` typed config; env overrides; secrets from env
- [ ] `@MicronautData` repository interfaces; `@Query` only for the complex SQL
- [ ] `@Timed`/health/metrics/trace wired; structured logging
- [ ] `@MicronautTest` + `@MockBean`; container-Postgres integration tests; contract cases