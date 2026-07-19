# clap.rs CLI Design Best Practices: 2. Command Structure

## Source guidance

This example applies the **2. Command Structure** section of [SKILL.md](../SKILL.md). Use the excerpt as a pattern and adapt project-specific names, versions, validation, and error handling.

- **Noun-verb or verb-noun — pick one.** `cargo add`, `cargo build` (verb-first) vs `git remote add` (noun-first). Stay consistent across your whole tree.
- **Keep nesting to 2 levels** (`app noun verb`) unless the domain truly needs more.
- Use `#[derive(Subcommand)]` enums to model the command tree — it keeps structure and help text co-located and type-checked.
Doc comments (`///`) on variants/fields become the help text automatically — write them as real sentences, not restatements of the field name.

## Example

This excerpt is from the cited **2. Command Structure** section.

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

## Apply it

- Confirm that the project version, runtime, and conventions match the assumptions in this setup and configuration example for clap-cli-design.
- Replace sample identifiers and settings with project-owned values; keep credentials and environment-specific secrets out of committed files.
- Validate the configuration with the toolchain used in CI, then verify a clean install or startup using the target environment.
