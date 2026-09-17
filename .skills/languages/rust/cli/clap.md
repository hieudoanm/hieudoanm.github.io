---
name: clap-cli-design
description: Best practices for building well-designed command-line tools with clap (Rust). Use when creating, structuring, or reviewing a clap-based CLI app — covers command structure, arguments, help text, output, and error conventions with suggested values.
---

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

Doc comments (`///`) on variants/fields become the help text automatically — write them as real sentences, not restatements of the field name.

---

## 3. Arguments & Flags

| Convention                    | Rule                                                                                                                                           |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Long form                     | Always provide (`--verbose`); derive from field name automatically via kebab-case conversion                                                   |
| Short form                    | `#[arg(short)]` only for frequent flags (`-v`, `-o`, `-f`, `-n`)                                                                               |
| Booleans                      | Default `false`, phrase as affirmative (`--force`), use `ArgAction::SetTrue`                                                                   |
| Positional vs flag            | Positional (`key: String`) for the "main subject" of the command; flags for options/modifiers                                                  |
| Enums for constrained choices | Use `#[arg(value_enum)]` with a Rust enum instead of a free `String` + manual validation — clap generates the choice list in `--help` for free |
| Global flags                  | `#[arg(global = true)]` on the top-level `Cli` struct for things like `--verbose`/`--config` that should apply to every subcommand             |

```rust
#[derive(clap::ValueEnum, Clone)]
enum OutputFormat {
    Table,
    Json,
    Yaml,
}

#[arg(short, long, value_enum, default_value_t = OutputFormat::Table)]
output: OutputFormat,
```

---

## 4. Help Text

- `about` / `#[command(about = "...")]`: one line, no trailing period.
- `long_about`: a real paragraph if the tool needs more context than the one-liner.
- **Always add examples** — clap doesn't auto-generate an `Examples:` section, so add one manually via `#[command(after_help = "...")]`:

```rust
#[command(after_help = "Examples:\n  app config get api.endpoint\n  app config get --output json api.endpoint")]
```

- Use `#[arg(required = true)]` / `ArgGroup` for mutually exclusive or required-together flags instead of validating manually after parsing — clap produces a correctly worded usage error automatically.

---

## 5. Output Conventions

| Rule                     | Detail                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Human output → stdout    | Always                                                                                                                                                  |
| Errors/warnings → stderr | Always                                                                                                                                                  |
| Structured output flag   | Support `--output`/`-o` with `table` (default), `json`, `yaml` variants for scripting/CI                                                                |
| Exit codes               | `0` success, `1` generic failure; use `std::process::ExitCode` for typed exit codes rather than raw `std::process::exit(n)` scattered through the code  |
| Color                    | Use `anstream`/`anstyle` (or `owo-colors` with `.if_supports_color()`) — auto-disables on non-TTY and respects `NO_COLOR` without manual detection code |
| Quiet/verbose            | Support `-q`/`--quiet` and `-v`/`--verbose` (clap supports counted flags: `#[arg(short, action = ArgAction::Count)] verbose: u8` for `-vvv`)            |

```rust
use std::process::ExitCode;

fn main() -> ExitCode {
    match run() {
        Ok(()) => ExitCode::SUCCESS,
        Err(e) => {
            eprintln!("error: {e:#}");
            ExitCode::FAILURE
        }
    }
}
```

---

## 6. Error Handling

- Use `anyhow::Result` in the binary crate for ergonomic error propagation with `?`; use `thiserror` for a library crate's typed error enum if the CLI wraps a reusable library.
- Error messages should be **actionable**: say what went wrong and how to fix it (`"config file not found at ~/.config/app/config.toml — run 'app init' first"`), not just `"error: not found"`.
- Use `.context("...")` (from `anyhow`) liberally when propagating errors up through layers — bare `?` loses the caller's intent by the time the error reaches the user.

```rust
let contents = std::fs::read_to_string(&path)
    .with_context(|| format!("failed to read config at {}", path.display()))?;
```

---

## 7. Progress & Feedback

- Any operation >300ms: use `indicatif::ProgressBar` (determinate) or a spinner (indeterminate) — silent hangs read as broken.
- Respect `--quiet` to suppress progress bars in scripted/CI contexts (check `!std::io::stdout().is_terminal()` too).
- Confirm destructive actions interactively (e.g. via `dialoguer::Confirm`) unless `--force`/`--yes` is passed.

---

## 8. Shell Completion & Docs

- Generate completions via `clap_complete::generate()` for bash/zsh/fish/powershell — wire this up as a hidden `app completion <shell>` subcommand; expected from any modern Rust CLI.
- Consider `clap_mangen` to generate man pages from the same `Command` definition, keeping `--help` and man pages in sync automatically.

---

## 9. General Rules of Thumb

- **Consistency beats cleverness** — match conventions from `cargo`, `git`, `kubectl` where applicable; users transfer muscle memory.
- **Prefer `value_enum` over free-string validation** wherever the set of valid values is known ahead of time — better help text and error messages for free.
- **Version flag always present** — `#[command(version)]` on the derive struct pulls from `Cargo.toml` automatically, don't hardcode it separately.
- **Idempotent by default** where possible — re-running shouldn't error just because desired state already exists.

---

## Quick-Start Checklist

- [ ] Consistent noun-verb or verb-noun structure across the whole tree
- [ ] Doc comments on every command/subcommand (become help text)
- [ ] `after_help` examples added for non-trivial commands
- [ ] Constrained choices use `value_enum`, not free strings
- [ ] `--output`/`-o` supports at least `table` and `json`
- [ ] Errors go to stderr via `eprintln!`, human output to stdout
- [ ] Color via `anstream`/`anstyle`, respecting `NO_COLOR` and TTY detection
- [ ] `anyhow::Result` + `.context()` used for error propagation
- [ ] Destructive commands require confirmation or `--force`
- [ ] Shell completion wired up via `clap_complete`
- [ ] `#[command(version)]` present
