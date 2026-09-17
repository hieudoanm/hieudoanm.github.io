# PHP Best Practices: 3. Error Handling

## Source guidance

This example applies the **3. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Exceptions for failures; typed exceptions per domain** (`NotFoundException`, `ValidationException`):
- **`throw` specific types; catch narrowly** — a broad `catch (\Exception $e)` in the business layer is a code smell; `catch (\Throwable)` only at the true boundary.
- **Don't rethrow by convention — extend and wrap with `previous:`** to preserve stack context.
- **`finally` for deterministic cleanup; never swallow catches.**
- **Fail fast on invalid input at the boundary** — validate HTTP/database input before business logic mutates state.

## Example

```php
try {
    $user = $repo->findOrFail($id);
} catch (NotFoundException $e) {
    throw new HttpNotFoundException($e->getMessage(), previous: $e);
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for php-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
