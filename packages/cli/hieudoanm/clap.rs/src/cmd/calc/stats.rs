use clap::ArgMatches;

pub fn command() -> clap::Command {
    clap::Command::new("stats")
        .about("Statistical summary of numbers")
        .arg(
            clap::Arg::new("values")
                .long("values")
                .short('v')
                .help("Comma-separated numbers")
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
    let values_str = matches.get_one::<String>("values").unwrap();
    let json = matches.get_flag("json");

    let mut nums: Vec<f64> = values_str
        .split(',')
        .map(|s| s.trim().parse::<f64>())
        .collect::<Result<Vec<_>, _>>()?;

    if nums.is_empty() {
        anyhow::bail!("no values provided");
    }

    nums.sort_by(|a, b| a.partial_cmp(b).unwrap());
    let n = nums.len();
    let sum: f64 = nums.iter().sum();
    let mean = sum / n as f64;
    let min = nums[0];
    let max = nums[n - 1];

    let median = if n % 2 == 0 {
        (nums[n / 2 - 1] + nums[n / 2]) / 2.0
    } else {
        nums[n / 2]
    };

    let variance = nums
        .iter()
        .map(|v| {
            let d = v - mean;
            d * d
        })
        .sum::<f64>()
        / n as f64;
    let stddev = variance.sqrt();

    if json {
        let output = serde_json::json!({
            "count": n,
            "min": min,
            "max": max,
            "sum": sum,
            "mean": mean,
            "median": median,
            "stddev": stddev,
        });
        println!("{}", serde_json::to_string_pretty(&output)?);
    } else {
        println!("count:  {}", n);
        println!("min:    {}", min);
        println!("max:    {}", max);
        println!("sum:    {}", sum);
        println!("mean:   {}", mean);
        println!("median: {}", median);
        println!("stddev: {}", stddev);
    }

    Ok(())
}
