# Ktor Backend Best Practices: 9. Testing

## Source guidance

This example applies the **9. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`testApplication` + `ktor-server-test-host`** — in-process, no network, exercises routing/plugins/pipeline:
- **Test the contract** — success status/body, `400`/`404`, auth boundaries (`401` unauthenticated, `403` forbidden).
- **Isolate** — test DB (H2/SQLite, Exposed schema) reset per suite; mock outbound at service seams.
- **Deterministic and named as behavior** — Kotlin backtick test names read as specs.

## Example

```kotlin
@Test
fun `returns 201 for create user`() = testApplication {
    application { moduleWithTestDeps() }
    val res = client.post("/api/v1/users") {
        contentType(ContentType.Application.Json)
        setBody("""{"name":"Ada","email":"ada@x.io"}""")
    }
    assertEquals(HttpStatusCode.Created, res.status)
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for ktor-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
