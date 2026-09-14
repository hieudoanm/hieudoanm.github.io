use anyhow::{Context, Result};
use chrono::Utc;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Page {
    pub id: String,
    pub name: String,
    pub url: String,
    pub time_zone: String,
    pub updated_at: String,
}

#[derive(Debug, Deserialize)]
pub struct Status {
    pub indicator: String,
    pub description: String,
}

#[derive(Debug, Deserialize)]
pub struct Response {
    pub page: Page,
    pub status: Status,
}

pub fn get_status(url: &str) -> Result<Response> {
    let resp = reqwest::blocking::get(url).context("failed to fetch status page")?;
    let response: Response = resp.json().context("failed to parse status response")?;
    Ok(response)
}

pub fn print_full_status(url: &str) {
    match get_status(url) {
        Ok(resp) => {
            let timestamp = Utc::now().to_rfc3339();
            let border = format!(
                "==================== STATUS PAGE ==================== [{}]",
                timestamp
            );
            println!("{}", border);
            println!("Page Name    : {}", resp.page.name);
            println!("Page ID      : {}", resp.page.id);
            println!("URL          : {}", resp.page.url);
            println!("Time Zone    : {}", resp.page.time_zone);
            println!("Updated At   : {}", resp.page.updated_at);
            println!("Indicator    : {}", resp.status.indicator);
            println!("Description  : {}", resp.status.description);
            println!("{}", border);
        }
        Err(e) => {
            eprintln!("[{}] Error: {}", Utc::now().to_rfc3339(), e);
        }
    }
}

pub fn get_descriptive_status(name: &str, url: &str) -> String {
    match get_status(url) {
        Ok(resp) => describe_from_response(name, &resp.status),
        Err(e) => format!("{} - Error: {}", name, e),
    }
}

pub fn describe_from_response(name: &str, status: &Status) -> String {
    if status.indicator == "none" {
        format!("{} - Healthy", name)
    } else {
        format!("{} - Offline", name)
    }
}

pub fn print_descriptive_status(name: &str, url: &str) {
    let status = get_descriptive_status(name, url);
    let timestamp = Utc::now().to_rfc3339();
    println!("[{}] {}", timestamp, status);
}

#[cfg(target_os = "macos")]
pub fn scan_wifi() -> Result<String> {
    let output = std::process::Command::new(
        "/System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport",
    )
    .arg("-s")
    .output()
    .context("failed to run airport command")?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        anyhow::bail!("airport command failed: {}", stderr);
    }

    let stdout = String::from_utf8_lossy(&output.stdout).to_string();
    Ok(stdout)
}

#[cfg(target_os = "linux")]
pub fn scan_wifi() -> Result<String> {
    let output = std::process::Command::new("nmcli")
        .args([
            "--terse",
            "--fields",
            "SSID,SIGNAL,SECURITY",
            "device",
            "wifi",
            "list",
        ])
        .output()
        .context("failed to run nmcli command")?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        anyhow::bail!("nmcli command failed: {}", stderr);
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    let mut result = String::new();

    for line in stdout.lines() {
        let parts: Vec<&str> = line.splitn(3, ':').collect();
        if parts.len() != 3 {
            continue;
        }
        let ssid = if parts[0].is_empty() {
            "<hidden>"
        } else {
            parts[0]
        };
        let signal = parts[1];
        let security = parts[2];
        result.push_str(&format!("{} | RSSI: {} | {}\n", ssid, signal, security));
    }

    Ok(result)
}

#[cfg(not(any(target_os = "macos", target_os = "linux")))]
pub fn scan_wifi() -> Result<String> {
    anyhow::bail!("unsupported platform")
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_describe_from_response_healthy() {
        let status = Status {
            indicator: "none".to_string(),
            description: "All Systems Operational".to_string(),
        };
        assert_eq!(
            describe_from_response("GitHub", &status),
            "GitHub - Healthy"
        );
    }

    #[test]
    fn test_describe_from_response_offline() {
        let status = Status {
            indicator: "critical".to_string(),
            description: "Partial Outage".to_string(),
        };
        assert_eq!(describe_from_response("API", &status), "API - Offline");
    }

    #[test]
    fn test_describe_from_response_minor() {
        let status = Status {
            indicator: "minor".to_string(),
            description: "Degraded Performance".to_string(),
        };
        assert_eq!(describe_from_response("DB", &status), "DB - Offline");
    }
}
