mod cert;
mod http;
mod ip;
mod ping;
mod serve;
pub(crate) mod service;
mod status;
mod whois;
mod wifi;

pub fn command() -> clap::Command {
    clap::Command::new("net")
        .about("Network diagnostics and servers")
        .subcommand_required(true)
        .subcommand(ip::command())
        .subcommand(status::command())
        .subcommand(status::command_all())
        .subcommand(wifi::command())
        .subcommand(clap::Command::new("dns").about("DNS lookup").arg(
            clap::Arg::new("domain")
                .help("Domain to look up")
                .required(true),
        ))
        .subcommand(cert::command())
        .subcommand(ping::command())
        .subcommand(serve::command())
        .subcommand(http::command())
        .subcommand(whois::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("ip", m)) => ip::run(m).await,
        Some(("status", m)) => status::run(m).await,
        Some(("status-all", m)) => status::run_all(m).await,
        Some(("dns", m)) => ip::run_dns(m).await,
        Some(("wifi", m)) => wifi::run(m).await,
        Some(("cert", m)) => cert::run(m).await,
        Some(("ping", m)) => ping::run(m).await,
        Some(("serve", m)) => serve::run(m).await,
        Some(("http", m)) => http::run(m).await,
        Some(("whois", m)) => whois::run(m).await,
        _ => Ok(()),
    }
}
