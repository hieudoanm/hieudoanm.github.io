---
name: spring-boot-backend
description: Best practices for building HTTP APIs with Spring Boot (Java). Use when creating, structuring, or reviewing a Spring Boot app — covers layering, DTOs, validation, transactions, exception handling, and security.
---

# Spring Boot Backend Best Practices

Spring Boot is a configuration-first Java framework built on Spring MVC, Spring Data, and (optionally) Spring Security. Best practice is disciplined layering — controller/service/repository each with one responsibility — plus DTOs at every API boundary, centralized exception mapping, constructor injection, and explicit transaction and validation boundaries.

---

## 1. Core Stack & Constraints

- Java **17**; Spring Boot **3.x**; Spring MVC for REST APIs; Spring Data JPA for persistence
- Jakarta Validation (Bean Validation) for input validation
- `spring-boot-starter-test` + `@WebMvcTest`/`@SpringBootTest` for tests

```bash
curl -G https://start.spring.io -d dependencies=web,data-jpa,validation,security -d type=gradle-project -o app.zip
```

- **Pin Java to 17+ per the project**; no JVM-version drift across machines (toolchain in build config).

---

## 2. Layering & Structure

- **Separate layers with one responsibility** — `controller`, `service`, `repository`, `domain/entity`:

```text
src/main/java/com/example/app/
  controller/      # HTTP wiring, DTO mapping, validation triggers
  service/         # business logic + transaction boundaries
  repository/      # thin Spring Data interfaces
  domain/          # entities, value objects
```

- **Controllers are thin** — accept a request DTO, call a service, return a response DTO; no business logic.
- **Business logic lives in services, not controllers** — controllers orchestrate HTTP only.
- **Repositories are thin** — Spring Data interfaces for persistence; no business rules in queries.
- **Stateless services where possible**; prefer composition over inheritance.

---

## 3. Dependency Injection

- **Constructor injection over field injection** — `@RequiredArgsConstructor`-style (or explicit constructor) DI:

