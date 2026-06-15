mod battery;
mod clipboard;
mod disk;
mod env;
mod info;
mod monitor;
mod path;

pub fn command() -> clap::Command {
    clap::Command::new("system")
        .about("System monitoring and clipboard management")
        .subcommand_required(true)
        .subcommand(monitor::command())
        .subcommand(clipboard::command())
        .subcommand(info::command())
        .subcommand(env::command())
        .subcommand(path::command())
        .subcommand(disk::command())
        .subcommand(battery::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("monitor", m)) => monitor::run(m).await,
        Some(("clipboard", m)) => clipboard::run(m).await,
        Some(("info", m)) => info::run(m).await,
        Some(("env", m)) => env::run(m).await,
        Some(("path", m)) => path::run(m).await,
        Some(("disk", m)) => disk::run(m).await,
        Some(("battery", m)) => battery::run(m).await,
        _ => Ok(()),
    }
}
