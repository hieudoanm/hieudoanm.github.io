# Spring Boot Backend Best Practices: 6. Error Handling

## Source guidance

This example applies the **6. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Centralized exception handling with `@ControllerAdvice`** — one place maps domain exceptions to API errors:
- **Do not leak internal exceptions or stack traces** — respond with API-safe messages; log the cause.
- **Proper HTTP status codes** (`201`, `204`, `400`, `404`, `409`) via `ResponseEntity`/`@ResponseStatus`.
- **Services throw domain exceptions; the advice maps them** — HTTP stays in the edge.

## Example

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for spring-boot-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
