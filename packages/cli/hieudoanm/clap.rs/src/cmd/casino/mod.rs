pub fn command() -> clap::Command {
    clap::Command::new("casino")
        .about("Casino games: blackjack, poker odds, and more")
        .subcommand_required(true)
        .subcommand(clap::Command::new("blackjack").about("Blackjack card counting"))
        .subcommand(clap::Command::new("poker").about("Poker odds calculator"))
        .subcommand(clap::Command::new("baccarat").about("Baccarat game"))
        .subcommand(clap::Command::new("slots").about("Slot machine"))
        .subcommand(clap::Command::new("coin").about("Flip a coin"))
        .subcommand(clap::Command::new("dice").about("Roll dice"))
        .subcommand(clap::Command::new("roulette").about("Roulette game"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("blackjack", _m)) => {
            println!("blackjack card counting (TUI)");
        }
        Some((name, _m)) => {
            println!("casino {name} (not yet implemented)");
        }
        _ => {}
    }
    Ok(())
}
