use std::io::Write;

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
    run_write(matches, &mut std::io::stdout()).await
}

pub async fn run_write(matches: &Args, write: &mut impl Write) -> anyhow::Result<()> {
    let number: u64 = matches.number.parse()?;
    let json = matches.json;

    let result: u128 = (1..=number).fold(1u128, |acc, n| acc * n as u128);

    if json {
        let output = serde_json::json!({
            "n": number,
            "factorial": result.to_string(),
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
            number: "5".into(),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert_eq!(output.trim(), "120");
    }

    #[tokio::test]
    async fn test_run_write_json() {
        let args = Args {
            number: "6".into(),
            json: true,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("\"n\": 6"));
        assert!(output.contains("\"factorial\": \"720\""));
    }

    #[tokio::test]
    async fn test_run_write_zero() {
        let args = Args {
            number: "0".into(),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert_eq!(output.trim(), "1");
    }

    #[tokio::test]
    async fn test_run_write_parse_error() {
        let args = Args {
            number: "abc".into(),
            json: false,
        };
        let mut buf = vec![];
        let result = run_write(&args, &mut buf).await;
        assert!(result.is_err());
    }

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
