mod postman;
mod service;
mod validate;

pub fn command() -> clap::Command {
    clap::Command::new("openapi")
        .about("OpenAPI specification tools")
        .subcommand_required(true)
        .subcommand(postman::command())
        .subcommand(validate::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("openapi2postman", m)) => postman::run(m).await,
        Some(("validate", m)) => validate::run(m).await,
        _ => Ok(()),
    }
}
