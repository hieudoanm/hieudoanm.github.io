# Rust Best Practices: Basic Usage

Idiomatic Rust best practices covering project structure, error handling, ownership/borrowing, traits, testing, and tooling. Use when writing, structuring, or reviewing Rust code.

## Scenario

Use this example as a starting point when applying **rust-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **3. Error Handling** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```rust
#[derive(thiserror::Error, Debug)]
pub enum ConfigError {
    #[error("config file not found at {0}")]
    NotFound(PathBuf),
    #[error("failed to parse config: {0}")]
    ParseError(#[from] toml::de::Error),
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