```java
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

- **Avoid `@Autowired` on fields** and static access to Spring beans — constructor injection makes dependencies explicit and testable.
- **Avoid field injection entirely** — field-injected beans hide dependencies and frustrate tests.
- **Avoid Lombok unless explicitly requested** — generated equals/hashCode/toString silently change entity semantics; this repo prefers explicit Java.

---

## 4. DTOs at Every API Boundary

- **Never expose entities directly** — request/response DTOs are the contract:

```java
public record UserCreate(String name, @Email String email) {}
public record UserOut(long id, String name, String email) {}
```

- **Controllers map DTO → service → DTO** — entities stay inside the persistence/service layers.
- **Avoid exposing internal IDs unintentionally** — external IDs where persistence keys shouldn't leak to clients.
- **Records for DTOs** (Java 17) give immutable, concise contracts.

---

## 5. Validation

- **Combine Bean Validation with DTOs** — `@Valid` on the controller parameter, constraints on the record:

```java
@PostMapping
public UserOut create(@Valid @RequestBody UserCreate req) {
    return userService.create(req);
}
```

- **Fail fast on invalid input** — validation happens at the boundary before any service work.
- **Never trust client input** — validate path/query/body; use constraint annotations (`@NotBlank`, `@Email`, `@Positive`, ranges).
- **Domain invariant checks live in services** — HTTP-shape validation via annotations, business rules via explicit service checks throwing domain exceptions.

---

## 6. Error Handling

- **Centralized exception handling with `@ControllerAdvice`** — one place maps domain exceptions to API errors:

```java
@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(NotFoundError.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiError notFound(NotFoundError ex) {
        return new ApiError(404, ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError validation(MethodArgumentNotValidException ex) {
        return new ApiError(400, "invalid request");
    }
}
```

- **Do not leak internal exceptions or stack traces** — respond with API-safe messages; log the cause.
- **Proper HTTP status codes** (`201`, `204`, `400`, `404`, `409`) via `ResponseEntity`/`@ResponseStatus`.
- **Services throw domain exceptions; the advice maps them** — HTTP stays in the edge.

---

## 7. Transactions & Persistence

- **Explicit transactional boundaries via `@Transactional` on service methods** — the unit of work is the service method, not scattered calls:

```java
@Transactional
public OrderOut createOrder(CreateOrder req) {
    Order order = orderRepository.save(Order.from(req));
    paymentService.charge(order);           // same tx unless REQUIRES_NEW
    return OrderOut.from(order);
}
```

- **Avoid long-running transactions** — keep DB work bounded; no slow external calls inside a transaction.
- **Read-only transactions where applicable** — `@Transactional(readOnly = true)` on queries.
- **Repositories should be thin** — no business logic in repository layer.

---

## 8. Security

- **Prefer method-level security over controller checks** — `@PreAuthorize`/`@Secured` declaratively:

```java
@PreAuthorize("hasRole('ADMIN')")
@DeleteMapping("/users/{id}")
public void delete(@PathVariable long id) { ... }
```

- **Spring Security for authN/authZ** — JWT/OAuth2 via the security filter chain, configured explicitly per route.
- **Security-sensitive logic lives in the service layer** — controllers enforce the boundary, services enforce policy.
- **Never trust client input; validate everything at the boundary.**

---

## 9. Reliability & Maintainability

- **Small, focused methods**; clear intent-revealing naming; prefer immutability where possible.
- **Avoid side effects in entity constructors** — keep construction and behavior distinct.
- **Avoid premature optimization and overengineering** — explicit, simple code wins.
- **Configuration via `application.yml`, not hard-coded values** — profiles (`dev`, `test`, `prod`) explicitly.
- **Externalize secrets** — environment variables/secret store; never hardcode credentials.
- **Log at boundaries** — controller entry, integration points, errors; structured logging.

---

## 10. Testing

- **Slice tests for focus** — `@WebMvcTest(controllers = ...)` with mocked services for controller behavior:

```java
@WebMvcTest(UserController.class)
class UserControllerTest {
    @MockBean UserService userService;
    // mock service, assert HTTP status/body via MockMvc
}
```

- **`@SpringBootTest` for integration** — repository/transaction behavior with a test DB (H2/Testcontainers).
- **Test the contract** — success status/body, `400` on invalid body, `404`/`409` mappings, auth `401`/`403`.
- **Deterministic tests** — test profiles, reset DB state per suite; no live network.

---

## 11. General Rules of Thumb

- **Layers stay honest** — thin controllers, business services, thin repositories; domains never cross boundaries as entities.
- **Constructor injection** — dependencies explicit via constructor, testable without container magic.
- **Validation at the edge via Jakarta annotations; invariants in services** — fail fast, never trust input.
- **One `@ControllerAdvice`, explicit `@Transactional`, method-level security** — the declarative core of Spring Boot done right.
- **DTOs for the API; entities stay internal** — contracts stable, internals free to change.

---

## Quick-Start Checklist

- [ ] Java 17 + Spring Boot 3.x; controller/service/repository/domain layout
- [ ] Constructor injection only; no `@Autowired` fields, no static bean access, no Lombok by default
- [ ] DTO records at every API boundary; entities never exposed; no internal-ID leaks
- [ ] Jakarta validation with `@Valid` at controllers; invariants checked in services; fail fast
- [ ] `@ControllerAdvice` centralizes exception → status/body mapping; no leaked stack traces
- [ ] `@Transactional` boundaries on service methods; no long-running transactions; `readOnly = true` where apt
- [ ] Method-level security (`@PreAuthorize`); authN/authZ in Spring Security filter chain
- [ ] Config via `application.yml` + `dev`/`test`/`prod` profiles; secrets externalized
- [ ] `@WebMvcTest` controller slices + `@SpringBootTest` integration with test DB
- [ ] Contract tests cover 200/400/404/409/401/403