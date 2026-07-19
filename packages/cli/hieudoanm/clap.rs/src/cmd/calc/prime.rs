use std::io::Write;

use super::prime_service;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'n', long = "number", help = "Number to check or limit")]
    pub number: String,
    #[arg(short = 'l', long = "list", action = clap::ArgAction::SetTrue, help = "List all primes up to N")]
    pub list: bool,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("prime")
        .about("Check if a number is prime, or generate primes up to N")
        .arg(
            clap::Arg::new("number")
                .long("number")
                .short('n')
                .help("Number to check or limit")
                .required(true),
        )
        .arg(
            clap::Arg::new("list")
                .long("list")
                .short('l')
                .help("List all primes up to N")
                .action(clap::ArgAction::SetTrue),
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
    let number: i64 = matches.number.parse()?;
    let list = matches.list;
    let json = matches.json;

    if number < 2 {
        anyhow::bail!("number must be >= 2");
    }

    if list {
        let primes = prime_service::sieve(number);
        if json {
            let output = serde_json::json!({
                "limit": number,
                "count": primes.len(),
                "primes": primes,
            });
            writeln!(write, "{}", serde_json::to_string_pretty(&output)?)?;
        } else {
            for p in primes {
                writeln!(write, "{}", p)?;
            }
        }
        return Ok(());
    }

    let is_prime = prime_service::is_prime(number);
    if json {
        let output = serde_json::json!({
            "number": number,
            "is_prime": is_prime,
        });
        writeln!(write, "{}", serde_json::to_string_pretty(&output)?)?;
    } else if is_prime {
        writeln!(write, "{} is prime", number)?;
    } else {
        writeln!(write, "{} is not prime", number)?;
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }

    #[tokio::test]
    async fn test_prime_check_json() {
        let args = Args {
            number: "17".into(),
            list: false,
            json: true,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("\"is_prime\": true"));
        assert!(output.contains("\"number\": 17"));
    }

    #[tokio::test]
    async fn test_prime_check_not_prime_json() {
        let args = Args {
            number: "15".into(),
            list: false,
            json: true,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("\"is_prime\": false"));
    }

    #[tokio::test]
    async fn test_prime_check_plain() {
        let args = Args {
            number: "7".into(),
            list: false,
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert_eq!(output.trim(), "7 is prime");
    }

    #[tokio::test]
    async fn test_prime_check_not_prime_plain() {
        let args = Args {
            number: "10".into(),
            list: false,
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert_eq!(output.trim(), "10 is not prime");
    }

    #[tokio::test]
    async fn test_prime_list_json() {
        let args = Args {
            number: "10".into(),
            list: true,
            json: true,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("\"limit\": 10"));
        assert!(output.contains("\"count\": 4"));
        assert!(output.contains("\"primes\": ["));
    }

    #[tokio::test]
    async fn test_prime_list_plain() {
        let args = Args {
            number: "10".into(),
            list: true,
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert_eq!(output.trim(), "2\n3\n5\n7");
    }

    #[tokio::test]
    async fn test_prime_number_too_small() {
        let args = Args {
            number: "1".into(),
            list: false,
            json: false,
        };
        let mut buf = vec![];
        let result = run_write(&args, &mut buf).await;
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_prime_parse_error() {
        let args = Args {
            number: "abc".into(),
            list: false,
            json: false,
        };
        let mut buf = vec![];
        let result = run_write(&args, &mut buf).await;
        assert!(result.is_err());
    }
}
