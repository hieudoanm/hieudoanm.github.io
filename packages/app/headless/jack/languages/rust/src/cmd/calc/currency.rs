use serde::Deserialize;
use std::collections::HashMap;

#[derive(Debug, Deserialize)]
#[allow(dead_code)]
struct FrankfurterResponse {
    amount: f64,
    base: String,
    date: String,
    rates: HashMap<String, f64>,
}

#[derive(clap::Args)]
pub struct Args {
    #[arg(long = "from", default_value = "EUR", help = "Source currency")]
    pub from: String,
    #[arg(long = "to", default_value = "USD", help = "Target currency")]
    pub to: String,
    #[arg(long = "amount", default_value = "1", help = "Amount to convert")]
    pub amount: f64,
}

pub fn command() -> clap::Command {
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
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let from = &matches.from;
    let to = &matches.to;
    let amount = matches.amount;

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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
