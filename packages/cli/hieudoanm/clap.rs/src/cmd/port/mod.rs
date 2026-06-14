mod stub;

pub fn command() -> clap::Command {
    clap::Command::new("port")
        .about("Network port checking tools")
        .subcommand_required(true)
        .subcommand(stub::check_cmd())
        .subcommand(stub::find_cmd())
        .subcommand(stub::scan_cmd())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some((name, m)) = matches.subcommand() {
        stub::run(name, m).await
    } else {
        Ok(())
    }
}
