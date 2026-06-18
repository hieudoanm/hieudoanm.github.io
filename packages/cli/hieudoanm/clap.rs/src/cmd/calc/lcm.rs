use clap::ArgMatches;

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

pub fn command() -> clap::Command {
    clap::Command::new("lcm")
        .about("Least common multiple of two numbers")
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

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let a: i64 = matches.get_one::<String>("a").unwrap().parse()?;
    let b: i64 = matches.get_one::<String>("b").unwrap().parse()?;
    let json = matches.get_flag("json");

    let result = a / gcd(a, b) * b;

    if json {
        let output = serde_json::json!({
            "a": a,
            "b": b,
            "lcm": result,
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
    fn test_lcm_formula() {
        let a: i64 = 4;
        let b: i64 = 6;
        let result = a / gcd(a, b) * b;
        assert_eq!(result, 12);
    }

    #[test]
    fn test_lcm_formula_coprime() {
        let a: i64 = 7;
        let b: i64 = 13;
        let result = a / gcd(a, b) * b;
        assert_eq!(result, 91);
    }

    #[test]
    fn test_lcm_formula_same() {
        let a: i64 = 10;
        let b: i64 = 10;
        let result = a / gcd(a, b) * b;
        assert_eq!(result, 10);
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
            .try_get_matches_from(vec!["lcm", "--a", "12", "--b", "8"])
            .unwrap();
        run(&m).await.unwrap();
    }

    #[tokio::test]
    async fn test_run_json() {
        let cmd = command();
        let m = cmd
            .try_get_matches_from(vec!["lcm", "--a", "7", "--b", "13", "--json"])
            .unwrap();
        run(&m).await.unwrap();
    }
}
