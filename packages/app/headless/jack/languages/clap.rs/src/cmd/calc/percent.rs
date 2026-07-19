use std::io::Write;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'v', long = "value", help = "Base value")]
    pub value: String,
    #[arg(short = 'o', long = "of", help = "Calculate what % value is of this")]
    pub of: Option<String>,
    #[arg(short = 'p', long = "plus", help = "Add percentage")]
    pub plus: Option<String>,
    #[arg(short = 'm', long = "minus", help = "Subtract percentage")]
    pub minus: Option<String>,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("percent")
        .about("Calculate percentages")
        .arg(
            clap::Arg::new("value")
                .long("value")
                .short('v')
                .help("Base value")
                .required(true),
        )
        .arg(
            clap::Arg::new("of")
                .long("of")
                .short('o')
                .help("Calculate what % value is of this"),
        )
        .arg(
            clap::Arg::new("plus")
                .long("plus")
                .short('p')
                .help("Add percentage"),
        )
        .arg(
            clap::Arg::new("minus")
                .long("minus")
                .short('m')
                .help("Subtract percentage"),
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
    let value: f64 = matches.value.parse()?;
    let json = matches.json;

    if let Some(of_str) = matches.of.as_ref() {
        let of: f64 = of_str.parse()?;
        let pct = value / of * 100.0;
        if json {
            let output = serde_json::json!({
                "value": value,
                "of": of,
                "percentage": pct,
                "type": "percentage_of",
            });
            writeln!(write, "{}", serde_json::to_string_pretty(&output)?)?;
        } else {
            writeln!(write, "{:.2} is {:.2}% of {:.2}", value, pct, of)?;
        }
    } else if let Some(plus_str) = matches.plus.as_ref() {
        let plus: f64 = plus_str.parse()?;
        let result = value * (1.0 + plus / 100.0);
        if json {
            let output = serde_json::json!({
                "value": value,
                "change": plus,
                "result": result,
                "type": "add_percentage",
            });
            writeln!(write, "{}", serde_json::to_string_pretty(&output)?)?;
        } else {
            writeln!(write, "{:.2} + {:.2}% = {:.2}", value, plus, result)?;
        }
    } else if let Some(minus_str) = matches.minus.as_ref() {
        let minus: f64 = minus_str.parse()?;
        let result = value * (1.0 - minus / 100.0);
        if json {
            let output = serde_json::json!({
                "value": value,
                "change": minus,
                "result": result,
                "type": "subtract_percentage",
            });
            writeln!(write, "{}", serde_json::to_string_pretty(&output)?)?;
        } else {
            writeln!(write, "{:.2} - {:.2}% = {:.2}", value, minus, result)?;
        }
    } else {
        anyhow::bail!("use --of, --plus, or --minus");
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_run_write_percentage_of_text() {
        let args = Args {
            value: "25".into(),
            of: Some("200".into()),
            plus: None,
            minus: None,
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("12.50%"));
    }

    #[tokio::test]
    async fn test_run_write_percentage_of_json() {
        let args = Args {
            value: "25".into(),
            of: Some("200".into()),
            plus: None,
            minus: None,
            json: true,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("\"percentage\": 12.5"));
    }

    #[tokio::test]
    async fn test_run_write_plus_text() {
        let args = Args {
            value: "100".into(),
            of: None,
            plus: Some("20".into()),
            minus: None,
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("120.00"));
    }

    #[tokio::test]
    async fn test_run_write_plus_json() {
        let args = Args {
            value: "200".into(),
            of: None,
            plus: Some("10".into()),
            minus: None,
            json: true,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("\"result\": 220.0"));
    }

    #[tokio::test]
    async fn test_run_write_minus_text() {
        let args = Args {
            value: "100".into(),
            of: None,
            plus: None,
            minus: Some("20".into()),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("80.00"));
    }

    #[tokio::test]
    async fn test_run_write_minus_json() {
        let args = Args {
            value: "100".into(),
            of: None,
            plus: None,
            minus: Some("15".into()),
            json: true,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("\"result\": 85.0"));
    }

    #[tokio::test]
    async fn test_run_write_no_operation_error() {
        let args = Args {
            value: "100".into(),
            of: None,
            plus: None,
            minus: None,
            json: false,
        };
        let mut buf = vec![];
        let result = run_write(&args, &mut buf).await;
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_run_write_parse_error() {
        let args = Args {
            value: "abc".into(),
            of: Some("200".into()),
            plus: None,
            minus: None,
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
