use std::io::Write;

use rand::Rng;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'm', long = "min", default_value = "1", help = "Minimum value")]
    pub min: String,
    #[arg(short = 'x', long = "max", default_value = "100", help = "Maximum value")]
    pub max: String,
    #[arg(short = 'n', long = "count", default_value = "1", help = "Number of values")]
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
    run_write(matches, &mut std::io::stdout()).await
}

pub async fn run_write(matches: &Args, write: &mut impl Write) -> anyhow::Result<()> {
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
        writeln!(write, "{}", serde_json::to_string_pretty(&output)?)?;
    } else {
        for v in nums {
            writeln!(write, "{}", v)?;
        }
    }

    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_run_write_text() {
        let args = Args {
            min: "1".into(),
            max: "10".into(),
            count: "3".into(),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        let lines: Vec<&str> = output.lines().collect();
        assert_eq!(lines.len(), 3);
        for line in &lines {
            let v: f64 = line.parse().unwrap();
            assert!((1.0..=10.0).contains(&v));
        }
    }

    #[tokio::test]
    async fn test_run_write_json() {
        let args = Args {
            min: "1".into(),
            max: "100".into(),
            count: "5".into(),
            json: true,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert!(output.contains("\"count\": 5"));
        assert!(output.contains("\"min\": 1.0"));
        assert!(output.contains("\"max\": 100.0"));
        assert!(output.contains("\"values\": ["));
    }

    #[tokio::test]
    async fn test_run_write_single_default() {
        let args = Args {
            min: "1".into(),
            max: "100".into(),
            count: "1".into(),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        let lines: Vec<&str> = output.lines().collect();
        assert_eq!(lines.len(), 1);
    }

    #[tokio::test]
    async fn test_run_write_count_min_one() {
        let args = Args {
            min: "1".into(),
            max: "10".into(),
            count: "0".into(),
            json: false,
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert_eq!(output.lines().count(), 1);
    }

    #[tokio::test]
    async fn test_run_write_parse_error() {
        let args = Args {
            min: "abc".into(),
            max: "10".into(),
            count: "1".into(),
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
