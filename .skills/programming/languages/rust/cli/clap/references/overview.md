# Overview

Focused reference for **clap-cli-design**, excerpted from SKILL.md. The skill file remains the canonical guide.

# clap.rs CLI Design Best Practices

`clap` (Command Line Argument Parser) handles parsing, help generation, and validation. Most of it is declarative via the `derive` API — good CLI design here is mostly about which conventions you encode into that derive structure, not fighting clap's defaults.

---

## 1. Core Crates

- `clap` (with `derive` feature) — argument parsing, subcommands, help generation
- `clap_complete` — shell completion generation
- `anyhow` / `thiserror` — error handling (`anyhow` for the binary, `thiserror` for library errors)
- `owo-colors` or `anstream`/`anstyle` — terminal color that respects `NO_COLOR`/TTY automatically
- `indicatif` — progress bars and spinners
- `serde_json` / `serde_yaml` — structured output formats

```toml
[dependencies]
clap = { version = "4", features = ["derive"] }
```

---

## 2. Command Structure

- **Noun-verb or verb-noun — pick one.** `cargo add`, `cargo build` (verb-first) vs `git remote add` (noun-first). Stay consistent across your whole tree.
- **Keep nesting to 2 levels** (`app noun verb`) unless the domain truly needs more.
- Use `#[derive(Subcommand)]` enums to model the command tree — it keeps structure and help text co-located and type-checked.

```rust
#[derive(Parser)]
#[command(name = "app", version, about = "One-line description", long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Commands,

    #[arg(long, global = true, help = "Path to config file")]
    config: Option<PathBuf>,

    #[arg(short, long, global = true, help = "Enable verbose logging")]
    verbose: bool,
}

#[derive(Subcommand)]
enum Commands {
    /// Manage configuration
    Config {
        #[command(subcommand)]
        action: ConfigAction,
    },
}

#[derive(Subcommand)]
enum ConfigAction {
    /// Get a configuration value
    Get { key: String },
    /// Set a configuration value
    Set { key: String, value: String },
}
```
