#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'n', long = "number", help = "Non-negative integer")]
    pub number: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("factorial")
        .about("Compute factorial of a number (n!)")
        .arg(
            clap::Arg::new("number")
                .long("number")
                .short('n')
                .help("Non-negative integer")
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
    let number: u64 = matches.number.parse()?;
    let json = matches.json;

    let result: u128 = (1..=number).fold(1u128, |acc, n| acc * n as u128);

    if json {
        let output = serde_json::json!({
            "n": number,
            "factorial": result.to_string(),
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("{}", result);
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_factorial_zero() {
        let number: u128 = (1..=0u64).fold(1u128, |acc, n| acc * n as u128);
        assert_eq!(number, 1);
    }

    #[test]
    fn test_factorial_one() {
        let number: u128 = (1..=1u64).fold(1u128, |acc, n| acc * n as u128);
        assert_eq!(number, 1);
    }

    #[test]
    fn test_factorial_five() {
        let number: u128 = (1..=5u64).fold(1u128, |acc, n| acc * n as u128);
        assert_eq!(number, 120);
    }

    #[test]
    fn test_factorial_ten() {
        let number: u128 = (1..=10u64).fold(1u128, |acc, n| acc * n as u128);
        assert_eq!(number, 3628800);
    }

    #[test]
    fn test_factorial_twenty() {
        let number: u128 = (1..=20u64).fold(1u128, |acc, n| acc * n as u128);
        assert_eq!(number, 2432902008176640000);
    }
}
