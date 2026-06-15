pub fn command() -> clap::Command {
    clap::Command::new("uuid").about("Generate a UUID")
}

pub async fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let id = uuid::Uuid::new_v4();
    println!("{id}");
    Ok(())
}
