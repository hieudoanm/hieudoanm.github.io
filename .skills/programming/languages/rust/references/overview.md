# Overview

Focused reference for **rust-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# Rust Best Practices

Rust's compiler already enforces memory safety and a huge class of bugs — "best practice" here is mostly about working _with_ the ownership model instead of fighting it with excessive `clone()`/`Rc<RefCell<>>`, and following the ecosystem's strong conventions around errors, traits, and module layout.

---

## 1. Project Structure

```txt
myapp/
├── Cargo.toml
├── src/
│   ├── main.rs          # thin entrypoint (binaries)
│   ├── lib.rs           # public API surface (if also a library)
│   ├── config.rs
│   ├── server/
│   │   ├── mod.rs
│   │   └── handlers.rs
│   └── error.rs         # centralized error types
├── tests/                # integration tests (black-box, use the public API)
└── benches/              # benchmarks (criterion)
```

- **Binary + library split:** if a binary has any reusable logic, put it in `lib.rs` and have `main.rs` just call into it — makes integration testing and future reuse trivial.
- **Workspaces** (`[workspace]` in a root `Cargo.toml`) for multi-crate projects — split by genuine boundary (core logic vs CLI vs FFI bindings), not arbitrarily.
- Module names: `snake_case`, matching file/directory names.

---

## 2. Ownership & Borrowing

- **Borrow by default; own only when you must.** Take `&str` over `String`, `&[T]` over `Vec<T>` in function signatures unless the function needs to store or mutate the data.
- **Don't reach for `clone()` to silence the borrow checker** without understanding why it's complaining first — often a lifetime annotation, restructuring, or `Cow<'_, T>` solves it more cheaply.
- **`Rc<RefCell<T>>` is a last resort**, not a default pattern for shared mutable state — usually a sign the ownership model of the data hasn't been thought through. Prefer passing `&mut` through a clear call chain, or restructuring with message-passing (channels) for concurrent cases.
- **Lifetimes:** let elision handle the common cases; only write explicit lifetime parameters when the compiler actually requires them — don't annotate defensively.

---
