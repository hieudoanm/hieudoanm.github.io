# Play Framework Backend Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`scalatestplus-play` for route/controller tests** — in-process via the Play test app:
- **Unit-test services** with constructor-injected fakes — no app boot needed.
- **Test the contract** — success, `400` validation, `404` missing, `401`/`403` auth.
- **Deterministic** — in-memory/test DB per suite; no live network.

## Example

```scala
class UserControllerSpec extends PlaySpec with OneAppPerSuite {
  "GET /api/v1/users/:id" should {
    "return 404 for missing user" in {
      val result = route(app, FakeRequest(GET, "/api/v1/users/999")).get
      status(result) mustBe NOT_FOUND
    }
  }
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for play-backend.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
