---
name: hyper-best-practices
description: Best practices for building Rust HTTP applications with hyper — the low-level HTTP library conventions. Use when writing, structuring, or reviewing hyper-based services — covers Server/Client, service traits, body handling, routing, error handling, and testing.
---

# Hyper Best Practices

`hyper` is the underlying HTTP library for much of the Rust ecosystem — it gives you the **HTTP protocol (HTTP/2, client + server) while you own the composition**. Practical hyper leans on **`hyper::Server` with a `Service` implementing `call(req)`**, **typed requests/bodies (`hyper::Request`/`Response<Body>`)**, and **explicit routing/error mapping because hyper provides none of it**. It's the right choice when you need control or correctness-critical boundaries; for most products the framework layer (axum, actix-web) composes it for you.

---

## 1. Server Basics

- **`hyper::Server::bind` + `serve` (or `serve_connection`) with a `hyper::service::make_service_fn`: into full ToT proto / h1c for tests:**

```rust
let make_svc = make_service_fn(|_conn| async { Ok::<_, Infallible>(service_fn(handle)) });

let server = Server::bind(&"127.0.0.1:8080".parse()?)
    .serve(make_svc)
    .await?;
```

- **`service_fn` as the quick handle-all** — one function gets the request, returns the response:

```rust
async fn handle(req: Request<Incoming>) -> Result<Response<Body>, Infallible> {
    Ok(Response::new(Body::from("hello")))
}
```

- **`hyper::Server`/`server::conn` runs on tokio** — spawn the accept loop; graceful shutdown via `with_graceful_shutdown` on a signal channel.
- **Testing-friendly build**: construct the `Service` separately from the server so tests call the service directly.

---

## 2. The Service Trait

- **Services implement `Service<Request<T>>`; the request/response protocol is the boundary:**

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

---

## 5. Errors & Middleware

- **Errors are returned, converted at the boundary:**

```rust
enum AppError { NotFound, Invalid, Internal }

impl From<AppError> for Response<Body> {
    fn from(e: AppError) -> Self {
        match e { AppError::NotFound => status_response(StatusCode::NOT_FOUND), ... }
    }
}
```

- **Wrap services for middleware** — a `Timing`, `Auth`, `Logger` layer is a `Service` around another `Service`; keep each layer one concern.
- **Never panic in `call`** — respond with an error; the server stays up.

---

## 6. Client

- **`hyper::Client` for outbound calls:**

```rust
let client = hyper::Client::new();
let req = Request::builder().uri("http://example.com").body(Body::empty())?;
let res = client.request(req).await?;
```

- **One client per app (connection-pooled, reused); `Client::builder()` for TLS/limits explicitly.**
- **Body consumption bounded** — never `.to_bytes()` a response you then must stream.

---

## 7. Testing

- **Test the `Service` directly** (no server):

```rust
#[tokio::test]
async fn route_list_users() {
    let mut svc = App;
    let req = Request::builder().uri("/users").body(Body::empty())?;
    let res = svc.call(req).await?;
    assert_eq!(res.status(), StatusCode::OK);
}
```

- **`hyper::Server` + `tokio` integration tests** for the full path; response bodies via `to_bytes`.
- **Contract cases**: valid, not-found, bad method, malformed body, large-body limits.

---

## General Rules of Thumb

- **Hyper hands you HTTP; you own composition (routing, errors, middleware).**
- **Bodies are streams — consume once, bounded.**
- **Services implement `Service`; `poll_ready` honored; error conversions at the boundary.**
- **Routing declarative (match pairs or a tiny router); no hand-rolled parsing.**
- **Client reused/pooled; tests hit the service directly plus full-server cases.**

---

## Quick-Start Checklist

- [ ] `Server::bind` + `make_service_fn`/`service_fn`; graceful shutdown wired
- [ ] `Service` impl with `poll_ready`; `call` returns `Result<Response, _>`
- [ ] Bodies consumed via `to_bytes` bounded; streams read once
- [ ] Routing explicit (method+path match or a small router); params parsed once
- [ ] `From<AppError> for Response` at the boundary; never panic in `call`
- [ ] Middleware as service wrappers; one concern per layer
- [ ] `Service`-level tests + full-server integration; contract covered