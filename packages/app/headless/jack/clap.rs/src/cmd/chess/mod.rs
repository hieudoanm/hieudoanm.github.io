use clap::FromArgMatches;
mod com;
mod elo;
mod fen;
mod pgn;
mod play;
mod random;
mod service;
mod setup;

pub fn command() -> clap::Command {
    clap::Command::new("chess")
        .about("Chess tools and utilities")
        .subcommand_required(true)
        .subcommand(play::command())
        .subcommand(fen::command())
        .subcommand(pgn::command())
        .subcommand(elo::command())
        .subcommand(random::command())
        .subcommand(setup::command())
        .subcommand(com::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("play", m)) => play::run(&play::Args::from_arg_matches(m)?).await,
        Some(("fen", m)) => fen::run(m).await,
        Some(("pgn", m)) => pgn::run(m).await,
        Some(("elo", m)) => elo::run(&elo::Args::from_arg_matches(m)?).await,
        Some(("random", m)) => random::run(&random::Args::from_arg_matches(m)?).await,
        Some(("setup", m)) => setup::run(&setup::Args::from_arg_matches(m)?).await,
        Some(("com", m)) => com::run(m).await,
        _ => Ok(()),
    }
}
