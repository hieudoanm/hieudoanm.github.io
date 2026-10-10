# Hyper Best Practices: 7. Testing

## Source guidance

This example applies the **7. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Test the `Service` directly** (no server):
- **`hyper::Server` + `tokio` integration tests** for the full path; response bodies via `to_bytes`.
- **Contract cases**: valid, not-found, bad method, malformed body, large-body limits.

## Example

```rust
#[tokio::test]
async fn route_list_users() {
    let mut svc = App;
    let req = Request::builder().uri("/users").body(Body::empty())?;
    let res = svc.call(req).await?;
    assert_eq!(res.status(), StatusCode::OK);
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for hyper-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
