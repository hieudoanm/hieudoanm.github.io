use std::io::Write;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'o', long = "original", help = "Original price")]
    pub original: String,
    #[arg(short = 'p', long = "percent", help = "Discount percentage")]
    pub percent: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("discount")
        .about("Calculate discount and sale price")
        .arg(
            clap::Arg::new("original")
                .long("original")
                .short('o')
                .help("Original price")
                .required(true),
        )
        .arg(
            clap::Arg::new("percent")
                .long("percent")
                .short('p')
                .help("Discount percentage")
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
    let original: f64 = matches.original.parse()?;
    let percent: f64 = matches.percent.parse()?;
    let json = matches.json;

    let discount = original * percent / 100.0;
    let final_price = original - discount;

    if json {
        let output = serde_json::json!({
            "original": original,
            "percent": percent,
            "discount": discount,
            "final_price": final_price,
        });
        writeln!(write, "{}", serde_json::to_string_pretty(&output)?)?;
    } else {
        writeln!(write, "=== Discount Calculator ===")?;
        writeln!(write, "Original price:  {:12.2}", original)?;
        writeln!(write, "Discount:        {:12.2}%", percent)?;
        writeln!(write, "You save:        {:12.2}", discount)?;
        writeln!(write, "Final price:     {:12.2}", final_price)?;
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_discount_calculation() {
        let original: f64 = 100.0;
        let percent: f64 = 20.0;
        let discount: f64 = original * percent / 100.0;
        let final_price: f64 = original - discount;
        assert!((discount - 20.0).abs() < 1e-10);
        assert!((final_price - 80.0).abs() < 1e-10);
    }

    #[test]
    fn test_discount_zero_percent() {
        let original: f64 = 50.0;
        let percent: f64 = 0.0;
        let discount: f64 = original * percent / 100.0;
        let final_price: f64 = original - discount;
        assert!((discount - 0.0).abs() < 1e-10);
        assert!((final_price - 50.0).abs() < 1e-10);
    }

    #[test]
    fn test_discount_hundred_percent() {
        let original: f64 = 100.0;
        let percent: f64 = 100.0;
        let discount: f64 = original * percent / 100.0;
        let final_price: f64 = original - discount;
        assert!((discount - 100.0).abs() < 1e-10);
        assert!((final_price - 0.0).abs() < 1e-10);
    }

    #[test]
    fn test_discount_rounding() {
        let original: f64 = 99.99;
        let percent: f64 = 33.33;
        let discount: f64 = original * percent / 100.0;
        let final_price: f64 = original - discount;
        assert!((final_price - 66.66).abs() < 0.01);
    }

    #[tokio::test]
    async fn test_run_write_text() {
        let args = Args {
            original: "100".into(),
            percent: "20".into(),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("You save:"));
        assert!(output.contains("80"));
    }

    #[tokio::test]
    async fn test_run_write_json() {
        let args = Args {
            original: "200".into(),
            percent: "15".into(),
            json: true,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("\"original\": 200.0"));
        assert!(output.contains("\"final_price\": 170.0"));
    }

    #[tokio::test]
    async fn test_run_write_parse_error() {
        let args = Args {
            original: "abc".into(),
            percent: "20".into(),
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
