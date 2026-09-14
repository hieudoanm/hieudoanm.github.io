use clap::FromArgMatches;
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
        Some(("age", m)) => age::run(&age::Args::from_arg_matches(m)?).await,
        Some(("clock", m)) => clock::run(m).await,
        Some(("cron", m)) => cron::run(&cron::Args::from_arg_matches(m)?).await,
        Some(("epoch", m)) => epoch::run(&epoch::Args::from_arg_matches(m)?).await,
        Some(("pomodoro", m)) => pomodoro::run(&pomodoro::Args::from_arg_matches(m)?).await,
        Some(("stopwatch", m)) => stopwatch::run(&stopwatch::Args::from_arg_matches(m)?).await,
        Some(("timer", m)) => timer::run(&timer::Args::from_arg_matches(m)?).await,
        Some(("until", m)) => until::run(&until::Args::from_arg_matches(m)?).await,
        Some(("world", m)) => world::run(&world::Args::from_arg_matches(m)?).await,
        _ => Ok(()),
    }
}
