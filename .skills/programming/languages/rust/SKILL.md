---
name: rust-best-practices
description: Idiomatic Rust best practices covering project structure, error handling, ownership/borrowing, traits, testing, and tooling. Use when writing, structuring, or reviewing Rust code.
---

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

## 3. Error Handling

- **Libraries: `thiserror`** for a typed, structured error enum callers can match on:

```rust
#[derive(thiserror::Error, Debug)]
pub enum ConfigError {
    #[error("config file not found at {0}")]
    NotFound(PathBuf),
    #[error("failed to parse config: {0}")]
    ParseError(#[from] toml::de::Error),
}
```

- **Binaries/applications: `anyhow`** for ergonomic propagation when callers don't need to match on error variants, just report them:

```rust
fn load_config(path: &Path) -> anyhow::Result<Config> {
    let contents = std::fs::read_to_string(path)
        .with_context(|| format!("reading config at {}", path.display()))?;
    toml::from_str(&contents).context("parsing config")
}
```

- **`unwrap()`/`expect()` are for genuine invariants only** (a `Mutex` that can't actually be poisoned in your design, a regex compiled from a string literal you control) — never on I/O, parsing, or anything driven by external input. Use `expect("message explaining why this can't fail")` over bare `unwrap()` so a future panic is diagnosable.
- **`?` operator everywhere else** — don't manually `match` and re-wrap when `?` (plus `From`/`#[from]` conversions) does it cleanly.

---

## 4. Traits & Generics

- **Prefer trait objects (`dyn Trait`) for heterogeneous collections or plugin-style extensibility; generics (`impl Trait` / `<T: Trait>`) for performance-sensitive monomorphized code.** Default to generics unless you specifically need dynamic dispatch or to store different types in one collection.
- **`impl Trait` in argument position** (`fn process(items: impl Iterator<Item = i32>)`) for simple cases; named generic parameters when you need to reference the type elsewhere in the signature or bound multiple parameters together.
- **Derive over hand-writing:** `#[derive(Debug, Clone, PartialEq)]` etc. — only hand-implement a trait when the derived behavior is actually wrong for your type.
- **Newtype pattern** (`struct UserId(u64);`) over raw primitives for domain concepts — catches mixing up IDs at compile time for free.

---

## 5. Testing

- **Unit tests in the same file**, in a `#[cfg(test)] mod tests` block — standard convention, keeps tests next to the code they cover:

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_valid_input() {
        assert_eq!(parse("42").unwrap(), 42);
    }

    #[test]
    fn rejects_empty_input() {
        assert!(parse("").is_err());
    }
}
```

- **Integration tests in `tests/`** — these only see the crate's public API, good for catching API design issues unit tests miss.
- **`#[should_panic]`** for tests asserting a panic path; prefer testing `Result::Err` variants directly where the code returns `Result` instead of panicking.
- **Property-based testing** (`proptest` or `quickcheck`) for functions with a large input space (parsers, serialization round-trips) — catches edge cases example-based tests miss.
- **`cargo nextest`** as a faster, better-output test runner if the project has grown beyond a handful of tests.

---

## 6. Tooling (Non-negotiable)

- **`cargo fmt`** on save/pre-commit — like `gofmt`, there's no style debate to have.
- **`cargo clippy`** in CI, treat warnings as errors (`clippy::all` at minimum) — catches idiomatic issues (`needless_clone`, `redundant_closure`, etc.) that compile fine but aren't good Rust.
- **`cargo check`** for fast iteration during development instead of full `cargo build`.
- **`cargo audit`** in CI for dependency vulnerability scanning.
- **`cargo deny`** if you need license/dependency policy enforcement across a larger project.

---

## 7. API Design

- **Builder pattern** for structs with many optional fields, instead of a constructor with a dozen positional arguments:

```rust
Server::builder()
    .addr("0.0.0.0:8080")
    .timeout(Duration::from_secs(30))
    .build()?
```

- **`From`/`TryFrom`** over ad-hoc `fn from_x(...) -> Self` constructors — integrates with `?` and generic code expecting standard conversions.
- **Keep public API surface minimal** — `pub(crate)` for anything only used internally across modules, private by default, only widen visibility when a real external caller needs it.
- **Document public items** with `///` doc comments including a runnable example where feasible — `cargo test` runs doc examples automatically, so they stay correct.

---

## 8. General Rules of Thumb

- **Work with the borrow checker, not around it.** If you're fighting it constantly, the data ownership design usually needs rethinking, not more `clone()`/`unsafe`.
- **`unsafe` is a deliberate, documented exception**, not a shortcut — every `unsafe` block should have a comment explaining the invariant that makes it sound.
- **Avoid premature `Arc<Mutex<T>>` for concurrency** — reach for it when you actually have shared mutable state across threads, not as a default pattern for anything that might one day be concurrent.
- **Small, focused crates over one monolithic module** in larger projects — compile times and clarity both benefit.

---

## Quick-Start Checklist

- [ ] Function signatures borrow (`&str`, `&[T]`) rather than own, unless ownership is genuinely needed
- [ ] `thiserror` for library error types, `anyhow` for application-level propagation
- [ ] No unexplained `unwrap()`/`expect()` on I/O or external input
- [ ] `#[derive(...)]` used instead of hand-written trait impls where behavior matches
- [ ] Unit tests co-located in `#[cfg(test)] mod tests`, integration tests in `tests/`
- [ ] `cargo fmt` + `cargo clippy` (deny warnings) running in CI
- [ ] `cargo audit` checked for dependency vulnerabilities
- [ ] Public API surface kept minimal (`pub(crate)` used deliberately)
- [ ] Every `unsafe` block has a comment justifying its safety invariant
