# Dart Best Practices: 7. Errors & Domain Modeling

## Source guidance

This example applies the **7. Errors & Domain Modeling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Exceptions for genuine failures; `Result`/sealed types for expected outcomes** — "not found", "already exists" are business cases:
- **Throw precise exceptions** — `FormatException`, `RangeError`, domain types — matching the failure to the type.
- **Catch narrowly** (`catch (on ApiException e)`) and rethrow/convert with the cause preserved; never swallow.
- **Validate input at the boundary before touching state** — fail fast, not after partial mutation.
- **Never `catch (e)` an empty block** — log + rethrow or return an explicit error.

## Example

```dart
final r = await repo.find(id);
return switch (r) {
  Ok(value: final u) => u,
  Err() => throw NotFoundException(),
};
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for dart-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
