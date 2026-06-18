use clap::ArgMatches;
use rand::Rng;

const SYMBOLS: &[&str] = &["Cherry", "Lemon", "Bell", "Diamond", "7", "BAR"];
const PAYOUTS: &[u32] = &[2, 3, 5, 10, 20, 50];

pub fn symbol_count() -> usize {
    SYMBOLS.len()
}

pub fn symbol_name(index: usize) -> &'static str {
    SYMBOLS[index % SYMBOLS.len()]
}

pub fn payout_multiplier(index: usize) -> u32 {
    PAYOUTS[index % PAYOUTS.len()]
}

pub fn is_jackpot(reels: &[usize; 3]) -> bool {
    reels[0] == reels[1] && reels[1] == reels[2]
}

pub fn calculate_win(bet: u32, reels: &[usize; 3]) -> u32 {
    if is_jackpot(reels) {
        bet * PAYOUTS[reels[0]]
    } else {
        0
    }
}

pub fn format_reels(reels: &[usize; 3]) -> String {
    format!(
        "  [{}]  [{}]  [{}]",
        SYMBOLS[reels[0]], SYMBOLS[reels[1]], SYMBOLS[reels[2]]
    )
}

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

    println!("{}", format_reels(&reels));

    let win = calculate_win(bet, &reels);
    if win > 0 {
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_symbol_count() {
        assert_eq!(symbol_count(), 6);
    }

    #[test]
    fn test_symbol_name_known() {
        assert_eq!(symbol_name(0), "Cherry");
        assert_eq!(symbol_name(5), "BAR");
    }

    #[test]
    fn test_symbol_name_wraps() {
        assert_eq!(symbol_name(6), "Cherry");
    }

    #[test]
    fn test_payout_multiplier() {
        assert_eq!(payout_multiplier(0), 2);
        assert_eq!(payout_multiplier(5), 50);
    }

    #[test]
    fn test_is_jackpot_all_same() {
        assert!(is_jackpot(&[2, 2, 2]));
    }

    #[test]
    fn test_is_jackpot_not_all_same() {
        assert!(!is_jackpot(&[0, 1, 2]));
        assert!(!is_jackpot(&[3, 3, 4]));
    }

    #[test]
    fn test_calculate_win_jackpot() {
        assert_eq!(calculate_win(25, &[0, 0, 0]), 50);
        assert_eq!(calculate_win(10, &[3, 3, 3]), 100);
    }

    #[test]
    fn test_calculate_win_no_jackpot() {
        assert_eq!(calculate_win(25, &[0, 1, 2]), 0);
        assert_eq!(calculate_win(25, &[5, 5, 4]), 0);
    }

    #[test]
    fn test_format_reels() {
        assert_eq!(format_reels(&[0, 1, 2]), "  [Cherry]  [Lemon]  [Bell]");
        assert_eq!(format_reels(&[5, 5, 5]), "  [BAR]  [BAR]  [BAR]");
    }

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[tokio::test]
    async fn test_run() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["slots", "--bet", "100"])
            .unwrap();
        run(&m).await.unwrap();
    }

    #[tokio::test]
    async fn test_run_default_bet() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["slots"])
            .unwrap();
        run(&m).await.unwrap();
    }
}
