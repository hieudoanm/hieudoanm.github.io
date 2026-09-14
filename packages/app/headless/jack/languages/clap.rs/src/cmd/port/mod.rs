use clap::FromArgMatches;
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
        Some(("check", m)) => check::run(&check::Args::from_arg_matches(m)?).await,
        Some(("find", m)) => find::run(&find::Args::from_arg_matches(m)?).await,
        Some(("scan", m)) => scan::run(&scan::Args::from_arg_matches(m)?).await,
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_common_ports_contains_http() {
        let ports = common_ports();
        assert_eq!(ports.get(&80), Some(&"HTTP"));
        assert_eq!(ports.get(&443), Some(&"HTTPS"));
        assert_eq!(ports.get(&22), Some(&"SSH"));
    }

    #[test]
    fn test_build_port_list_empty_returns_all_common() {
        let ports = build_port_list("");
        assert!(ports.contains(&80));
        assert!(ports.contains(&443));
        assert!(ports.contains(&22));
        assert!(ports.len() >= 20);
    }

    #[test]
    fn test_build_port_list_single() {
        assert_eq!(build_port_list("80"), vec![80]);
        assert_eq!(build_port_list("443"), vec![443]);
    }

    #[test]
    fn test_build_port_list_range() {
        assert_eq!(build_port_list("8000-8003"), vec![8000, 8001, 8002, 8003]);
    }

    #[test]
    fn test_build_port_list_comma_separated() {
        assert_eq!(build_port_list("22,80,443"), vec![22u16, 80, 443]);
    }

    #[test]
    fn test_build_port_list_mixed() {
        assert_eq!(
            build_port_list("80,8000-8002,443"),
            vec![80u16, 443, 8000, 8001, 8002]
        );
    }

    #[test]
    fn test_build_port_list_invalid_part_skipped() {
        let result = build_port_list("80,abc,443");
        assert_eq!(result, vec![80u16, 443]);
    }

    #[test]
    fn test_build_port_list_sorted() {
        let result = build_port_list("443,22,80");
        assert_eq!(result, vec![22u16, 80, 443]);
    }
}
