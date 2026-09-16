use std::io::Write;

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
    run_write(matches, &mut std::io::stdout()).await
}

pub async fn run_write(matches: &Args, write: &mut impl Write) -> anyhow::Result<()> {
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
        writeln!(write, "{}", serde_json::to_string_pretty(&output)?)?;
    } else {
        writeln!(write, "count:  {}", n)?;
        writeln!(write, "min:    {}", min)?;
        writeln!(write, "max:    {}", max)?;
        writeln!(write, "sum:    {}", sum)?;
        writeln!(write, "mean:   {}", mean)?;
        writeln!(write, "median: {}", median)?;
        writeln!(write, "stddev: {}", stddev)?;
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_run_write_text() {
        let args = Args {
            values: "1,2,3,4,5".into(),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("count:  5"));
        assert!(output.contains("mean:   3"));
        assert!(output.contains("median: 3"));
        assert!(output.contains("min:    1"));
        assert!(output.contains("max:    5"));
    }

    #[tokio::test]
    async fn test_run_write_json() {
        let args = Args {
            values: "10,20,30".into(),
            json: true,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("\"count\": 3"));
        assert!(output.contains("\"mean\": 20.0"));
        assert!(output.contains("\"median\": 20.0"));
    }

    #[tokio::test]
    async fn test_run_write_even_count() {
        let args = Args {
            values: "1,2,3,4".into(),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("median: 2.5"));
    }

    #[tokio::test]
    async fn test_run_write_single_value() {
        let args = Args {
            values: "42".into(),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("count:  1"));
        assert!(output.contains("mean:   42"));
    }

    #[tokio::test]
    async fn test_run_write_empty_error() {
        let args = Args {
            values: "".into(),
            json: false,
        };
        let mut buf = vec![];
        let result = run_write(&args, &mut buf).await;
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_run_write_parse_error() {
        let args = Args {
            values: "abc".into(),
            json: false,
        };
        let mut buf = vec![];
        let result = run_write(&args, &mut buf).await;
        assert!(result.is_err());
    }

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
