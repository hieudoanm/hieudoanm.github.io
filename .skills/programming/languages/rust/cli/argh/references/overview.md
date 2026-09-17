# Overview

Focused reference for **argh-best-practices**, excerpted from SKILL.md. The skill file remains the canonical guide.

# argh Best Practices

argh is a **derive-based argument parsing library for Rust** — `#[derive(FromArgs)]` structs with `#[argh(...)]` attributes; simple, dependency-light CLIs. Practical argh leans on **`derive(FromArgs)` with `description`/`option` attributes, a top-level struct excluding `argh(example = ...)`, subcommands via `#[argh(subcommand)]`, boosted by the 1-life `from_env` pattern**, and fine-grain error handling — fewer, typed branches. When the CLI grows an ecosystem scale, consider clap; argh stays lean-by-design.

---

## 1. Basic Derive

- **FromArgs on a top-level struct then parse:**

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

- **Every field needs either `option`, `switch`, `positional`, or `subcommand`; `default` for optional.**
- **Doc comments become help text — write them as usage lines.**

---

## 2. Positionals & Switches
