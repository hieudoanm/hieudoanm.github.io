pub fn command() -> clap::Command {
    clap::Command::new("search")
        .about("Universal search for files, text, code, and the web")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("files")
                .about("Find files by glob pattern")
                .arg(
                    clap::Arg::new("pattern")
                        .help("Glob pattern")
                        .required(true),
                ),
        )
        .subcommand(
            clap::Command::new("text")
                .about("Search file contents by regex")
                .arg(
                    clap::Arg::new("pattern")
                        .help("Regex pattern")
                        .required(true),
                ),
        )
        .subcommand(
            clap::Command::new("code")
                .about("Find code symbols")
                .arg(clap::Arg::new("symbol").help("Symbol name").required(true)),
        )
        .subcommand(
            clap::Command::new("web")
                .about("Search the web")
                .arg(clap::Arg::new("query").help("Search query").required(true)),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some((name, _m)) = matches.subcommand() {
        println!("search {name} (not yet implemented)");
    }
    Ok(())
}
