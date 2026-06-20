fn gcd(a: i64, b: i64) -> i64 {
    let mut a = a.abs();
    let mut b = b.abs();
    while b != 0 {
        let t = b;
        b = a % b;
        a = t;
    }
    a
}

#[derive(clap::Args)]
pub struct Args {
    #[arg(long = "a", help = "First number")]
    pub a: String,
    #[arg(long = "b", help = "Second number")]
    pub b: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("gcd")
        .about("Greatest common divisor of two numbers")
        .arg(
            clap::Arg::new("a")
                .long("a")
                .help("First number")
                .required(true),
        )
        .arg(
            clap::Arg::new("b")
                .long("b")
                .help("Second number")
                .required(true),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let a: i64 = matches.a.parse()?;
    let b: i64 = matches.b.parse()?;
    let json = matches.json;

    let result = gcd(a, b);

    if json {
        let output = serde_json::json!({
            "a": a,
            "b": b,
            "gcd": result,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("{}", result);
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use clap::FromArgMatches;

    #[test]
    fn test_gcd_positive() {
        assert_eq!(gcd(12, 8), 4);
    }

    #[test]
    fn test_gcd_coprime() {
        assert_eq!(gcd(7, 13), 1);
    }

    #[test]
    fn test_gcd_same_number() {
        assert_eq!(gcd(10, 10), 10);
    }

    #[test]
    fn test_gcd_one_zero() {
        assert_eq!(gcd(0, 5), 5);
    }

    #[test]
    fn test_gcd_both_zero() {
        assert_eq!(gcd(0, 0), 0);
    }

    #[test]
    fn test_gcd_negative() {
        assert_eq!(gcd(-12, 8), 4);
    }

    #[test]
    fn test_gcd_large_numbers() {
        assert_eq!(gcd(123456, 7890), 6);
    }

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[tokio::test]
    async fn test_run_basic() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["gcd", "--a", "12", "--b", "8"])
            .unwrap();
        run(&Args::from_arg_matches(&m).unwrap()).await.unwrap();
    }

    #[tokio::test]
    async fn test_run_json() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["gcd", "--a", "7", "--b", "13", "--json"])
            .unwrap();
        run(&Args::from_arg_matches(&m).unwrap()).await.unwrap();
    }
}
