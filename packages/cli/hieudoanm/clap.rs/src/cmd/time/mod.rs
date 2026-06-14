mod clock;
mod pomodoro;
pub(crate) mod service;
mod stub;

pub fn command() -> clap::Command {
    clap::Command::new("time")
        .about("Time and scheduling tools")
        .subcommand_required(true)
        .subcommand(clock::command())
        .subcommand(pomodoro::command())
        .subcommands(stub::commands())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("clock", m)) => clock::run(m).await,
        Some(("pomodoro", m)) => pomodoro::run(m).await,
        Some((name, m)) => stub::run(name, m).await,
        _ => Ok(()),
    }
}
