mod stub;

pub fn command() -> clap::Command {
    clap::Command::new("data")
        .about("Data serialization and transformation tools")
        .subcommand_required(true)
        .subcommand(stub::json_cmd())
        .subcommand(stub::csv_cmd())
        .subcommand(stub::yml_cmd())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some((name, m)) = matches.subcommand() {
        stub::run(name, m).await
    } else {
        Ok(())
    }
}
