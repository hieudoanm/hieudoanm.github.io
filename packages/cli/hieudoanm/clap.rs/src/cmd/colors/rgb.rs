use clap::ArgMatches;

pub fn command() -> clap::Command {
    clap::Command::new("rgb")
        .about("Convert RGB color to other formats")
        .arg(clap::Arg::new("r").help("Red (0-255)"))
        .arg(clap::Arg::new("g").help("Green (0-255)"))
        .arg(clap::Arg::new("b").help("Blue (0-255)"))
}

pub async fn run(matches: &ArgMatches) -> anyhow::Result<()> {
    let r = *matches.get_one::<u8>("r").unwrap_or(&0);
    let g = *matches.get_one::<u8>("g").unwrap_or(&0);
    let b = *matches.get_one::<u8>("b").unwrap_or(&0);
    println!("RGB({r}, {g}, {b})");
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
