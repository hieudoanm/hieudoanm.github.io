# argh Best Practices: Starter Template

A reusable starting point derived from the **1. Basic Derive** section of [argh Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
