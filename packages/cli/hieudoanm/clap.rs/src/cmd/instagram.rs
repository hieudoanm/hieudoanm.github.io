pub fn command() -> clap::Command {
    clap::Command::new("instagram")
        .about("Instagram related tools")
        .subcommand(clap::Command::new("download").about("Download Instagram content"))
}

pub fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some(("download", _m)) = matches.subcommand() {
        println!("Instagram download (not yet implemented)");
    }
    Ok(())
}
