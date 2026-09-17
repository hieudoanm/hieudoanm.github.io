# RustRover: Basic Usage

Best practices for working in RustRover — Cargo as the project model, rustup toolchain selection, borrow-checker-aware inspections, the debugger and profiling, and JetBrains shared conventions. Use when setting up, debugging, or refactoring a Rust project in RustRover.

## Scenario

Use this example as a starting point when applying **rust-rover-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Cargo Project Model** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```toml
# rust-toolchain.toml
[toolchain]
channel = "stable"
components = ["rustfmt", "clippy", "llvm-tools"]
targets = ["x86_64-unknown-linux-gnu"]
profile = "minimal"
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
