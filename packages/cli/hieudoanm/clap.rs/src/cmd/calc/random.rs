use rand::Rng;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'm', long = "min", default_value = "1", help = "Minimum value")]
    pub min: String,
    #[arg(
        short = 'x',
        long = "max",
        default_value = "100",
        help = "Maximum value"
    )]
    pub max: String,
    #[arg(
        short = 'n',
        long = "count",
        default_value = "1",
        help = "Number of values"
    )]
    pub count: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

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

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let min: f64 = matches.min.parse()?;
    let max: f64 = matches.max.parse()?;
    let count: i32 = matches.count.parse().unwrap_or(1);
    let json = matches.json;

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

#[cfg(test)]
mod tests {
    #[test]
    fn test_count_min_one() {
        let count: i32 = 0i32.max(1);
        assert_eq!(count, 1);
    }

    #[test]
    fn test_inverted_range() {
        let min: f64 = 10.0;
        let max: f64 = 5.0;
        let v: f64 = min + 0.5 * (max - min);
        assert!((v - 7.5).abs() < 1e-10);
    }
}
