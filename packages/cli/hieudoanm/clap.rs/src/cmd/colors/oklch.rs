use clap::ArgMatches;

pub fn command() -> clap::Command {
    clap::Command::new("oklch")
        .about("Convert OKLCH color to other formats")
        .arg(clap::Arg::new("l").help("Lightness (0-1)"))
        .arg(clap::Arg::new("c").help("Chroma (0-0.4)"))
        .arg(clap::Arg::new("h").help("Hue (0-360)"))
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let l = *matches.get_one::<f64>("l").unwrap_or(&0.0);
    let c = *matches.get_one::<f64>("c").unwrap_or(&0.0);
    let h = *matches.get_one::<f64>("h").unwrap_or(&0.0);
    println!("OKLCH({l:.3}, {c:.3}, {h:.1}°)");
    Ok(())
}
