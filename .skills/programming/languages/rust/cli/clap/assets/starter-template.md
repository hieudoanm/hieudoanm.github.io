# clap.rs CLI Design Best Practices: Starter Template

A reusable starting point derived from the **2. Command Structure** section of [clap.rs CLI Design Best Practices](../SKILL.md). Confirm versions, placeholders, and project conventions before using it.

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

## Adapt before use

- Replace example names and values with project-approved choices.
- Preserve the constraints and edge-case handling described in the source section.
- Run the project's formatter, compiler, or parser for this file type.
