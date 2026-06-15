use clap::ArgMatches;

pub fn command() -> clap::Command {
    clap::Command::new("discount")
        .about("Calculate discount and sale price")
        .arg(
            clap::Arg::new("original")
                .long("original")
                .short('o')
                .help("Original price")
                .required(true),
        )
        .arg(
            clap::Arg::new("percent")
                .long("percent")
                .short('p')
                .help("Discount percentage")
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
    let original: f64 = matches.get_one::<String>("original").unwrap().parse()?;
    let percent: f64 = matches.get_one::<String>("percent").unwrap().parse()?;
    let json = matches.get_flag("json");

    let discount = original * percent / 100.0;
    let final_price = original - discount;

    if json {
        let output = serde_json::json!({
            "original": original,
            "percent": percent,
            "discount": discount,
            "final_price": final_price,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("=== Discount Calculator ===");
        println!("Original price:  {:12.2}", original);
        println!("Discount:        {:12.2}%", percent);
        println!("You save:        {:12.2}", discount);
        println!("Final price:     {:12.2}", final_price);
    }

    Ok(())
}
