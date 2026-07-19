use clap::FromArgMatches;
mod instagram;
pub(crate) mod service;
mod shopify;
mod simplify;
mod snapshot;
mod weather;
mod youtube;

pub fn command() -> clap::Command {
    clap::Command::new("web")
        .about("Web service tools")
        .subcommand_required(true)
        .subcommand(youtube::command())
        .subcommand(instagram::command())
        .subcommand(shopify::command())
        .subcommand(simplify::command())
        .subcommand(snapshot::command())
        .subcommand(weather::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("youtube", m)) => youtube::run(m).await,
        Some(("instagram", m)) => instagram::run(m).await,
        Some(("shopify", m)) => shopify::run(m).await,
        Some(("simplify", m)) => simplify::run(m).await,
        Some(("snapshot", m)) => snapshot::run(&snapshot::Args::from_arg_matches(m)?).await,
        Some(("weather", m)) => weather::run(&weather::Args::from_arg_matches(m)?).await,
        _ => Ok(()),
    }
}
