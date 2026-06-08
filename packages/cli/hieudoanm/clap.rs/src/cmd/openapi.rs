pub fn command() -> clap::Command {
    clap::Command::new("openapi")
        .about("OpenAPI specification tools")
        .subcommand(clap::Command::new("postman").about("Convert OpenAPI to Postman collection"))
}

pub fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some(("postman", _m)) = matches.subcommand() {
        println!("OpenAPI to Postman (not yet implemented)");
    }
    Ok(())
}
