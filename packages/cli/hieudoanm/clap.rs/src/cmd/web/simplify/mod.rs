mod csv;
mod md;

pub fn command() -> clap::Command {
    clap::Command::new("simplify")
        .about("Extract and convert web content")
        .subcommand_required(true)
        .subcommand(csv::command())
        .subcommand(md::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("csv", m)) => csv::run(m).await,
        Some(("md", m)) => md::run(m).await,
        _ => Ok(()),
    }
}
