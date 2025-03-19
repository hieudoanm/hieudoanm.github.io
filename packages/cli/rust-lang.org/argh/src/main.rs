use argh::FromArgs;
use uuid::Uuid;

/// Simple CLI tool with subcommands
#[derive(FromArgs)]
struct Cli {
    #[argh(subcommand)]
    command: Commands,
}

/// Available subcommands
#[derive(FromArgs)]
#[argh(subcommand)]
enum Commands {
    Uuid(UuidCommand),
}

/// Generate UUIDs
#[derive(FromArgs)]
#[argh(subcommand, name = "uuid", description = "Generate UUIDs")]
struct UuidCommand {
    /// number of UUIDs to generate (default: 1)
    #[argh(option, short = 'c', default = "1")]
    count: u32,
}

fn main() {
    let cli: Cli = argh::from_env();

    match cli.command {
        Commands::Uuid(cmd) => {
            for _ in 0..cmd.count {
                println!("{}", Uuid::new_v4());
            }
        }
    }
}
