# clap.rs CLI Design Best Practices: Basic Usage

Best practices for building well-designed command-line tools with clap (Rust). Use when creating, structuring, or reviewing a clap-based CLI app — covers command structure, arguments, help text, output, and error conventions with suggested values.

## Scenario

Use this example as a starting point when applying **clap-cli-design** to a small, representative task. It demonstrates the pattern shown in the skill’s **2. Command Structure** guidance; adapt names, configuration, and error handling to the actual project.

## Example

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

## What to notice

- Follow the skill’s guidance for the relevant setup and version requirements.
- Treat this as a focused pattern, not a complete production implementation.
- Validate behavior and handle errors, security, and operational needs appropriate to the project.

## Source

Excerpted from [SKILL.md](../SKILL.md).
