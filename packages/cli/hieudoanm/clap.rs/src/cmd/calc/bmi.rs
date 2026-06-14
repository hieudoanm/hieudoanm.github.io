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
