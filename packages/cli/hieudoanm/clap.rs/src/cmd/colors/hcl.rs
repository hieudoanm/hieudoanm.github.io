use clap::ArgMatches;

pub fn command() -> clap::Command {
    clap::Command::new("hcl")
        .about("Convert HCL color to other formats")
        .arg(clap::Arg::new("h").help("Hue (0-360)"))
        .arg(clap::Arg::new("c").help("Chroma (0-100)"))
        .arg(clap::Arg::new("l").help("Luminance (0-100)"))
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let h = *matches.get_one::<f64>("h").unwrap_or(&0.0);
    let c = *matches.get_one::<f64>("c").unwrap_or(&0.0);
    let l = *matches.get_one::<f64>("l").unwrap_or(&0.0);
    println!("HCL({h:.1}, {c:.1}%, {l:.1}%)");
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
