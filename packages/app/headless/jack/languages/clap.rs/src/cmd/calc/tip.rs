use std::io::Write;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'b', long = "bill", help = "Bill amount")]
    pub bill: String,
    #[arg(short = 'p', long = "percent", default_value = "15", help = "Tip percentage")]
    pub percent: String,
    #[arg(short = 's', long = "split", default_value = "1", help = "Number of people splitting")]
    pub split: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("tip")
        .about("Calculate tip and split bill")
        .arg(
            clap::Arg::new("bill")
                .long("bill")
                .short('b')
                .help("Bill amount")
                .required(true),
        )
        .arg(
            clap::Arg::new("percent")
                .long("percent")
                .short('p')
                .help("Tip percentage")
                .default_value("15"),
        )
        .arg(
            clap::Arg::new("split")
                .long("split")
                .short('s')
                .help("Number of people splitting")
                .default_value("1"),
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
    let bill: f64 = matches.bill.parse()?;
    let tip_percent: f64 = matches.percent.parse()?;
    let split: i32 = matches.split.parse().unwrap_or(1);
    let json = matches.json;

    let split = split.max(1);
    let tip = bill * tip_percent / 100.0;
    let total = bill + tip;
    let per_person = total / split as f64;

    if json {
        let output = serde_json::json!({
            "bill": bill,
            "tip_percent": tip_percent,
            "tip": tip,
            "total": total,
            "split": split,
            "per_person": per_person,
        });
        writeln!(write, "{}", serde_json::to_string_pretty(&output)?)?;
    } else {
        writeln!(write, "=== Tip Calculator ===")?;
        writeln!(write, "Bill:          {:12.2}", bill)?;
        writeln!(write, "Tip %:          {:11.0}%", tip_percent)?;
        writeln!(write, "Tip amount:    {:12.2}", tip)?;
        writeln!(write, "Total:         {:12.2}", total)?;
        writeln!(write, "Split:         {:12}", split)?;
        writeln!(write, "Per person:    {:12.2}", per_person)?;
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_run_write_text() {
        let args = Args {
            bill: "100".into(),
            percent: "15".into(),
            split: "1".into(),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("Tip amount:"));
        assert!(output.contains("15.00"));
        assert!(output.contains("115.00"));
    }

    #[tokio::test]
    async fn test_run_write_json() {
        let args = Args {
            bill: "200".into(),
            percent: "10".into(),
            split: "4".into(),
            json: true,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("\"tip\": 20.0"));
        assert!(output.contains("\"per_person\": 55.0"));
    }

    #[tokio::test]
    async fn test_run_write_split_min_one() {
        let args = Args {
            bill: "100".into(),
            percent: "15".into(),
            split: "0".into(),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("Split:"));
        assert!(output.lines().any(|l| l.trim().ends_with('1')));
    }

    #[tokio::test]
    async fn test_run_write_parse_error() {
        let args = Args {
            bill: "abc".into(),
            percent: "15".into(),
            split: "1".into(),
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
