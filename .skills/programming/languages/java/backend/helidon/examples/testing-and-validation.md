# Helidon Best Practices: 7. Testing

## Source guidance

This example applies the **7. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Unit-test handlers with fake `ServerRequest`/`ServerResponse` or the in-memory `WebServer`:**
- **Service/repository boundaries mocked** with real fakes; boundary contract tested over infrastructure.
- **MP**: `helidon-microprofile-tests` `JUnit5` support for containers.
- **Contract tests against a real dependency (DB) in a container** — the mapping layer is the integration.

## Example

```java
try (WebServer server = server().start()) {
    HttpClient http = HttpClient.newHttpClient();
    HttpResponse<String> res = http.send(
        HttpRequest.newBuilder(server.uri().resolve("/greet?name=Ada")).GET().build(),
        HttpResponse.BodyHandlers.ofString());
    assertEquals(200, res.statusCode());
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for helidon-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
