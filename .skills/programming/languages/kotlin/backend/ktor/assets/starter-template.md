# Ktor Backend Best Practices: Starter Template

A reusable starting point derived from the **9. Testing** section of [Ktor Backend Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
