use anyhow::Context;

#[derive(clap::Args)]
pub struct Args {
    #[arg(short = 'H', long = "host", help = "Host to scan")]
    pub host: String,
    #[arg(long = "ports", help = "Port list (e.g. 22,80,443 or 8000-8100)")]
    pub ports: Option<String>,
    #[arg(
        short = 't',
        long = "timeout",
        default_value = "2",
        help = "Per-port timeout in seconds"
    )]
    pub timeout: String,
    #[arg(long = "json", action = clap::ArgAction::SetTrue, help = "Output in JSON format")]
    pub json: bool,
}

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

pub async fn run(matches: &Args) -> anyhow::Result<()> {
    let host = Some(&matches.host).context("host required")?;
    let ports_str = matches.ports.as_deref().unwrap_or("");
    let timeout: u64 = Some(&matches.timeout)
        .and_then(|t| t.parse().ok())
        .unwrap_or(2);
    let use_json = matches.json;

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
    scan_ports_with_check(host, ports, timeout, |addr| {
        super::check_port_open(addr, timeout)
    })
}

fn scan_ports_with_check(
    host: &str,
    ports: &[u16],
    _timeout: u64,
    check_fn: impl Fn(&str) -> bool,
) -> Vec<(u16, &'static str)> {
    let common = super::common_ports();
    let mut open_ports = Vec::new();
    for &p in ports {
        let addr = format!("{host}:{p}");
        if check_fn(&addr) {
            let name = common.get(&p).copied().unwrap_or("Unknown");
            open_ports.push((p, name));
        }
    }
    open_ports
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_scan_ports_with_check_all_open() {
        let ports = scan_ports_with_check("localhost", &[80, 443], 1, |_| true);
        assert_eq!(ports.len(), 2);
        assert_eq!(ports[0], (80, "HTTP"));
        assert_eq!(ports[1], (443, "HTTPS"));
    }

    #[test]
    fn test_scan_ports_with_check_all_closed() {
        let ports = scan_ports_with_check("localhost", &[80, 443], 1, |_| false);
        assert_eq!(ports.len(), 0);
    }

    #[test]
    fn test_scan_ports_with_check_some_open() {
        let ports =
            scan_ports_with_check("localhost", &[80, 8080, 443], 1, |addr| addr.contains("80"));
        assert_eq!(ports.len(), 2);
        assert_eq!(ports[0], (80, "HTTP"));
        assert_eq!(ports[1], (8080, "HTTP-Alt"));
    }

    #[test]
    fn test_scan_ports_with_check_empty() {
        let ports = scan_ports_with_check("localhost", &[], 1, |_| true);
        assert!(ports.is_empty());
    }
}
