# Overview

Focused reference for **micronaut-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
