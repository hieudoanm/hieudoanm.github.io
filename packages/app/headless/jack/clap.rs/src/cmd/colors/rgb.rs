#[derive(clap::Args)]
pub struct Args {
    #[arg(help = "Red (0-255)")]
    pub r: Option<u8>,
    #[arg(help = "Green (0-255)")]
    pub g: Option<u8>,
    #[arg(help = "Blue (0-255)")]
    pub b: Option<u8>,
}

pub fn command() -> clap::Command {
    clap::Command::new("rgb")
        .about("Convert RGB color to other formats")
        .arg(
            clap::Arg::new("r")
                .help("Red (0-255)")
                .value_parser(clap::value_parser!(u8)),
        )
        .arg(
            clap::Arg::new("g")
                .help("Green (0-255)")
                .value_parser(clap::value_parser!(u8)),
        )
        .arg(
            clap::Arg::new("b")
                .help("Blue (0-255)")
                .value_parser(clap::value_parser!(u8)),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let r = *matches.r.as_ref().unwrap_or(&0);
    let g = *matches.g.as_ref().unwrap_or(&0);
    let b = *matches.b.as_ref().unwrap_or(&0);
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
