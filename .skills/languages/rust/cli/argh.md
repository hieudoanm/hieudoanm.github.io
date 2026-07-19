---
name: argh-best-practices
description: Best practices for building Rust CLIs with argh — the derive-based argument parsing conventions. Use when writing, structuring, or reviewing argh — covers derive usage, from_args, subcommands, docstring help, and error handling.
---

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

- **Positionals mapped by order; switches for flags:**

```rust
#[derive(FromArgs)]
struct Args {
    /// script to run
    #[argh(positional)]
    script: String,

    /// verbose mode
    #[argh(switch)]
    verbose: bool,
}
```

- **`switch` only for booleans; use `option` + `default` for value-togglable.**
- **`str`/owned types; define enums with `FromStr` where a constrained set fits.**

---

## 3. Subcommands

- **A generated enum through `#[argh(subcommand)]`:**

```rust
#[derive(FromArgs)]
struct Args {
    #[argh(subcommand)]
    cmd: Cmd,
}

#[derive(FromArgs)]
#[argh(subcommand)]
enum Cmd {
    Add(AddArgs),
    List(ListArgs),
}
```

- **Subcommand variant structs carry their own `FromArgs`-derived fields + docs.**
- **Help per subcommand is automatic; `description` attributes word the top-level synopsis.**

---

## 4. Errors & Exit Codes

- **`argh::from_env()` panics on parse failure with argh's exit — acceptable for lean CLIs:**

```rust
match Args::from_args(&["cli"], &env::args_os().collect::<Vec<_>>()) {
    Ok(args) => run(args),
    Err(err) => { eprintln!("{err}"); std::process::exit(1); }
}
```

- **Graceful exits: map parse errors to stderr + status; keep program errors separate.**
- **Test parsing via `FromArgs::from_args` against fixture arg slices.**

---

## 5. Testing & Docs

- **Unit-test the parse layer — fixed arg vectors:**

```rust
#[test]
fn parses_passes() {
    let args = Args::from_args(&["cli"], &["--input", "x", "--passes", "4"]);
    assert_eq!(args.passes, 4);
}
```

- **Doc comments are the help — review `--help` output as a contract.**
- **Keep CLI surface small: opt-outs become subcommands, not flags all.**

---

## 6. Warnings / Migration

- **argh is intentionally minimal (no generated help styling, minimal validation):**
- **Migrate to clap when: 50+ flags, dynamic completions, complex validations, or mature help UX.**
- **Pin `argh` version in Cargo; feature-gate with other derives sparingly.**

---

## General Rules of Thumb

- **`derive(FromArgs)` with doc-comment help.**
- **Field attributes explicit: option/switch/positional/subcommand.**
- **Nested subcommands via enum + `description`.**
- **Graceful error/exit for parse; tests via `from_args` slices.**
- **Lean by design; migrate to clap at scale.**

---

## Quick-Start Checklist

- [ ] `#[derive(FromArgs)]` top struct; doc comments as help
- [ ] Every field has an `argh` attribute; defaults for optional
- [ ] Subcommands via generated `#[argh(subcommand)]` enum
- [ ] `from_env` or graceful `from_args` error handling
- [ ] Parse-layer unit tests (`FromArgs::from_args` fixtures)
- [ ] Version pinned; `--help` output reviewed as contract