pub const VERSION: &str = match option_env!("VERSION") {
    Some(v) => v,
    None => "0.1.0",
};

pub fn command() -> clap::Command {
    clap::Command::new("version")
        .about("Print the application version")
        .arg(
            clap::Arg::new("json")
                .long("json")
                .action(clap::ArgAction::SetTrue)
                .help("Output in JSON format"),
        )
}

pub fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let use_json = matches.get_flag("json");
    if use_json {
        let out = serde_json::json!({"version": VERSION});
        println!("{}", serde_json::to_string_pretty(&out)?);
    } else {
        println!("hieudoanm version {VERSION}");
    }
    Ok(())
}
