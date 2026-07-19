# http4s Best Practices: 6. Testing

## Source guidance

This example applies the **6. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`org.http4s.client.test`/`withHttpApp` on the real app; or `Request`-to-`Response` directly:**
- **Mock the `F` boundary** — repo fakes; the route test verifies HTTP shape and status mapping.
- **Contract cases**: valid, not-found, bad JSON body, invalid path param, auth rejection.

## Example

```scala
def testRoutes: HttpApp[IO] = routes.orNotFound

val resp = testRoutes(Request[IO](method = Method.GET, uri = uri"/users/1")).unsafeRunSync()
assert(resp.status == Status.Ok)
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for http4s-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
