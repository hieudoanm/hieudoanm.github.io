use clap::ArgMatches;
use rand::Rng;

const WHEEL: &[u32] = &[
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20,
    14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

pub fn wheel_size() -> usize {
    WHEEL.len()
}

pub fn wheel_number_at(index: usize) -> u32 {
    WHEEL[index % WHEEL.len()]
}

pub fn wheel_color(n: u32) -> &'static str {
    match n {
        0 => "Green",
        1 | 3 | 5 | 7 | 9 | 12 | 14 | 16 | 18 | 19 | 21 | 23 | 25 | 27 | 30 | 32 | 34 | 36 => {
            "Red"
        }
        _ => "Black",
    }
}

pub fn wheel_parity(n: u32) -> &'static str {
    if n == 0 {
        "Neither"
    } else if n % 2 == 0 {
        "Even"
    } else {
        "Odd"
    }
}

pub fn wheel_half(n: u32) -> &'static str {
    if n == 0 || n > 18 {
        "19-36"
    } else {
        "1-18"
    }
}

pub fn format_spin_result(n: u32) -> String {
    format!(
        "{} ({}, {}, {})",
        n,
        wheel_color(n),
        wheel_parity(n),
        wheel_half(n)
    )
}

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
        let n = wheel_number_at(rng.gen_range(0..WHEEL.len()));

        if spins == 1 {
            println!("{}", format_spin_result(n));
        } else {
            println!("  {:2}. {}", i + 1, format_spin_result(n));
        }
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_wheel_size() {
        assert_eq!(wheel_size(), 37);
    }

    #[test]
    fn test_wheel_number_at_specific_indices() {
        assert_eq!(wheel_number_at(0), 0);
        assert_eq!(wheel_number_at(1), 32);
        assert_eq!(wheel_number_at(36), 26);
    }

    #[test]
    fn test_wheel_number_at_wraps() {
        assert_eq!(wheel_number_at(37), 0);
        assert_eq!(wheel_number_at(38), 32);
    }

    #[test]
    fn test_wheel_color_green() {
        assert_eq!(wheel_color(0), "Green");
    }

    #[test]
    fn test_wheel_color_red() {
        assert_eq!(wheel_color(32), "Red");
        assert_eq!(wheel_color(36), "Red");
        assert_eq!(wheel_color(1), "Red");
        assert_eq!(wheel_color(19), "Red");
    }

    #[test]
    fn test_wheel_color_black() {
        assert_eq!(wheel_color(15), "Black");
        assert_eq!(wheel_color(26), "Black");
        assert_eq!(wheel_color(2), "Black");
        assert_eq!(wheel_color(11), "Black");
    }

    #[test]
    fn test_wheel_parity_zero() {
        assert_eq!(wheel_parity(0), "Neither");
    }

    #[test]
    fn test_wheel_parity_even() {
        assert_eq!(wheel_parity(32), "Even");
    }

    #[test]
    fn test_wheel_parity_odd() {
        assert_eq!(wheel_parity(15), "Odd");
    }

    #[test]
    fn test_wheel_half_zero() {
        assert_eq!(wheel_half(0), "19-36");
    }

    #[test]
    fn test_wheel_half_low() {
        assert_eq!(wheel_half(15), "1-18");
    }

    #[test]
    fn test_wheel_half_high() {
        assert_eq!(wheel_half(19), "19-36");
    }

    #[test]
    fn test_format_spin_result() {
        assert_eq!(format_spin_result(0), "0 (Green, Neither, 19-36)");
        assert_eq!(format_spin_result(1), "1 (Red, Odd, 1-18)");
        assert_eq!(format_spin_result(2), "2 (Black, Even, 1-18)");
        assert_eq!(format_spin_result(32), "32 (Red, Even, 19-36)");
    }

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[tokio::test]
    async fn test_run_single_spin() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["roulette", "--spins", "1"])
            .unwrap();
        run(&m).await.unwrap();
    }
}
