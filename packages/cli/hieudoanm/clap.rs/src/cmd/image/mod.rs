pub fn command() -> clap::Command {
    clap::Command::new("image")
        .about("Image inspection and conversion tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("info").about("Get image metadata").arg(
                clap::Arg::new("file")
                    .long("file")
                    .help("Image file")
                    .required(true),
            ),
        )
        .subcommand(
            clap::Command::new("convert")
                .about("Convert image format")
                .arg(
                    clap::Arg::new("file")
                        .long("file")
                        .help("Image file")
                        .required(true),
                )
                .arg(
                    clap::Arg::new("format")
                        .long("format")
                        .help("Target format")
                        .required(true),
                ),
        )
        .subcommand(
            clap::Command::new("dominant")
                .about("Extract dominant colors")
                .arg(
                    clap::Arg::new("file")
                        .long("file")
                        .help("Image file")
                        .required(true),
                ),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some((name, _m)) = matches.subcommand() {
        println!("image {name} (not yet implemented)");
    }
    Ok(())
}
