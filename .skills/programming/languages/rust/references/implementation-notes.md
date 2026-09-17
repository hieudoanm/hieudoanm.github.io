# Implementation notes

Focused reference for **rust-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

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
