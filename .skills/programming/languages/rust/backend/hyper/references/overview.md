# Overview

Focused reference for **hyper-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
