use clap::ArgMatches;

macro_rules! stub_cmd {
    ($name:expr, $about:expr) => {
        clap::Command::new($name).about($about)
    };
}

pub fn postman_cmd() -> clap::Command {
    stub_cmd!("postman", "Convert OpenAPI to Postman collection")
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
        )
}
pub fn validate_cmd() -> clap::Command {
    stub_cmd!("validate", "Validate an OpenAPI spec").arg(
        clap::Arg::new("file")
            .short('f')
            .long("file")
            .help("OpenAPI file")
            .required(true),
    )
}

pub async fn run(name: &str, _matches: &ArgMatches) -> anyhow::Result<()> {
    println!("{name} (not yet implemented)");
    Ok(())
}
