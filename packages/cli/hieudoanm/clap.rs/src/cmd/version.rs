pub const VERSION: &str = match option_env!("VERSION") {
    Some(v) => v,
    None => "0.1.0",
};

pub fn command() -> clap::Command {
    clap::Command::new("version").about("Print the version number of the application")
}

pub fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    println!("hieudoanm version {VERSION}");
    Ok(())
}
