# Rust Best Practices: Starter Template

A reusable starting point derived from the **3. Error Handling** section of [Rust Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```rust
#[derive(thiserror::Error, Debug)]
pub enum ConfigError {
    #[error("config file not found at {0}")]
    NotFound(PathBuf),
    #[error("failed to parse config: {0}")]
    ParseError(#[from] toml::de::Error),
}
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
