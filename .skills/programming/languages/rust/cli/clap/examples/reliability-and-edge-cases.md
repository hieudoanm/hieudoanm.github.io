# clap.rs CLI Design Best Practices: 6. Error Handling

## Source guidance

This example applies the **6. Error Handling** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- Use `anyhow::Result` in the binary crate for ergonomic error propagation with `?`; use `thiserror` for a library crate's typed error enum if the CLI wraps a reusable library.
- Error messages should be **actionable**: say what went wrong and how to fix it (`"config file not found at ~/.config/app/config.toml — run 'app init' first"`), not just `"error: not found"`.
- Use `.context("...")` (from `anyhow`) liberally when propagating errors up through layers — bare `?` loses the caller's intent by the time the error reaches the user.

## Example

```rust
let contents = std::fs::read_to_string(&path)
    .with_context(|| format!("failed to read config at {}", path.display()))?;
```

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this reliability and edge cases example for clap-cli-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Exercise a representative boundary or failure case, such as invalid input, an unavailable dependency, or a timeout, and verify the recovery behavior.
