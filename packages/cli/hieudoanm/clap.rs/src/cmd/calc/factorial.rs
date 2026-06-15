use clap::ArgMatches;

pub fn command() -> clap::Command {
    clap::Command::new("factorial")
        .about("Compute factorial of a number (n!)")
        .arg(
            clap::Arg::new("number")
                .long("number")
                .short('n')
                .help("Non-negative integer")
                .required(true),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .help("Output in JSON format")
                .action(clap::ArgAction::SetTrue),
        )
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let number: u64 = matches.get_one::<String>("number").unwrap().parse()?;
    let json = matches.get_flag("json");

    let result: u128 = (1..=number).fold(1u128, |acc, n| acc * n as u128);

    if json {
        let output = serde_json::json!({
            "n": number,
            "factorial": result.to_string(),
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("{}", result);
    }

    Ok(())
}
