mod check;
mod find;
mod scan;

use std::net::{TcpStream, ToSocketAddrs};
use std::time::Duration;

pub fn command() -> clap::Command {
    clap::Command::new("port")
        .about("Network port checking tools")
        .subcommand_required(true)
        .subcommand(check::command())
        .subcommand(find::command())
        .subcommand(scan::command())
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("check", m)) => check::run(m).await,
        Some(("find", m)) => find::run(m).await,
        Some(("scan", m)) => scan::run(m).await,
        _ => Ok(()),
    }
}

fn check_port_open(addr: &str, timeout_secs: u64) -> bool {
    let timeout = Duration::from_secs(timeout_secs);
    if let Ok(addrs) = addr.to_socket_addrs() {
        for addr in addrs {
            if TcpStream::connect_timeout(&addr, timeout).is_ok() {
                return true;
            }
        }
    }
    false
}

fn build_port_list(s: &str) -> Vec<u16> {
    if s.is_empty() {
        let mut ports: Vec<u16> = common_ports().keys().copied().collect();
        ports.sort_unstable();
        return ports;
    }

    let mut ports: Vec<u16> = Vec::new();
    for part in s.split(',') {
        let part = part.trim();
        if let Some(dash_idx) = part.find('-') {
            let start: u16 = part[..dash_idx].trim().parse().unwrap_or(0);
            let end: u16 = part[dash_idx + 1..].trim().parse().unwrap_or(0);
            if start <= end && start > 0 {
                for p in start..=end {
                    ports.push(p);
                }
            }
        } else {
            if let Ok(p) = part.parse::<u16>() {
                ports.push(p);
            }
        }
    }
    ports.sort_unstable();
    ports
}

fn common_ports() -> std::collections::HashMap<u16, &'static str> {
    use std::collections::HashMap;
    let mut m = HashMap::new();
    m.insert(21, "FTP");
    m.insert(22, "SSH");
    m.insert(23, "Telnet");
    m.insert(25, "SMTP");
    m.insert(53, "DNS");
    m.insert(80, "HTTP");
    m.insert(110, "POP3");
    m.insert(143, "IMAP");
    m.insert(443, "HTTPS");
    m.insert(465, "SMTPS");
    m.insert(587, "SMTP Submission");
    m.insert(993, "IMAPS");
    m.insert(995, "POP3S");
    m.insert(1433, "MSSQL");
    m.insert(3306, "MySQL");
    m.insert(3389, "RDP");
    m.insert(5432, "PostgreSQL");
    m.insert(6379, "Redis");
    m.insert(8080, "HTTP-Alt");
    m.insert(8443, "HTTPS-Alt");
    m.insert(27017, "MongoDB");
    m
}
