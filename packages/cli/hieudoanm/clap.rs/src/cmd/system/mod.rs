mod clipboard;
mod monitor;
mod stub;

pub fn command() -> clap::Command {
    clap::Command::new("system")
        .about("System monitoring and clipboard management")
        .subcommand_required(true)
        .subcommand(monitor::command())
        .subcommand(clipboard::command())
        .subcommand(stub::info_cmd())
        .subcommand(stub::env_cmd())
        .subcommand(stub::path_cmd())
        .subcommand(stub::disk_cmd())
        .subcommand(stub::battery_cmd())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("monitor", m)) => monitor::run(m).await,
        Some(("clipboard", m)) => clipboard::run(m).await,
        Some((name, m)) => stub::run(name, m).await,
        _ => Ok(()),
    }
}
