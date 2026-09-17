# Micronaut Best Practices: 5. Validation & Error Handling

## Source guidance

This example applies the **5. Validation & Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Bean Validation (`@Valid`, `@NotBlank`, `@Size`) at the request boundary (see `@Valid CreateUser`); `@NotNull` in services:**
- **Custom error mapping via `@Error`/`@ExceptionHandler`:**
- **Fail-fast validation before side effects** — invalid input never reaches a service.
- **Unknown exceptions logged + mapped to 500** — no stack trace to the client.

## Example

```java
@Post
public User create(@Body @Valid CreateUser body) { ... }
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for micronaut-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
