use anyhow::Context;

pub fn command() -> clap::Command {
    clap::Command::new("scan")
        .about("Scan common ports on a host")
        .arg(
            clap::Arg::new("host")
                .long("host")
                .short('H')
                .help("Host to scan")
                .required(true),
        )
        .arg(
            clap::Arg::new("ports")
                .long("ports")
                .help("Port list (e.g. 22,80,443 or 8000-8100)"),
        )
        .arg(
            clap::Arg::new("timeout")
                .long("timeout")
                .short('t')
                .help("Per-port timeout in seconds")
                .default_value("2"),
        )
        .arg(
            clap::Arg::new("json")
                .long("json")
                .action(clap::ArgAction::SetTrue)
                .help("Output in JSON format"),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let host = matches.get_one::<String>("host").context("host required")?;
    let ports_str = matches
        .get_one::<String>("ports")
        .map(|s| s.as_str())
        .unwrap_or("");
    let timeout: u64 = matches
        .get_one::<String>("timeout")
        .and_then(|t| t.parse().ok())
        .unwrap_or(2);
    let use_json = matches.get_flag("json");

    let port_list = super::build_port_list(ports_str);
    let open_ports = scan_ports(host, &port_list, timeout);

    if use_json {
        let result = serde_json::json!({
            "host": host,
            "ports": open_ports.iter().map(|p| serde_json::json!({
                "port": p.0,
                "name": p.1,
            })).collect::<Vec<_>>(),
        });
        println!("{}", serde_json::to_string_pretty(&result)?);
    } else if open_ports.is_empty() {
        println!("No open ports found on {host}");
    } else {
        println!("Open ports on {host}:");
        println!("{}", "─".repeat(40));
        for (port, name) in &open_ports {
            println!("  {port:5}  {name}");
        }
    }

    Ok(())
}

fn scan_ports(host: &str, ports: &[u16], timeout: u64) -> Vec<(u16, &'static str)> {
    let common = super::common_ports();
    let mut open_ports = Vec::new();
    for &p in ports {
        let addr = format!("{host}:{p}");
        if super::check_port_open(&addr, timeout) {
            let name = common.get(&p).copied().unwrap_or("Unknown");
            open_ports.push((p, name));
        }
    }
    open_ports
}
