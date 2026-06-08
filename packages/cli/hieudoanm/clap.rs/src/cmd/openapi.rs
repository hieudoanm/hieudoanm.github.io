pub fn command() -> clap::Command {
    clap::Command::new("openapi")
        .about("OpenAPI specification tools")
        .subcommand(clap::Command::new("postman").about("Convert OpenAPI to Postman collection"))
}

pub fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("postman", _m)) => println!("OpenAPI to Postman (not yet implemented)"),
        _ => {}
    }
    Ok(())
}
