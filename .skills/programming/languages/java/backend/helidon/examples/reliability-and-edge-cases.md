# Helidon Best Practices: 5. Errors & Validation

## Source guidance

This example applies the **5. Errors & Validation** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Validate at the boundary; map to `400`/`404`** explicitly:
- **`ExceptionMapper`/`ErrorHandler` for the rest** — a domain exception becomes an HTTP response in one place.
- **Log + render**: internal detail goes to logs (structured); a safe, generic message to the client.
- **Failures are not thrown from every handler layer** — a handler that returns early with a status is the readable path.

## Example

```java
res.status(Http.Status.BAD_REQUEST_400).send("invalid id");
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for helidon-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
