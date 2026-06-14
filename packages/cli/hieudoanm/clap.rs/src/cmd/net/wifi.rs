use super::service;

pub fn command() -> clap::Command {
    clap::Command::new("wifi").about("Scan WiFi networks")
}

pub async fn run(_matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match service::scan_wifi() {
        Ok(result) => println!("{result}"),
        Err(e) => eprintln!("WiFi scan failed: {e}"),
    }
    Ok(())
}
