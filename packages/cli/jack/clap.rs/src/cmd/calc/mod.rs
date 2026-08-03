use clap::FromArgMatches;
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
        Some(("age", m)) => age::run(&age::Args::from_arg_matches(m)?).await,
        Some(("base", m)) => base::run(&base::Args::from_arg_matches(m)?).await,
        Some(("bmi", m)) => bmi::run(&bmi::Args::from_arg_matches(m)?).await,
        Some(("compound", m)) => compound::run(&compound::Args::from_arg_matches(m)?).await,
        Some(("currency", m)) => currency::run(&currency::Args::from_arg_matches(m)?).await,
        Some(("datecalc", m)) => datecalc::run(&datecalc::Args::from_arg_matches(m)?).await,
        Some(("discount", m)) => discount::run(&discount::Args::from_arg_matches(m)?).await,
        Some(("eval", m)) => eval::run(&eval::Args::from_arg_matches(m)?).await,
        Some(("factorial", m)) => factorial::run(&factorial::Args::from_arg_matches(m)?).await,
        Some(("gcd", m)) => gcd::run(&gcd::Args::from_arg_matches(m)?).await,
        Some(("lcm", m)) => lcm::run(&lcm::Args::from_arg_matches(m)?).await,
        Some(("loan", m)) => loan::run(&loan::Args::from_arg_matches(m)?).await,
        Some(("mortgage", m)) => mortgage::run(&mortgage::Args::from_arg_matches(m)?).await,
        Some(("percent", m)) => percent::run(&percent::Args::from_arg_matches(m)?).await,
        Some(("prime", m)) => prime::run(&prime::Args::from_arg_matches(m)?).await,
        Some(("random", m)) => random::run(&random::Args::from_arg_matches(m)?).await,
        Some(("stats", m)) => stats::run(&stats::Args::from_arg_matches(m)?).await,
        Some(("tax", m)) => tax::run(&tax::Args::from_arg_matches(m)?).await,
        Some(("tip", m)) => tip::run(&tip::Args::from_arg_matches(m)?).await,
        Some(("unit", m)) => unit::run(&unit::Args::from_arg_matches(m)?).await,
        _ => Ok(()),
    }
}
