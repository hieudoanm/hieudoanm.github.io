use serde::Deserialize;
use std::collections::HashMap;

#[derive(Debug, Deserialize)]
#[allow(dead_code)]
pub struct FrankfurterResponse {
    pub amount: f64,
    pub base: String,
    pub date: String,
    pub rates: HashMap<String, f64>,
}

pub fn command() -> clap::Command {
    clap::Command::new("calc")
        .about("Financial and utility calculators")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("currency")
                .about("Currency conversion using Frankfurter API")
                .arg(
                    clap::Arg::new("from")
                        .long("from")
                        .default_value("EUR")
                        .help("Source currency"),
                )
                .arg(
                    clap::Arg::new("to")
                        .long("to")
                        .default_value("USD")
                        .help("Target currency"),
                )
                .arg(
                    clap::Arg::new("amount")
                        .long("amount")
                        .default_value("1")
                        .value_parser(clap::value_parser!(f64))
                        .help("Amount to convert"),
                ),
        )
        .subcommand(
            clap::Command::new("tax")
                .about("Calculate tax (placeholder)")
                .arg(
                    clap::Arg::new("income")
                        .help("Income amount")
                        .required(true),
                ),
        )
        .subcommand(
            clap::Command::new("bmi")
                .about("Calculate Body Mass Index")
                .arg(
                    clap::Arg::new("weight")
                        .long("weight")
                        .help("Weight in kg")
                        .required(true),
                )
                .arg(
                    clap::Arg::new("height")
                        .long("height")
                        .help("Height in cm")
                        .required(true),
                ),
        )
        .subcommand(clap::Command::new("compound").about("Compound interest calculator"))
        .subcommand(clap::Command::new("loan").about("Loan payment calculator"))
        .subcommand(clap::Command::new("discount").about("Discount calculator"))
        .subcommand(clap::Command::new("tip").about("Tip calculator"))
        .subcommand(clap::Command::new("base").about("Number base conversion"))
        .subcommand(clap::Command::new("unit").about("Unit conversion"))
        .subcommand(clap::Command::new("percent").about("Percentage calculator"))
        .subcommand(clap::Command::new("mortgage").about("Mortgage calculator"))
        .subcommand(clap::Command::new("datecalc").about("Date arithmetic"))
        .subcommand(clap::Command::new("eval").about("Evaluate math expression"))
        .subcommand(clap::Command::new("stats").about("Statistical calculations"))
        .subcommand(clap::Command::new("factorial").about("Factorial calculator"))
        .subcommand(clap::Command::new("random").about("Random number generator"))
        .subcommand(clap::Command::new("prime").about("Prime number tools"))
        .subcommand(clap::Command::new("gcd").about("Greatest common divisor"))
        .subcommand(clap::Command::new("lcm").about("Least common multiple"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("currency", sub_m)) => {
            run_currency(sub_m).await?;
        }
        Some(("bmi", sub_m)) => {
            let weight: f64 = sub_m
                .get_one::<String>("weight")
                .unwrap()
                .parse()
                .unwrap_or(0.0);
            let height: f64 = sub_m
                .get_one::<String>("height")
                .unwrap()
                .parse()
                .unwrap_or(0.0);
            if height > 0.0 {
                let bmi = weight / ((height / 100.0) * (height / 100.0));
                println!("BMI: {bmi:.1}");
            } else {
                anyhow::bail!("height must be > 0");
            }
        }
        Some(("tax", sub_m)) => {
            let income: f64 = sub_m
                .get_one::<String>("income")
                .unwrap()
                .parse()
                .unwrap_or(0.0);
            println!("Tax calculation for income {income:.2} (not yet implemented)");
        }
        Some((name, _m)) => {
            println!("calc {name} (not yet implemented)");
        }
        _ => {}
    }
    Ok(())
}

async fn run_currency(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let from = matches.get_one::<String>("from").unwrap();
    let to = matches.get_one::<String>("to").unwrap();
    let amount = *matches.get_one::<f64>("amount").unwrap();

    let url = format!("https://api.frankfurter.app/latest?base={from}&symbols={to}");
    let resp = reqwest::get(&url).await?;
    let response: FrankfurterResponse = resp.json().await?;

    let rate = response
        .rates
        .get(to)
        .ok_or_else(|| anyhow::anyhow!("no rate found for {to}"))?;

    let converted = amount * rate;
    println!("{amount:.2} {from} = {converted:.2} {to}");
    Ok(())
}
