# Javalin Best Practices: 4. Validation & Errors

## Source guidance

This example applies the **4. Validation & Errors** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Validate at the handler entry, fail fast:**
- **`exceptionHandler` per exception class, registered once:**
- **Domain exceptions carry status intent** (`NotFoundException`, `BadRequestException`) — the mapping is config, not handler boilerplate.
- **Never fall through to an unhandled exception stack trace** — a `LogAndComplete` catch-all at the boundary.

## Example

```java
ctx.bodyValidator(UpdateRequest.class)
   .check(r -> r.email() != null, "email required")
   .check(r -> r.email().contains("@"), "invalid email")
   .check(r -> r.age() > 0, "age must be positive")
   .get();
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for javalin-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
