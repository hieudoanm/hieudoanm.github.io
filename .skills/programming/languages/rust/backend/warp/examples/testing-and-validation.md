# Warp Best Practices: 6. Testing

## Source guidance

This example applies the **6. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`warp::test::request()` — no server needed:**
- **Test individual filters and the full composition**; `RequestBuilder.reply` gives the HTTP contract.
- **Fake state/repo injected via the `warp::any().map` seam.
- **Contract cases**: valid, not-found, bad param, wrong method, rejection mapping.

## Example

```rust
let response = warp::test::request()
    .path("/users/1")
    .reply(&routes)
    .await;
assert_eq!(response.status(), StatusCode::OK);
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for warp-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
