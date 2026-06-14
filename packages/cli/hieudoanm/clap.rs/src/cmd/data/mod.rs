pub fn command() -> clap::Command {
    clap::Command::new("data")
        .about("Data serialization and transformation tools")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("json")
                .about("JSON tools")
                .arg(clap::Arg::new("file").help("JSON file").required(true)),
        )
        .subcommand(
            clap::Command::new("csv")
                .about("CSV tools")
                .arg(clap::Arg::new("file").help("CSV file").required(true)),
        )
        .subcommand(
            clap::Command::new("yml")
                .about("YAML tools")
                .arg(clap::Arg::new("file").help("YAML file").required(true)),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    if let Some((name, sub_m)) = matches.subcommand() {
        let file = sub_m.get_one::<String>("file").unwrap();
        println!("data {name} --file {file} (not yet implemented)");
    }
    Ok(())
}
