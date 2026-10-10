# argh Best Practices: Basic Usage

Best practices for building Rust CLIs with argh — the derive-based argument parsing conventions. Use when writing, structuring, or reviewing argh — covers derive usage, from_args, subcommands, docstring help, and error handling.

## Scenario

Use this example as a starting point when applying **argh-best-practices** to a small, representative task. It demonstrates the pattern shown in the skill’s **1. Basic Derive** guidance; adapt names, configuration, and error handling to the actual project.

## Example

```rust
use argh::FromArgs;

#[derive(FromArgs)]
/// A small CLI tool.
struct Args {
    /// input file
    #[argh(option)]
    input: String,

    /// number of passes
    #[argh(option, default = "3")]
    passes: u32,
}

fn main() {
    let args: Args = argh::from_env();
    println!("{} {}", args.input, args.passes);
}
```

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
