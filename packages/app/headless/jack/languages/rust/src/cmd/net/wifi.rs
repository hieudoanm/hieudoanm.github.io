use super::service;

#[derive(clap::Args)]
pub struct Args;

pub fn command() -> clap::Command {
    clap::Command::new("wifi").about("Scan WiFi networks")
}

pub async fn run(_matches: &Args) -> anyhow::Result<()> {
    match service::scan_wifi() {
        Ok(result) => println!("{result}"),
        Err(e) => eprintln!("WiFi scan failed: {e}"),
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_command_definition() {
        let cmd = command();
        assert!(!cmd.get_name().is_empty());
    }
}
