mod age;
mod clock;
mod cron;
mod epoch;
mod pomodoro;
pub(crate) mod service;
mod stopwatch;
mod timer;
mod until;
mod world;

pub fn command() -> clap::Command {
    clap::Command::new("time")
        .about("Time and scheduling tools")
        .subcommand_required(true)
        .subcommand(age::command())
        .subcommand(clock::command())
        .subcommand(cron::command())
        .subcommand(epoch::command())
        .subcommand(pomodoro::command())
        .subcommand(stopwatch::command())
        .subcommand(timer::command())
        .subcommand(until::command())
        .subcommand(world::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("age", m)) => age::run(m).await,
        Some(("clock", m)) => clock::run(m).await,
        Some(("cron", m)) => cron::run(m).await,
        Some(("epoch", m)) => epoch::run(m).await,
        Some(("pomodoro", m)) => pomodoro::run(m).await,
        Some(("stopwatch", m)) => stopwatch::run(m).await,
        Some(("timer", m)) => timer::run(m).await,
        Some(("until", m)) => until::run(m).await,
        Some(("world", m)) => world::run(m).await,
        _ => Ok(()),
    }
}
