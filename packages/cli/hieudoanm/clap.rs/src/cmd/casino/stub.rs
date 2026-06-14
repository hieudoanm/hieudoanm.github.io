use clap::ArgMatches;

macro_rules! stub_cmd {
    ($name:expr, $about:expr) => {
        clap::Command::new($name).about($about)
    };
}

pub fn blackjack_cmd() -> clap::Command {
    stub_cmd!("blackjack", "Blackjack card counting")
}
pub fn poker_cmd() -> clap::Command {
    stub_cmd!("poker", "Poker odds calculator")
}
pub fn baccarat_cmd() -> clap::Command {
    stub_cmd!("baccarat", "Baccarat game")
}
pub fn slots_cmd() -> clap::Command {
    stub_cmd!("slots", "Slot machine")
}
pub fn coin_cmd() -> clap::Command {
    stub_cmd!("coin", "Flip a coin")
}
pub fn dice_cmd() -> clap::Command {
    stub_cmd!("dice", "Roll dice")
}
pub fn roulette_cmd() -> clap::Command {
    stub_cmd!("roulette", "Roulette game")
}

pub async fn run(name: &str, _matches: &ArgMatches) -> anyhow::Result<()> {
    println!("{name} (not yet implemented)");
    Ok(())
}
