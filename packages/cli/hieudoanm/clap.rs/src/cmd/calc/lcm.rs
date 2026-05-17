use std::io::Write;

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

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    run_write(matches, &mut std::io::stdout()).await
}

pub async fn run_write(matches: &Args, write: &mut impl Write) -> anyhow::Result<()> {
    let a: i64 = matches.a.parse()?;
    let b: i64 = matches.b.parse()?;
    let json = matches.json;

    let result = a / gcd(a, b) * b;

    if json {
        let output = serde_json::json!({
            "a": a,
            "b": b,
            "lcm": result,
        });
        writeln!(write, "{}", serde_json::to_string_pretty(&output)?)?;
    } else {
        writeln!(write, "{}", result)?;
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_run_write_text() {
        let args = Args {
            a: "4".into(),
            b: "6".into(),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        assert_eq!(String::from_utf8(buf).unwrap().trim(), "12");
    }

    #[tokio::test]
    async fn test_run_write_json() {
        let args = Args {
            a: "7".into(),
            b: "13".into(),
            json: true,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("\"lcm\": 91"));
    }

    #[tokio::test]
    async fn test_run_write_parse_error() {
        let args = Args {
            a: "abc".into(),
            b: "6".into(),
            json: false,
        };
        let mut buf = vec![];
        let result = run_write(&args, &mut buf).await;
        assert!(result.is_err());
    }

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
}
