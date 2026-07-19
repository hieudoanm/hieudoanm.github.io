use anyhow::Context;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'T', long = "target", help = "Host:port to check")]
    pub target: String,
    #[arg(
        short = 't',
        long = "timeout",
        default_value = "3",
        help = "Connection timeout in seconds"
    )]
    pub timeout: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

pub fn command() -> clap::Command {
    clap::Command::new("check")
        .about("Check if a port is open")
        .arg(
            clap::Arg::new("target")
                .long("target")
                .short('T')
                .help("Host:port to check")
                .required(true),
        )
        .arg(
            clap::Arg::new("timeout")
                .long("timeout")
                .short('t')
                .help("Connection timeout in seconds")
                .default_value("3"),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .action(clap::ArgAction::SetTrue)
                .help("Output in JSON format"),
        )
}

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let target = Some(&matches.target).context("target required")?;
    let timeout: u64 = Some(&matches.timeout)
        .and_then(|t| t.parse().ok())
        .unwrap_or(3);
    let use_json = matches.json;

    let open = super::check_port_open(target, timeout);

    if use_json {
        let parts: Vec<&str> = target.splitn(2, ':').collect();
        let port: u16 = parts.get(1).and_then(|p| p.parse().ok()).unwrap_or(0);
        let result = serde_json::json!({
            "host": parts.first().unwrap_or(&""),
            "port": port,
            "open": open,
        });
        println!("{}", serde_json::to_string_pretty(&result)?);
    } else if open {
        println!("Port {target} is open");
    } else {
        println!("Port {target} is closed");
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
