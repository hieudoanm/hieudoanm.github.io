# Spring Boot Backend Best Practices: Basic Usage

Best practices for building HTTP APIs with Spring Boot (Java). Use when creating, structuring, or reviewing a Spring Boot app — covers layering, DTOs, validation, transactions, exception handling, and security.

## Scenario

Use this example as a starting point when applying **spring-boot-backend** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Dependency Injection** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```java
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
