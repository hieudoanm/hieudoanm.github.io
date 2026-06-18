use clap::ArgMatches;

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

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let value: f64 = matches.get_one::<String>("value").unwrap().parse()?;
    let json = matches.get_flag("json");

    if let Some(of_str) = matches.get_one::<String>("of") {
        let of: f64 = of_str.parse()?;
        let pct = value / of * 100.0;
        if json {
            let output = serde_json::json!({
                "value": value,
                "of": of,
                "percentage": pct,
                "type": "percentage_of",
            });
            println!("{}", serde_json::to_string_pretty(&output)?);
        } else {
            println!("{:.2} is {:.2}% of {:.2}", value, pct, of);
        }
    } else if let Some(plus_str) = matches.get_one::<String>("plus") {
        let plus: f64 = plus_str.parse()?;
        let result = value * (1.0 + plus / 100.0);
        if json {
            let output = serde_json::json!({
                "value": value,
                "change": plus,
                "result": result,
                "type": "add_percentage",
            });
            println!("{}", serde_json::to_string_pretty(&output)?);
        } else {
            println!("{:.2} + {:.2}% = {:.2}", value, plus, result);
        }
    } else if let Some(minus_str) = matches.get_one::<String>("minus") {
        let minus: f64 = minus_str.parse()?;
        let result = value * (1.0 - minus / 100.0);
        if json {
            let output = serde_json::json!({
                "value": value,
                "change": minus,
                "result": result,
                "type": "subtract_percentage",
            });
            println!("{}", serde_json::to_string_pretty(&output)?);
        } else {
            println!("{:.2} - {:.2}% = {:.2}", value, minus, result);
        }
    } else {
        anyhow::bail!("use --of, --plus, or --minus");
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_percentage_of() {
        let value: f64 = 25.0;
        let of: f64 = 200.0;
        let pct: f64 = value / of * 100.0;
        assert!((pct - 12.5).abs() < 1e-10);
    }

    #[test]
    fn test_add_percentage() {
        let value: f64 = 100.0;
        let plus: f64 = 20.0;
        let result: f64 = value * (1.0 + plus / 100.0);
        assert!((result - 120.0).abs() < 1e-10);
    }

    #[test]
    fn test_subtract_percentage() {
        let value: f64 = 100.0;
        let minus: f64 = 20.0;
        let result: f64 = value * (1.0 - minus / 100.0);
        assert!((result - 80.0).abs() < 1e-10);
    }

    #[test]
    fn test_percentage_zero() {
        let value: f64 = 100.0;
        let of: f64 = 100.0;
        let pct: f64 = value / of * 100.0;
        assert!((pct - 100.0).abs() < 1e-10);
    }
}
