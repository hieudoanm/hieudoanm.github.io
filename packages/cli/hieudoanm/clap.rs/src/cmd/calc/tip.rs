use clap::ArgMatches;

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

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let bill: f64 = matches.get_one::<String>("bill").unwrap().parse()?;
    let tip_percent: f64 = matches.get_one::<String>("percent").unwrap().parse()?;
    let split: i32 = matches
        .get_one::<String>("split")
        .unwrap()
        .parse()
        .unwrap_or(1);
    let json = matches.get_flag("json");

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
