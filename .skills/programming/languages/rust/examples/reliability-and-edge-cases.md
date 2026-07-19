# Rust Best Practices: 3. Error Handling

## Source guidance

This example applies the **3. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Libraries: `thiserror`** for a typed, structured error enum callers can match on:
- **Binaries/applications: `anyhow`** for ergonomic propagation when callers don't need to match on error variants, just report them:
- **`unwrap()`/`expect()` are for genuine invariants only** (a `Mutex` that can't actually be poisoned in your design, a regex compiled from a string literal you control) — never on I/O, parsing, or anything driven by external input. Use `expect("message explaining why this can't fail")` over bare `unwrap()` so a future panic is diagnosable.

## Example

This excerpt is from the cited **3. Error Handling** section.

```rust
#[derive(thiserror::Error, Debug)]
pub enum ConfigError {
    #[error("config file not found at {0}")]
    NotFound(PathBuf),
    #[error("failed to parse config: {0}")]
    ParseError(#[from] toml::de::Error),
}
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for rust-best-practices.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
