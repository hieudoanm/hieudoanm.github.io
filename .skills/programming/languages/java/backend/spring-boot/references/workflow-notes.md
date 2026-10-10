# Workflow notes

Focused reference for **spring-boot-backend**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
