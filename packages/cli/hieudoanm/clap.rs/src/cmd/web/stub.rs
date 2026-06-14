pub fn command() -> clap::Command {
    clap::Command::new("weather").about("Get weather for a location")
}

pub async fn run(name: &str, _matches: &clap::ArgMatches) -> anyhow::Result<()> {
    println!("web {name} (not yet implemented)");
    Ok(())
}
