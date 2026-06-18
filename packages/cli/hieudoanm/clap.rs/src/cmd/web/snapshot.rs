pub fn command() -> clap::Command {
    clap::Command::new("snapshot")
        .about("Take a browser screenshot")
        .arg(clap::Arg::new("url").help("URL to capture").required(true))
        .arg(
            clap::Arg::new("output")
                .short('o')
                .long("output")
                .help("Output file path"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let _url = matches.get_one::<String>("url").unwrap();
    anyhow::bail!("snapshot requires the `headless_chrome` crate which is not yet integrated");
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
