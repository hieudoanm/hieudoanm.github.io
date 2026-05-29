pub fn command() -> clap::Command {
    clap::Command::new("uuid")
        .about("Generate a UUID")
        .arg(
            clap::Arg::new("version")
                .short('v')
                .long("version")
                .default_value("4")
                .value_parser(["1", "4", "7"])
                .help("UUID version to generate (1, 4, or 7)"),
        )
}

pub fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let version = matches.get_one::<String>("version").unwrap();

    let u = match version.as_str() {
        "1" => uuid::Uuid::now_v1(&[0; 6]),
        "4" => uuid::Uuid::new_v4(),
        "7" => uuid::Uuid::now_v7(),
        _ => uuid::Uuid::new_v4(),
    };

    println!("{u}");
    Ok(())
}
