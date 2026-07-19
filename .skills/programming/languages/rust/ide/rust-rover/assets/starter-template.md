# RustRover: Starter Template

A reusable starting point derived from the **2. Cargo Project Model** section of [RustRover](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

```toml
# rust-toolchain.toml
[toolchain]
channel = "stable"
components = ["rustfmt", "clippy", "llvm-tools"]
targets = ["x86_64-unknown-linux-gnu"]
profile = "minimal"
```

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
