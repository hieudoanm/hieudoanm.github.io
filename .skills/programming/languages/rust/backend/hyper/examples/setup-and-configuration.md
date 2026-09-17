# Hyper Best Practices: 1. Server Basics

## Source guidance

This example applies the **1. Server Basics** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`hyper::Server::bind` + `serve` (or `serve_connection`) with a `hyper::service::make_service_fn`: into full ToT proto / h1c for tests:**
- **`service_fn` as the quick handle-all** — one function gets the request, returns the response:
- **`hyper::Server`/`server::conn` runs on tokio** — spawn the accept loop; graceful shutdown via `with_graceful_shutdown` on a signal channel.
- **Testing-friendly build**: construct the `Service` separately from the server so tests call the service directly.

## Example

```rust
async fn handle(req: Request<Incoming>) -> Result<Response<Body>, Infallible> {
    Ok(Response::new(Body::from("hello")))
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for hyper-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
