# Axum Best Practices: 10. Testing

## Source guidance

This example applies the **10. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Test with axum's test utilities:**
- **Use tower::ServiceExt for testing.**
- **Test with in-memory state or test database.**
- **Test both success and error paths.**

## Example

```rust
use axum::{
    body::Body,
    http::{Request, StatusCode},
};
use tower::ServiceExt;

#[tokio::test]
async fn test_get_user() {
    let app = create_test_app().await;

    let response = app
        .oneshot(
            Request::builder()
                .uri("/users/1")
                .body(Body::empty())
                .unwrap(),
        )
        .await
        .unwrap();

    assert_eq!(response.status(), StatusCode::OK);
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for axum-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
