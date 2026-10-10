# WinterJS Best Practices: Starter Template

A reusable starting point derived from the **3. Deployment & Config** section of [WinterJS Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```toml
[package] name = "my-app"      # wasmer deploy runs the WinterJS server
[[routes]] glob = "**" -> "http://localhost:3000"
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
