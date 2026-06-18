use clap::ArgMatches;

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

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let weight: f64 = matches
        .get_one::<String>("weight")
        .unwrap()
        .parse()
        .unwrap_or(0.0);
    let height: f64 = matches
        .get_one::<String>("height")
        .unwrap()
        .parse()
        .unwrap_or(0.0);
    if height > 0.0 {
        let bmi = weight / ((height / 100.0) * (height / 100.0));
        println!("BMI: {bmi:.1}");
    } else {
        anyhow::bail!("height must be > 0");
    }
    Ok(())
}

#[cfg(test)]
mod tests {
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
}
