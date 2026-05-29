pub fn command() -> clap::Command {
    clap::Command::new("snapshot")
        .about("Take a browser screenshot")
        .alias("screenshot")
        .arg(
            clap::Arg::new("url")
                .help("URL to capture")
                .required(true),
        )
        .arg(
            clap::Arg::new("output")
                .short('o')
                .long("output")
                .help("Output file path"),
        )
}

pub fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    anyhow::bail!("snapshot requires the `headless_chrome` crate which is not yet integrated")
}
