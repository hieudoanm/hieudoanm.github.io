mod bmi;
mod currency;
mod service;
mod stub;
mod tax;

pub fn command() -> clap::Command {
    clap::Command::new("calc")
        .about("Financial and utility calculators")
        .subcommand_required(true)
        .subcommand(bmi::command())
        .subcommand(currency::command())
        .subcommand(tax::command())
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
        Some(("bmi", m)) => bmi::run(m).await,
        Some(("currency", m)) => currency::run(m).await,
        Some(("tax", m)) => tax::run(m).await,
        Some((name, m)) => stub::run(name, m).await,
        _ => Ok(()),
    }
}
