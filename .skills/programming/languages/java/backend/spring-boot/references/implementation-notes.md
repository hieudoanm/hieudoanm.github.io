# Implementation notes

Focused reference for **spring-boot-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
