use clap::ArgMatches;
use rand::Rng;

pub fn command() -> clap::Command {
    clap::Command::new("random")
        .about("Generate random numbers")
        .arg(
            clap::Arg::new("min")
                .long("min")
                .short('m')
                .help("Minimum value")
                .default_value("1"),
        )
        .arg(
            clap::Arg::new("max")
                .long("max")
                .short('x')
                .help("Maximum value")
                .default_value("100"),
        )
        .arg(
            clap::Arg::new("count")
                .long("count")
                .short('n')
                .help("Number of values")
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
    let min: f64 = matches.get_one::<String>("min").unwrap().parse()?;
    let max: f64 = matches.get_one::<String>("max").unwrap().parse()?;
    let count: i32 = matches
        .get_one::<String>("count")
        .unwrap()
        .parse()
        .unwrap_or(1);
    let json = matches.get_flag("json");

    let count = count.max(1);
    let mut rng = rand::thread_rng();

    let nums: Vec<f64> = (0..count)
        .map(|_| min + rng.gen::<f64>() * (max - min))
        .collect();

    if json {
        let output = serde_json::json!({
            "min": min,
            "max": max,
            "count": count,
            "values": nums,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        for v in nums {
            println!("{}", v);
        }
    }

    Ok(())
}
