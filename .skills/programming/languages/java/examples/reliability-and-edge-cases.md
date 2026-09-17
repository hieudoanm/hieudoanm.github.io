# Java Best Practices: 5. Error Handling

## Source guidance

This example applies the **5. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Checked exceptions for recoverable, caller-must-handle conditions; unchecked for programming bugs** — don't wrap every failure in `RuntimeException` and don't throw checked exceptions just to be symmetrical.
- **Custom exception types when callers need to distinguish** — a few domain exceptions (`ConfigException`, `RetryableException`) with clear messages, not a dump of the JDK catalog.
- **`try/catch` narrowly; never `catch (Exception) {}`** — swallow nothing silently. At the top boundary, catch-and-convert to a user-visible response + log with the original cause.

## Example

```java
try {
    return parse(spec);
} catch (ParseException e) {
    throw new ConfigException("invalid spec at " + path, e);
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for java-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
