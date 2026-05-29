pub fn command() -> clap::Command {
    clap::Command::new("blackjack")
        .about("Blackjack card counting (TUI)")
}

pub fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    println!("blackjack card counting (TUI)");
    Ok(())
}
