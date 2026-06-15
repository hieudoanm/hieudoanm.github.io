use std::io::Write;
use std::process::{Command, Stdio};

fn openssl_x509(host: &str, args: &[&str]) -> anyhow::Result<String> {
    let host_port = if host.contains(':') {
        host.to_string()
    } else {
        format!("{host}:443")
    };
    let server_name = host.split(':').next().unwrap_or(host);

    let mut s_client = Command::new("openssl")
        .args([
            "s_client",
            "-connect",
            &host_port,
            "-servername",
            server_name,
        ])
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::null())
        .spawn()
        .map_err(|e| anyhow::anyhow!("failed to run openssl (is it installed?): {e}"))?;

    if let Some(mut stdin) = s_client.stdin.take() {
        stdin.write_all(b"\n")?;
    }

    let output = s_client
        .wait_with_output()
        .map_err(|e| anyhow::anyhow!("openssl s_client failed: {e}"))?;
    let pem = String::from_utf8_lossy(&output.stdout).to_string();

    let mut x509 = Command::new("openssl")
        .args(["x509", "-noout"])
        .args(args)
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::null())
        .spawn()
        .map_err(|e| anyhow::anyhow!("failed to run openssl x509: {e}"))?;

    if let Some(mut stdin) = x509.stdin.take() {
        stdin.write_all(pem.as_bytes())?;
    }

    let result = x509
        .wait_with_output()
        .map_err(|e| anyhow::anyhow!("openssl x509 failed: {e}"))?;

    if !result.status.success() {
        let stderr = String::from_utf8_lossy(&result.stderr);
        anyhow::bail!("openssl x509 failed: {stderr}");
    }

    Ok(String::from_utf8_lossy(&result.stdout).to_string())
}

fn format_duration(dur: chrono::Duration) -> String {
    let days = dur.num_days();
    let hours = dur.num_hours() - days * 24;
    let minutes = dur.num_minutes() - days * 24 * 60 - hours * 60;
    if days > 0 {
        format!("{days}d {hours}h {minutes}m")
    } else if hours > 0 {
        format!("{hours}h {minutes}m")
    } else {
        format!("{minutes}m")
    }
}

pub fn command() -> clap::Command {
    clap::Command::new("cert")
        .about("SSL/TLS certificate inspection")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("info")
                .about("Show detailed certificate information")
                .arg(
                    clap::Arg::new("host")
                        .short('H')
                        .long("host")
                        .help("Host:port to inspect")
                        .required(true),
                ),
        )
        .subcommand(
            clap::Command::new("check")
                .about("Quick certificate health check (expiry warning)")
                .arg(
                    clap::Arg::new("host")
                        .short('H')
                        .long("host")
                        .help("Host:port to check")
                        .required(true),
                )
                .arg(
                    clap::Arg::new("warn")
                        .short('w')
                        .long("warn")
                        .help("Warning threshold in days")
                        .default_value("30"),
                ),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("info", m)) => {
            let host = m.get_one::<String>("host").unwrap();
            let text = openssl_x509(host, &["-text"])?;
            println!("{text}");
        }
        Some(("check", m)) => {
            let host = m.get_one::<String>("host").unwrap();
            let warn_days: i64 = m.get_one::<String>("warn").unwrap().parse().unwrap_or(30);

            let output = openssl_x509(host, &["-subject", "-issuer", "-enddate"])?;

            let mut subject = String::new();
            let mut issuer = String::new();
            let mut not_after = String::new();

            for line in output.lines() {
                if let Some(val) = line.strip_prefix("subject=") {
                    subject = val.to_string();
                } else if let Some(val) = line.strip_prefix("issuer=") {
                    issuer = val.to_string();
                } else if let Some(val) = line.strip_prefix("notAfter=") {
                    not_after = val.to_string();
                }
            }

            let status = if not_after.is_empty() {
                "unknown".to_string()
            } else if let Ok(expiry) =
                chrono::NaiveDateTime::parse_from_str(&not_after, "%b %e %H:%M:%S %Y GMT")
            {
                let expiry = expiry.and_utc();
                let now = chrono::Utc::now();
                let remaining = expiry - now;
                if remaining.num_seconds() < 0 {
                    format!("EXPIRED ({} ago)", format_duration(-remaining))
                } else if remaining.num_days() < warn_days {
                    format!("Expiring soon ({} remaining)", format_duration(remaining))
                } else {
                    format!("Valid ({} remaining)", format_duration(remaining))
                }
            } else {
                format!("Expires: {not_after}")
            };

            println!("── Certificate Check ────────────────");
            println!("Host    : {host}");
            println!("Subject : {subject}");
            println!("Issuer  : {issuer}");
            println!("Status  : {status}");
        }
        _ => {}
    }
    Ok(())
}
