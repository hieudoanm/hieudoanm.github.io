mod service;
mod stub;

pub fn command() -> clap::Command {
    clap::Command::new("casino")
        .about("Casino games: blackjack, poker odds, and more")
        .subcommand_required(true)
        .subcommand(stub::blackjack_cmd())
        .subcommand(stub::poker_cmd())
        .subcommand(stub::baccarat_cmd())
        .subcommand(stub::slots_cmd())
        .subcommand(stub::coin_cmd())
        .subcommand(stub::dice_cmd())
        .subcommand(stub::roulette_cmd())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some((name, m)) = matches.subcommand() {
        stub::run(name, m).await
    } else {
        Ok(())
    }
}
