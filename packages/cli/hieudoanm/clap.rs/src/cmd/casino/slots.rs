use clap::ArgMatches;
use rand::Rng;

const SYMBOLS: &[&str] = &["Cherry", "Lemon", "Bell", "Diamond", "7", "BAR"];
const PAYOUTS: &[u32] = &[2, 3, 5, 10, 20, 50];

pub fn command() -> clap::Command {
    clap::Command::new("slots")
        .about("Play a slot machine")
        .arg(
            clap::Arg::new("bet")
                .help("Bet amount")
                .short('b')
                .long("bet")
                .default_value("25"),
        )
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let bet: u32 = matches
        .get_one::<String>("bet")
        .map(|s| s.parse().unwrap_or(25))
        .unwrap_or(25);

    let mut rng = rand::thread_rng();
    let reels: [usize; 3] = [
        rng.gen_range(0..SYMBOLS.len()),
        rng.gen_range(0..SYMBOLS.len()),
        rng.gen_range(0..SYMBOLS.len()),
    ];

    println!(
        "  [{}]  [{}]  [{}]",
        SYMBOLS[reels[0]], SYMBOLS[reels[1]], SYMBOLS[reels[2]]
    );

    if reels[0] == reels[1] && reels[1] == reels[2] {
        let win = bet * PAYOUTS[reels[0]];
        println!("You won ${win}!");
    } else {
        println!("No win. Try again.");
    }

    println!();
    println!("Paytable (3 of a kind):");
    for (i, sym) in SYMBOLS.iter().enumerate() {
        println!("  {sym} x3 -> ${}x bet", PAYOUTS[i]);
    }

    Ok(())
}
