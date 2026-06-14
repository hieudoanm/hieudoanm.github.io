use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Serialize)]
struct IPInfo {
    ip: String,
    #[serde(default)]
    version: String,
    #[serde(default)]
    city: String,
    #[serde(default)]
    region: String,
    #[serde(default)]
    country_name: String,
    #[serde(default)]
    country_code: String,
    #[serde(default)]
    postal: String,
    #[serde(default)]
    latitude: String,
    #[serde(default)]
    longitude: String,
    #[serde(default)]
    timezone: String,
    #[serde(default)]
    org: String,
    #[serde(default)]
    asn: String,
}

#[derive(Debug, Deserialize)]
struct IPInfoResponse {
    ip: String,
    #[serde(default)]
    city: String,
    #[serde(default)]
    region: String,
    #[serde(default)]
    country: String,
    #[serde(default)]
    postal: String,
    #[serde(default)]
    loc: String,
    #[serde(default)]
    timezone: String,
    #[serde(default)]
    org: String,
}

#[derive(Debug, Deserialize)]
struct IpapiResponse {
    ip: String,
    #[serde(default)]
    version: String,
    #[serde(default)]
    city: String,
    #[serde(default)]
    region: String,
    #[serde(default)]
    country_name: String,
    #[serde(default)]
    country_code: String,
    #[serde(default)]
    postal: String,
    #[serde(default)]
    latitude: f64,
    #[serde(default)]
    longitude: f64,
    #[serde(default)]
    timezone: String,
    #[serde(default)]
    org: String,
    #[serde(default)]
    asn: String,
}

fn detect_vpn(org: &str) -> bool {
    let lower = org.to_lowercase();
    let keywords = [
        "cloudflare",
        "amazon",
        "google",
        "digitalocean",
        "microsoft",
    ];
    keywords.iter().any(|kw| lower.contains(kw))
}

fn print_ip_info(info: &IPInfo) {
    println!("── Network Info ──────────────────────");
    println!("IP          : {}", info.ip);
    println!("Version     : {}", info.version);
    println!("ASN         : {}", info.asn);
    println!("Organization: {}", info.org);
    println!("Timezone    : {}", info.timezone);
    println!();
    println!("── Location ──────────────────────────");
    println!("Country     : {}", info.country_name);
    println!("Region      : {}", info.region);
    println!("City        : {}", info.city);
    println!("Postal      : {}", info.postal);
    println!("Coordinates : {}, {}", info.latitude, info.longitude);
    if detect_vpn(&info.org) {
        println!();
        println!("⚠  Shared hosting / VPN detected. Rate limiting may occur.");
    }
}

fn version_from_ip(ip: &str) -> String {
    if ip.contains(':') {
        "IPv6".to_string()
    } else {
        "IPv4".to_string()
    }
}

async fn fetch_ip() -> anyhow::Result<IPInfo> {
    let client = reqwest::Client::new();
    let ip_resp: serde_json::Value = client
        .get("https://api.ipify.org?format=json")
        .send()
        .await?
        .json()
        .await?;
    let ip = ip_resp["ip"].as_str().unwrap_or("").to_string();

    let info = match fetch_from_ipinfo(&client, &ip).await {
        Ok(info) => info,
        Err(_) => fetch_from_ipapi(&client, &ip).await?,
    };
    Ok(info)
}

async fn fetch_from_ipinfo(client: &reqwest::Client, ip: &str) -> anyhow::Result<IPInfo> {
    let resp = client
        .get(format!("https://ipinfo.io/{ip}/json"))
        .send()
        .await?;
    if !resp.status().is_success() {
        anyhow::bail!("IPinfo returned {}", resp.status());
    }
    let data: IPInfoResponse = resp.json().await?;
    let (lat, lon) = if let Some((lat, lon)) = data.loc.split_once(',') {
        (lat.to_string(), lon.to_string())
    } else {
        (String::new(), String::new())
    };
    Ok(IPInfo {
        ip: data.ip.clone(),
        version: version_from_ip(&data.ip),
        city: data.city,
        region: data.region,
        country_name: data.country.clone(),
        country_code: data.country.clone(),
        postal: data.postal,
        latitude: lat,
        longitude: lon,
        timezone: data.timezone,
        org: data.org.clone(),
        asn: data.org.clone(),
    })
}

