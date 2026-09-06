use std::io::Write;

#[derive(clap::Args)]
pub struct Args {
    #[arg(long = "weight", help = "Weight in kg")]
    pub weight: String,
    #[arg(long = "height", help = "Height in cm")]
    pub height: String,
}

pub fn command() -> clap::Command {
    clap::Command::new("bmi")
        .about("Calculate Body Mass Index")
        .arg(
            clap::Arg::new("weight")
                .long("weight")
                .help("Weight in kg")
                .required(true),
        )
        .arg(
            clap::Arg::new("height")
                .long("height")
                .help("Height in cm")
                .required(true),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    run_write(matches, &mut std::io::stdout()).await
}

pub async fn run_write(matches: &Args, write: &mut impl Write) -> anyhow::Result<()> {
    let weight: f64 = matches.weight.parse().unwrap_or(0.0);
    let height: f64 = matches.height.parse().unwrap_or(0.0);
    if height > 0.0 {
        let bmi = weight / ((height / 100.0) * (height / 100.0));
        writeln!(write, "BMI: {bmi:.1}")?;
    } else {
        anyhow::bail!("height must be > 0");
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_bmi_calculation() {
        let weight: f64 = 70.0;
        let height: f64 = 175.0;
        let bmi: f64 = weight / ((height / 100.0) * (height / 100.0));
        assert!((bmi - 22.86).abs() < 0.01);
    }

    #[test]
    fn test_bmi_underweight() {
        let weight: f64 = 50.0;
        let height: f64 = 180.0;
        let bmi: f64 = weight / ((height / 100.0) * (height / 100.0));
        assert!((bmi - 15.43).abs() < 0.01);
    }

    #[test]
    fn test_bmi_obese() {
        let weight: f64 = 120.0;
        let height: f64 = 170.0;
        let bmi: f64 = weight / ((height / 100.0) * (height / 100.0));
        assert!((bmi - 41.52).abs() < 0.01);
    }

    #[tokio::test]
    async fn test_run_write_normal() {
        let args = Args {
            weight: "70".into(),
            height: "175".into(),
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert_eq!(output.trim(), "BMI: 22.9");
    }

    #[tokio::test]
    async fn test_run_write_zero_height() {
        let args = Args {
            weight: "70".into(),
            height: "0".into(),
        };
        let mut buf = vec![];
        let result = run_write(&args, &mut buf).await;
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_run_write_parse_defaults_to_zero() {
        let args = Args {
            weight: "abc".into(),
            height: "175".into(),
        };
        let mut buf = vec![];
        run_write(&args, &mut buf).await.unwrap();
        let output = String::from_utf8(buf).unwrap();
        assert_eq!(output.trim(), "BMI: 0.0");
    }

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
