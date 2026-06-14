mod stub;

pub fn command() -> clap::Command {
    clap::Command::new("file")
        .about("File introspection and analysis tools")
        .subcommand_required(true)
        .subcommand(stub::read_cmd())
        .subcommand(stub::write_cmd())
        .subcommand(stub::edit_cmd())
        .subcommand(stub::grep_cmd())
        .subcommand(stub::checksum_cmd())
        .subcommand(stub::chmod_cmd())
        .subcommand(stub::count_cmd())
        .subcommand(stub::duplicates_cmd())
        .subcommand(stub::head_cmd())
        .subcommand(stub::size_cmd())
        .subcommand(stub::stats_cmd())
        .subcommand(stub::tail_cmd())
        .subcommand(stub::type_cmd())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some((name, m)) = matches.subcommand() {
        stub::run(name, m).await
    } else {
        Ok(())
    }
}
