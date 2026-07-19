use clap::FromArgMatches;
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
        Some(("monitor", m)) => monitor::run(&monitor::Args::from_arg_matches(m)?).await,
        Some(("clipboard", m)) => clipboard::run(&clipboard::Args::from_arg_matches(m)?).await,
        Some(("info", m)) => info::run(&info::Args::from_arg_matches(m)?).await,
        Some(("env", m)) => env::run(&env::Args::from_arg_matches(m)?).await,
        Some(("path", m)) => path::run(&path::Args::from_arg_matches(m)?).await,
        Some(("disk", m)) => disk::run(&disk::Args::from_arg_matches(m)?).await,
        Some(("battery", m)) => battery::run(&battery::Args::from_arg_matches(m)?).await,
        _ => Ok(()),
    }
}
