use clap::{Parser, Subcommand};
use uuid::Uuid;

/// A CLI tool with subcommands
#[derive(Parser)]
#[command(version = "1.0", about = "Utility CLI")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Generate UUIDs
    Uuid {
        /// Number of UUIDs to generate (default: 1)
        #[arg(short, long, default_value_t = 1)]
        count: u32,
    },
}

fn main() {
    let cli = Cli::parse();

    match cli.command {
        Commands::Uuid { count } => {
            for _ in 0..count {
                let new_uuid = Uuid::new_v4();
                println!("{}", new_uuid);
            }
        }
    }
}
