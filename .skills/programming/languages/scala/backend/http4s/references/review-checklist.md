# Review checklist

Focused reference for **http4s-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

## 6. Testing

- **`org.http4s.client.test`/`withHttpApp` on the real app; or `Request`-to-`Response` directly:**

```scala
def testRoutes: HttpApp[IO] = routes.orNotFound

val resp = testRoutes(Request[IO](method = Method.GET, uri = uri"/users/1")).unsafeRunSync()
assert(resp.status == Status.Ok)
```

- **Mock the `F` boundary** — repo fakes; the route test verifies HTTP shape and status mapping.
- **Contract cases**: valid, not-found, bad JSON body, invalid path param, auth rejection.

---

## General Rules of Thumb

- **Routes are pure `F[Response]` functions; DSL extracts path/method typed.**
- **Effects in `F` everywhere; no side effects planted in handlers.**
- **`orNotFound` + middlewares compose; errors converted to status once.**
- **Typed JSON via `EntityEncoder`/`EntityDecoder`/`circe`.**
- **`httpApp`-based tests; contract + error-mapping covered.**

---

## Quick-Start Checklist

- [ ] `EmberServerBuilder` + `orNotFound`; routes in a `HttpRoutes` value
- [ ] DSL matches (`GET -> Root / ... / UUIDVar(id)`); handlers thin
- [ ] `req.as[T]` typed decode; `jsonOf` encode; errors to status in one mapper
- [ ] `F[_]` threaded; no side effects outside `F`
- [ ] Middleware composition (auth, logging) on the app
- [ ] Pooled `Client[F]` with timeouts; typed decoders
- [ ] `Request`-to-`Response` tests; contract cases incl. malformed bodies
