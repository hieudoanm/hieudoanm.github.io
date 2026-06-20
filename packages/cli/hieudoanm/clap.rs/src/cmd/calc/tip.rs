#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'b', long = "bill", help = "Bill amount")]
    pub bill: String,
    #[arg(
        short = 'p',
        long = "percent",
        default_value = "15",
        help = "Tip percentage"
    )]
    pub percent: String,
    #[arg(
        short = 's',
        long = "split",
        default_value = "1",
        help = "Number of people splitting"
    )]
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
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("=== Tip Calculator ===");
        println!("Bill:          {:12.2}", bill);
        println!("Tip %:          {:11.0}%", tip_percent);
        println!("Tip amount:    {:12.2}", tip);
        println!("Total:         {:12.2}", total);
        println!("Split:         {:12}", split);
        println!("Per person:    {:12.2}", per_person);
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_tip_calculation() {
        let bill: f64 = 100.0;
        let tip_percent: f64 = 15.0;
        let split: i32 = 1i32.max(1);
        let tip: f64 = bill * tip_percent / 100.0;
        let total: f64 = bill + tip;
        let per_person: f64 = total / split as f64;
        assert!((tip - 15.0).abs() < 1e-10);
        assert!((total - 115.0).abs() < 1e-10);
        assert!((per_person - 115.0).abs() < 1e-10);
    }

    #[test]
    fn test_split_bill() {
        let bill: f64 = 100.0;
        let tip_percent: f64 = 10.0;
        let split: i32 = 4i32.max(1);
        let tip: f64 = bill * tip_percent / 100.0;
        let total: f64 = bill + tip;
        let per_person: f64 = total / split as f64;
        assert!((tip - 10.0).abs() < 1e-10);
        assert!((total - 110.0).abs() < 1e-10);
        assert!((per_person - 27.5).abs() < 1e-10);
    }

    #[test]
    fn test_split_min_one() {
        let split: i32 = 0i32.max(1);
        assert_eq!(split, 1);
    }

    #[test]
    fn test_tip_zero_percent() {
        let bill: f64 = 50.0;
        let tip_percent: f64 = 0.0;
        let tip: f64 = bill * tip_percent / 100.0;
        let total: f64 = bill + tip;
        assert!((tip - 0.0).abs() < 1e-10);
        assert!((total - 50.0).abs() < 1e-10);
    }
}
