pub mod define;

pub fn command() -> clap::Command {
    clap::Command::new("english")
        .about("English dictionary tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("define")
                .about("Look up a word definition")
                .arg(clap::Arg::new("word").help("Word to define").required(true)),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some(("define", m)) = matches.subcommand() {
        define::run(m).await?;
    }
    Ok(())
}
