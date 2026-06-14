pub fn command() -> clap::Command {
    clap::Command::new("stub")
        .about("Stub placeholder (not meant to be invoked directly)")
        .hide(true)
}

pub async fn run(name: &str, _matches: &clap::ArgMatches) -> anyhow::Result<()> {
    println!("calc {name} (not yet implemented)");
    Ok(())
}
