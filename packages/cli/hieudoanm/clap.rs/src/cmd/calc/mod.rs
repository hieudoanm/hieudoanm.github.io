mod age;
mod base;
mod bmi;
mod compound;
mod currency;
mod datecalc;
mod discount;
mod eval;
mod eval_service;
mod factorial;
mod gcd;
mod lcm;
mod loan;
mod mortgage;
mod percent;
mod prime;
mod prime_service;
mod random;
mod service;
mod stats;
mod tax;
mod tip;
mod unit;
mod unit_service;

pub fn command() -> clap::Command {
    clap::Command::new("calc")
        .about("Financial and utility calculators")
        .subcommand_required(true)
        .subcommand(age::command())
        .subcommand(base::command())
        .subcommand(bmi::command())
        .subcommand(compound::command())
        .subcommand(currency::command())
        .subcommand(datecalc::command())
        .subcommand(discount::command())
        .subcommand(eval::command())
        .subcommand(factorial::command())
        .subcommand(gcd::command())
        .subcommand(lcm::command())
        .subcommand(loan::command())
        .subcommand(mortgage::command())
        .subcommand(percent::command())
        .subcommand(prime::command())
        .subcommand(random::command())
        .subcommand(stats::command())
        .subcommand(tax::command())
        .subcommand(tip::command())
        .subcommand(unit::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("age", m)) => age::run(m).await,
        Some(("base", m)) => base::run(m).await,
        Some(("bmi", m)) => bmi::run(m).await,
        Some(("compound", m)) => compound::run(m).await,
        Some(("currency", m)) => currency::run(m).await,
        Some(("datecalc", m)) => datecalc::run(m).await,
        Some(("discount", m)) => discount::run(m).await,
        Some(("eval", m)) => eval::run(m).await,
        Some(("factorial", m)) => factorial::run(m).await,
        Some(("gcd", m)) => gcd::run(m).await,
        Some(("lcm", m)) => lcm::run(m).await,
        Some(("loan", m)) => loan::run(m).await,
        Some(("mortgage", m)) => mortgage::run(m).await,
        Some(("percent", m)) => percent::run(m).await,
        Some(("prime", m)) => prime::run(m).await,
        Some(("random", m)) => random::run(m).await,
        Some(("stats", m)) => stats::run(m).await,
        Some(("tax", m)) => tax::run(m).await,
        Some(("tip", m)) => tip::run(m).await,
        Some(("unit", m)) => unit::run(m).await,
        _ => Ok(()),
    }
}
