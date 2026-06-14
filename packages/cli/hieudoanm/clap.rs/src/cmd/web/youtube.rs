pub fn command() -> clap::Command {
    clap::Command::new("youtube")
        .about("YouTube tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("fetch")
                .about("Fetch YouTube video info")
                .arg(clap::Arg::new("url").help("Video URL or ID").required(true)),
        )
        .subcommand(clap::Command::new("thumbnails").about("Get YouTube thumbnail URLs"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("fetch", _m)) => println!("web youtube fetch (not yet implemented)"),
        Some(("thumbnails", _m)) => println!("web youtube thumbnails (not yet implemented)"),
        _ => {}
    }
    Ok(())
}
