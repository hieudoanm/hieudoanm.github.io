# Axum Best Practices: Basic Usage

Best practices for building Rust web services with Axum — the ergonomic web framework built on Tokio. Use when writing, structuring, or reviewing Axum — covers routing, extractors, state, error handling, middleware, and testing.

## Scenario

Use this example as a starting point when applying **axum-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Core Stack** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```toml
[dependencies]
axum = "0.7"
tokio = { version = "1", features = ["full"] }
tower = "0.4"
tower-http = { version = "0.5", features = ["cors", "trace"] }
sqlx = { version = "0.7", features = ["postgres", "runtime-tokio"] }
serde = { version = "1", features = ["derive"] }
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