async fn fetch_from_ipapi(client: &reqwest::Client, ip: &str) -> anyhow::Result<IPInfo> {
    let data: IpapiResponse = client
        .get(format!("https://ipapi.co/{ip}/json/"))
        .send()
        .await?
        .json()
        .await?;
    Ok(IPInfo {
        ip: data.ip,
        version: data.version,
        city: data.city,
        region: data.region,
        country_name: data.country_name,
        country_code: data.country_code,
        postal: data.postal,
        latitude: format!("{}", data.latitude),
        longitude: format!("{}", data.longitude),
        timezone: data.timezone,
        org: data.org,
        asn: data.asn,
    })
}

fn load_services() -> Vec<(String, String)> {
    let services = crate::configs::services();
    let mut result = Vec::new();
    for svcs in services.values() {
        for (name, url) in svcs {
            result.push((name.clone(), url.clone()));
        }
    }
    result
}

async fn check_service(_name: &str, url: &str) -> String {
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(10))
        .build()
        .unwrap();
    match client.get(url).send().await {
        Ok(resp) => {
            let status = resp.status();
            if status.is_success() {
                format!("UP ({status})")
            } else {
                format!("DOWN ({status})")
            }
        }
        Err(e) => format!("ERROR: {e}"),
    }
}

pub fn command() -> clap::Command {
    clap::Command::new("net")
        .about("Network diagnostics and servers")
        .subcommand_required(true)
        .subcommand(
            clap::Command::new("ip")
                .about("Look up IP information")
                .subcommand(
                    clap::Command::new("dns").about("DNS lookup").arg(
                        clap::Arg::new("domain")
                            .help("Domain to look up")
                            .required(true),
                    ),
                ),
        )
        .subcommand(clap::Command::new("status").about("Check service status"))
        .subcommand(
            clap::Command::new("status-all")
                .about("Show status of all services")
                .alias("all"),
        )
        .subcommand(clap::Command::new("wifi").about("Scan WiFi networks"))
        .subcommand(clap::Command::new("cert").about("TLS certificate tools"))
        .subcommand(clap::Command::new("ping").about("Ping a host"))
        .subcommand(clap::Command::new("dns").about("DNS lookup"))
        .subcommand(clap::Command::new("serve").about("Start an HTTP server"))
        .subcommand(clap::Command::new("http").about("HTTP client"))
        .subcommand(clap::Command::new("whois").about("WHOIS lookup"))
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("ip", sub_m)) => {
            if let Some(("dns", dns_m)) = sub_m.subcommand() {
                let domain = dns_m
                    .get_one::<String>("domain")
                    .ok_or_else(|| anyhow::anyhow!("domain required"))?;
                use tokio::net::lookup_host;
                println!("DNS records for {domain}:");
                match lookup_host(format!("{domain}:0")).await {
                    Ok(addrs) => {
                        for addr in addrs {
                            println!("  {addr}");
                        }
                    }
                    Err(e) => eprintln!("DNS lookup failed: {e}"),
                }
            } else {
                let info = fetch_ip().await?;
                print_ip_info(&info);
            }
        }
        Some(("status", _m)) => {
            let services = load_services();
            let mut options: Vec<String> = Vec::new();
            for (name, url) in &services {
                options.push(name.clone());
                println!("{name}: {}", check_service(name, url).await);
            }
        }
        Some(("status-all", _m)) => {
            let services = load_services();
            println!("┌─────────────────────────────────────────────────────────────┐");
            println!("│                    Service Status Dashboard                  │");
            println!("├─────────────────────────────────────────────────────────────┤");
            for (name, url) in &services {
                print!("│ {name:<30} ");
                let status = check_service(name, url).await;
                let status_display = if status.starts_with("UP") {
                    format!("\x1b[32m{status}\x1b[0m")
                } else if status.starts_with("DOWN") {
                    format!("\x1b[31m{status}\x1b[0m")
                } else {
                    format!("\x1b[33m{status}\x1b[0m")
                };
                println!("{status_display:<37} │");
            }
            println!("└─────────────────────────────────────────────────────────────┘");
        }
        Some(("wifi", _m)) => match crate::services::wifi::scan_wifi() {
            Ok(result) => println!("{result}"),
            Err(e) => eprintln!("WiFi scan failed: {e}"),
        },
        Some(("dns", sub_m)) => {
            let domain = sub_m
                .get_one::<String>("domain")
                .ok_or_else(|| anyhow::anyhow!("domain required"))?;
            use tokio::net::lookup_host;
            println!("DNS records for {domain}:");
            match lookup_host(format!("{domain}:0")).await {
                Ok(addrs) => {
                    for addr in addrs {
                        println!("  {addr}");
                    }
                }
                Err(e) => eprintln!("DNS lookup failed: {e}"),
            }
        }
        Some((name, _m)) => {
            println!("net {name} (not yet implemented)");
        }
        _ => {}
    }
    Ok(())
}
