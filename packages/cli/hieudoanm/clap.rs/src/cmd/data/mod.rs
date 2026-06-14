mod csv;
mod json;
mod yml;

pub fn command() -> clap::Command {
    clap::Command::new("data")
        .about("Data serialization and transformation tools")
        .subcommand_required(true)
        .subcommand(json::command())
        .subcommand(csv::command())
        .subcommand(yml::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("json", m)) => json::run(m).await,
        Some(("csv", m)) => csv::run(m).await,
        Some(("yml", m)) => yml::run(m).await,
        _ => Ok(()),
    }
}
