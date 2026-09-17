# Rust Best Practices: 5. Testing

## Source guidance

This example applies the **5. Testing** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Unit tests in the same file**, in a `#[cfg(test)] mod tests` block — standard convention, keeps tests next to the code they cover:
- **Integration tests in `tests/`** — these only see the crate's public API, good for catching API design issues unit tests miss.
- **`#[should_panic]`** for tests asserting a panic path; prefer testing `Result::Err` variants directly where the code returns `Result` instead of panicking.
- **Property-based testing** (`proptest` or `quickcheck`) for functions with a large input space (parsers, serialization round-trips) — catches edge cases example-based tests miss.

## Example

This excerpt is from the cited **5. Testing** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this testing and validation example for rust-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Run the focused checks in CI and add at least one negative or boundary assertion for this path.
