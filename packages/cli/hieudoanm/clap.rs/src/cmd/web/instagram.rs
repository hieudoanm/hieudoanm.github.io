pub fn command() -> clap::Command {
    clap::Command::new("instagram")
        .about("Instagram tools")
        .subcommand(clap::Command::new("download").about("Download Instagram content"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some(("download", _m)) = matches.subcommand() {
        println!("web instagram download (not yet implemented)");
    }
    Ok(())
}
