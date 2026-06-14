use clap::ArgMatches;

pub fn command() -> clap::Command {
    clap::Command::new("tax")
        .about("Calculate tax (placeholder)")
        .arg(
            clap::Arg::new("income")
                .help("Income amount")
                .required(true),
        )
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let income: f64 = matches
        .get_one::<String>("income")
        .unwrap()
        .parse()
        .unwrap_or(0.0);
    println!("Tax calculation for income {income:.2} (not yet implemented)");
    Ok(())
}
