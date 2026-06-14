pub fn command() -> clap::Command {
    clap::Command::new("openapi")
        .about("OpenAPI specification tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("postman")
                .about("Convert OpenAPI to Postman collection")
                .arg(
                    clap::Arg::new("input")
                        .short('i')
                        .long("input")
                        .help("OpenAPI file (json/yaml)")
                        .required(true),
                )
                .arg(
                    clap::Arg::new("output")
                        .short('o')
                        .long("output")
                        .help("Output Postman file"),
                ),
        )
        .subcommand(
            clap::Command::new("validate")
                .about("Validate an OpenAPI spec")
                .arg(
                    clap::Arg::new("file")
                        .short('f')
                        .long("file")
                        .help("OpenAPI file")
                        .required(true),
                ),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("postman", _m)) => {
            println!("OpenAPI to Postman (not yet implemented)");
        }
        Some(("validate", _m)) => {
            println!("OpenAPI validate (not yet implemented)");
        }
        _ => {}
    }
    Ok(())
}
