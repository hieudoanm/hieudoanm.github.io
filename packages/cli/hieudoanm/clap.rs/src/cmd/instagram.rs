pub fn command() -> clap::Command {
    clap::Command::new("instagram")
        .about("Instagram related tools")
        .subcommand(clap::Command::new("download").about("Download Instagram content"))
}

pub fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("download", _m)) => println!("Instagram download (not yet implemented)"),
        _ => {}
    }
    Ok(())
}
