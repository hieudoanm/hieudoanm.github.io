# Review checklist

Focused reference for **rocket-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

- **`rocket::local::blocking::Client` spins an in-memory instance:**

```rust
#[test]
fn get_user_not_found() {
    let client = Client::tracked(rocket()).expect("valid rocket");
    let req = client.get("/users/999");
    let res = req.dispatch();
    assert_eq!(res.status(), Status::NotFound);
}
```

- **Fake the seams via state injection** (`manage` with a fake repo in `TestBuilder`).
- **Contract tests**: valid, not-found, bad body, unauthorized guard, method match.

---

## General Rules of Thumb

- **Routes are typed function signatures — the extractors ARE the contract.**
- **Guards (`FromRequest`) at the security/validation boundary; `State` for shared deps.**
- **`Json<T>`/`serde` through; `#[catch]` + `Responder` for uniform errors.**
- **Async handlers; `spawn_blocking` for heavy compute.**
- **`Client::tracked` tests; happy + boundary covered.**

---

## Quick-Start Checklist

- [ ] `#[launch]` + `mount` + `manage`; state registered once
- [ ] Route attributes (`#[get]`/`#[post]` + `format`/`data`) with typed extractors
- [ ] Guards (`FromRequest`) for auth/path params; `State<AppState>` for deps
- [ ] `Json<T>` / `serde` models; `#[catch]` handlers for error set
- [ ] `impl Responder` for domain errors; log at the boundary
- [ ] `Client::tracked` handler tests; contract cases incl. unauthorized
