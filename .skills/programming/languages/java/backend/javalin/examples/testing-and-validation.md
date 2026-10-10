# Javalin Best Practices: 7. Testing

## Source guidance

This example applies the **7. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`Javalin.create()` in-memory + `HttpClient` (or `TestClient`)**:
- **`app.port()` dynamic for CI; `before`-middleware swapped with fakes in tests.**
- **Contract tests**: valid, invalid ID, not-found, unauthorized, validation rejection.

## Example

```java
try (Javalin app = Javalin.create().routes(...).start()) {
    HttpClient http = HttpClient.newHttpClient();
    HttpResponse<String> res = http.send(
        HttpRequest.newBuilder(app.port().uri().resolve("/users/1")).GET().build(),
        HttpResponse.BodyHandlers.ofString());
    assertEquals(200, res.statusCode());
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for javalin-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
