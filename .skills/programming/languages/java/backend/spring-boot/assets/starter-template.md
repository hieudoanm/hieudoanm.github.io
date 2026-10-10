# Spring Boot Backend Best Practices: Starter Template

A reusable starting point derived from the **3. Dependency Injection** section of [Spring Boot Backend Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```java
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
