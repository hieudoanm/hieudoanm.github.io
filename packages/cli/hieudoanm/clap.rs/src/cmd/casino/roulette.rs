use clap::ArgMatches;
use rand::Rng;

const WHEEL: &[u32] = &[
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20,
    14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

pub fn command() -> clap::Command {
    clap::Command::new("roulette")
        .about("Spin the roulette wheel")
        .arg(
            clap::Arg::new("spins")
                .help("Number of spins")
                .short('n')
                .long("spins")
                .default_value("1"),
        )
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let spins: usize = matches
        .get_one::<String>("spins")
        .map(|s| s.parse().unwrap_or(1))
        .unwrap_or(1);

    let mut rng = rand::thread_rng();

    for i in 0..spins {
        let n = WHEEL[rng.gen_range(0..WHEEL.len())];
        let color = if n == 0 {
            "Green"
        } else if n % 2 == 0 {
            "Red"
        } else {
            "Black"
        };
        let parity = if n == 0 {
            "Neither"
        } else if n % 2 == 0 {
            "Even"
        } else {
            "Odd"
        };
        let half = if n > 18 { "19-36" } else { "1-18" };

        if spins == 1 {
            println!("{n} ({color}, {parity}, {half})");
        } else {
            println!("  {:2}. {n} ({color}, {parity}, {half})", i + 1);
        }
    }

    Ok(())
}
