mod stub;

pub fn command() -> clap::Command {
    clap::Command::new("openapi")
        .about("OpenAPI specification tools")
        .subcommand_required(true)
        .subcommand(stub::postman_cmd())
        .subcommand(stub::validate_cmd())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some((name, m)) = matches.subcommand() {
        stub::run(name, m).await
    } else {
        Ok(())
    }
}
