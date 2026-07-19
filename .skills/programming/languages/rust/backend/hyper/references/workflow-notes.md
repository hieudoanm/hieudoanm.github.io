# Workflow notes

Focused reference for **hyper-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

```rust
struct App;
impl Service<Request<Incoming>> for App {
    type Response = Response<Body>;
    type Error = Infallible;
    type Future = Pin<Box<dyn Future<Output = Result<Self::Response, Self::Error>> + Send>>;
    fn poll_ready(&mut self, _: &mut Context<'_>) -> Poll<Result<(), Self::Error>> { Poll::Ready(Ok(())) }
    fn call(&mut self, req: Request<Incoming>) -> Self::Future { Box::pin(async move { handle(req).await }) }
}
```

- **`poll_ready` is org-mandatory for backpressure-aware services** (hyper respects readiness).
- **Handle-all via `service_fn` for small cases; a struct `Service` for stateful/layered ones.**

---

## 3. Requests, Bodies & Extractors

- **Bodies are async streams — consume once, effectively:**

```rust
let body = hyper::body::to_bytes(req.into_body()).await?;   // bounded read
let parsed: Json = serde_json::from_slice(&body)?;
```

- **`hyper::body::to_bytes`/`aggregate` when a full body is needed; use a `framed`/chunked read for streaming payloads** — a full-body read of a 10 GB upload is a resource bug.
- **Path/query extraction is your job** — `req.uri().path()`, parse segments manually or via a helper; keep extraction at the boundary.
- **Response body `Frame<Bytes>`/`Body`** — construct from bytes, `Full`, or stream.

---

## 4. Routing (Hand-Rolled)

- **Hyper has no router — add one explicitly:**

```rust
fn route(req: &Request<Incoming>) -> Result<RouteAction, AppError> {
    match (req.method(), req.uri().path()) {
        (&Method::GET, "/users") => Ok(RouteAction::List),
        (&Method::GET, p) if p.starts_with("/users/") => Ok(RouteAction::Get(parse_id(p))),
        _ => Err(AppError::NotFound),
    }
}
```

- **Match on `(method, path)` pairs; parse params once; unknown → `404`/`405` uniformly.**
- **Use a small router crate (`matchit`, `route-recognizer`)** for anything beyond flat tables — hand-rolled path parsing is where routing bugs hide.
