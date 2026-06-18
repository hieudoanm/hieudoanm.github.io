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

pub fn command() -> clap::Command {
    clap::Command::new("ip")
        .about("Look up IP information")
        .subcommand(
            clap::Command::new("dns").about("DNS lookup").arg(
                clap::Arg::new("domain")
                    .help("Domain to look up")
                    .required(true),
            ),
        )
}

pub async fn run(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    match matches.subcommand() {
        Some(("dns", dns_m)) => {
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
        }
        _ => {
            let info = fetch_ip().await?;
            print_ip_info(&info);
        }
    }
    Ok(())
}

pub async fn run_dns(matches: &clap::ArgMatches) -> anyhow::Result<()> {
    let domain = matches
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
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_version_from_ip_ipv4() {
        assert_eq!(version_from_ip("192.168.1.1"), "IPv4");
        assert_eq!(version_from_ip("8.8.8.8"), "IPv4");
        assert_eq!(version_from_ip("127.0.0.1"), "IPv4");
    }

    #[test]
    fn test_version_from_ip_ipv6() {
        assert_eq!(version_from_ip("::1"), "IPv6");
        assert_eq!(
            version_from_ip("2001:db8::ff00:42:8329"),
            "IPv6"
        );
    }

    #[test]
    fn test_version_from_ip_empty() {
        assert_eq!(version_from_ip(""), "IPv4");
    }

    #[test]
    fn test_detect_vpn_detects_cloudflare() {
        assert!(detect_vpn("CLOUDFLARE, INC."));
        assert!(detect_vpn("cloudflare, inc."));
        assert!(detect_vpn("Something Cloudflare"));
    }

    #[test]
    fn test_detect_vpn_detects_amazon() {
        assert!(detect_vpn("Amazon Web Services"));
        assert!(detect_vpn("amazon.com"));
    }

    #[test]
    fn test_detect_vpn_detects_google() {
        assert!(detect_vpn("Google Cloud"));
        assert!(detect_vpn("google LLC"));
    }

    #[test]
    fn test_detect_vpn_detects_digitalocean() {
        assert!(detect_vpn("DigitalOcean"));
        assert!(detect_vpn("digitalocean, LLC"));
    }

    #[test]
    fn test_detect_vpn_detects_microsoft() {
        assert!(detect_vpn("Microsoft Corporation"));
        assert!(detect_vpn("microsoft azure"));
    }

    #[test]
    fn test_detect_vpn_returns_false_for_normal_isp() {
        assert!(!detect_vpn("Comcast Cable"));
        assert!(!detect_vpn("Verizon Communications"));
        assert!(!detect_vpn("AT&T Internet"));
    }

    #[test]
    fn test_detect_vpn_empty() {
        assert!(!detect_vpn(""));
    }
}
