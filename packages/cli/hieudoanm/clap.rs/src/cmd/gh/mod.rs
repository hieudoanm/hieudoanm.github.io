mod stub;

pub fn command() -> clap::Command {
    clap::Command::new("gh")
        .about("GitHub CLI tools")
        .subcommand_required(true)
        .subcommand(stub::languages_cmd())
        .subcommand(stub::license_cmd())
        .subcommand(stub::coc_cmd())
        .subcommand(stub::ignore_cmd())
        .subcommand(stub::og_cmd())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some((name, m)) = matches.subcommand() {
        stub::run(name, m).await
    } else {
        Ok(())
    }
}
