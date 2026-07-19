# Rocket Best Practices: 6. Testing

## Source guidance

This example applies the **6. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **`rocket::local::blocking::Client` spins an in-memory instance:**
- **Fake the seams via state injection** (`manage` with a fake repo in `TestBuilder`).
- **Contract tests**: valid, not-found, bad body, unauthorized guard, method match.

## Example

```rust
#[test]
fn get_user_not_found() {
    let client = Client::tracked(rocket()).expect("valid rocket");
    let req = client.get("/users/999");
    let res = req.dispatch();
    assert_eq!(res.status(), Status::NotFound);
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for rocket-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
