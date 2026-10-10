# Gotham Best Practices: 6. Testing

## Source guidance

This example applies the **6. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Unit-test handlers via builder-injected routers / request fixtures:**
- **Contract cases**: valid, not-found, bad input, invalid method, missing param.

## Example

```rust
#[tokio::test]
async fn get_user_returns_not_found() {
    let app = router();
    let req = HyperClient::get("http://test/users/999");
    ...
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for gotham-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
