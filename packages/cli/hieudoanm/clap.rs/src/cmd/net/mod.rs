mod ip;
pub(crate) mod service;
mod status;
mod stub;
mod wifi;

pub fn command() -> clap::Command {
    clap::Command::new("net")
        .about("Network diagnostics and servers")
        .subcommand_required(true)
        .subcommand(ip::command())
        .subcommand(status::command())
        .subcommand(status::command_all())
        .subcommand(wifi::command())
        .subcommand(clap::Command::new("cert").about("TLS certificate tools"))
        .subcommand(clap::Command::new("ping").about("Ping a host"))
        .subcommand(clap::Command::new("dns").about("DNS lookup"))
        .subcommand(clap::Command::new("serve").about("Start an HTTP server"))
        .subcommand(clap::Command::new("http").about("HTTP client"))
        .subcommand(clap::Command::new("whois").about("WHOIS lookup"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("ip", m)) => ip::run(m).await,
        Some(("status", m)) => status::run(m).await,
        Some(("status-all", m)) => status::run_all(m).await,
        Some(("dns", m)) => ip::run_dns(m).await,
        Some(("wifi", m)) => wifi::run(m).await,
        Some((name, m)) => stub::run(name, m).await,
        _ => Ok(()),
    }
}
