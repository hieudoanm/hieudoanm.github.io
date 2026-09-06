use std::io::Write;

use super::unit_service;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'v', long = "value", help = "Value to convert")]
    pub value: String,
    #[arg(short = 'f', long = "from", help = "Source unit")]
    pub from: String,
    #[arg(short = 't', long = "to", help = "Target unit")]
    pub to: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("unit")
        .about("Convert between units (length, weight, temp, speed)")
        .arg(
            clap::Arg::new("value")
                .long("value")
                .short('v')
                .help("Value to convert")
                .required(true),
        )
        .arg(
            clap::Arg::new("from")
                .long("from")
                .short('f')
                .help("Source unit")
                .required(true),
        )
        .arg(
            clap::Arg::new("to")
                .long("to")
                .short('t')
                .help("Target unit")
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
    let value: f64 = matches.value.parse()?;
    let from = &matches.from;
    let to = &matches.to;
    let json = matches.json;

    match unit_service::convert(value, from, to) {
        Ok(r) => {
            if json {
                let output = serde_json::json!({
                    "value": r.value,
                    "from": r.from,
                    "to": r.to,
                    "result": r.result,
                    "category": r.category,
                });
                writeln!(write, "{}", serde_json::to_string_pretty(&output)?)?;
            } else {
                writeln!(write, "{} {} = {} {}", r.value, r.from, r.result, r.to)?;
            }
        }
        Err(e) => anyhow::bail!("{}", e),
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_run_write_text() {
        let args = Args {
            value: "100".into(),
            from: "cm".into(),
            to: "m".into(),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert_eq!(output.trim(), "100 cm = 1 m");
    }

    #[tokio::test]
    async fn test_run_write_json() {
        let args = Args {
            value: "1".into(),
            from: "km".into(),
            to: "m".into(),
            json: true,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("\"result\": 1000.0"));
    }

    #[tokio::test]
    async fn test_run_write_parse_error() {
        let args = Args {
            value: "abc".into(),
            from: "cm".into(),
            to: "m".into(),
            json: false,
        };
        let mut buf = vec![];
        let result = run_write(&args, &mut buf).await;
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_run_write_conversion_error() {
        let args = Args {
            value: "100".into(),
            from: "cm".into(),
            to: "kg".into(),
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
