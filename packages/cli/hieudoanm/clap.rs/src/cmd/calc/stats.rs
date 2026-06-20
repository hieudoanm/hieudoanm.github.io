#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'v', long = "values", help = "Comma-separated numbers")]
    pub values: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

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

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let values_str = &matches.values;
    let json = matches.json;

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

#[cfg(test)]
mod tests {
    #[test]
    fn test_stats_mean() {
        let nums: Vec<f64> = vec![1.0, 2.0, 3.0, 4.0, 5.0];
        let sum: f64 = nums.iter().sum();
        let mean: f64 = sum / nums.len() as f64;
        assert!((mean - 3.0).abs() < 1e-10);
    }

    #[test]
    fn test_stats_median_odd() {
        let mut nums: Vec<f64> = vec![5.0, 1.0, 3.0, 2.0, 4.0];
        nums.sort_by(|a, b| a.partial_cmp(b).unwrap());
        let n = nums.len();
        let median: f64 = nums[n / 2];
        assert!((median - 3.0).abs() < 1e-10);
    }

    #[test]
    fn test_stats_median_even() {
        let mut nums: Vec<f64> = vec![1.0, 2.0, 3.0, 4.0];
        nums.sort_by(|a, b| a.partial_cmp(b).unwrap());
        let n = nums.len();
        let median: f64 = (nums[n / 2 - 1] + nums[n / 2]) / 2.0;
        assert!((median - 2.5).abs() < 1e-10);
    }

    #[test]
    fn test_stats_min_max() {
        let mut nums: Vec<f64> = vec![3.0, 1.0, 4.0, 1.0, 5.0];
        nums.sort_by(|a, b| a.partial_cmp(b).unwrap());
        let n = nums.len();
        let min: f64 = nums[0];
        let max: f64 = nums[n - 1];
        assert!((min - 1.0).abs() < 1e-10);
        assert!((max - 5.0).abs() < 1e-10);
    }

    #[test]
    fn test_stats_variance_and_stddev() {
        let nums: Vec<f64> = vec![2.0, 4.0, 4.0, 4.0, 5.0, 5.0, 7.0, 9.0];
        let n = nums.len();
        let sum: f64 = nums.iter().sum();
        let mean: f64 = sum / n as f64;
        let variance: f64 = nums
            .iter()
            .map(|v| {
                let d = v - mean;
                d * d
            })
            .sum::<f64>()
            / n as f64;
        let stddev: f64 = variance.sqrt();
        assert!((mean - 5.0).abs() < 1e-10);
        assert!((variance - 4.0).abs() < 1e-10);
        assert!((stddev - 2.0).abs() < 1e-10);
    }

    #[test]
    fn test_stats_single_value() {
        let nums: Vec<f64> = vec![42.0];
        let n = nums.len();
        let sum: f64 = nums.iter().sum();
        let mean: f64 = sum / n as f64;
        let median: f64 = nums[n / 2];
        assert!((mean - 42.0).abs() < 1e-10);
        assert!((median - 42.0).abs() < 1e-10);
    }

    #[test]
    fn test_stats_two_values() {
        let mut nums: Vec<f64> = vec![10.0, 20.0];
        nums.sort_by(|a, b| a.partial_cmp(b).unwrap());
        let n = nums.len();
        let median: f64 = (nums[n / 2 - 1] + nums[n / 2]) / 2.0;
        assert!((median - 15.0).abs() < 1e-10);
    }
}
