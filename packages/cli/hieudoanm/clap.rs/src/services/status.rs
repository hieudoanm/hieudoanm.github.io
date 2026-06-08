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
        Ok(resp) => {
            if resp.status.indicator == "none" {
                format!("{} - Healthy", name)
            } else {
                format!("{} - Offline", name)
            }
        }
        Err(e) => format!("{} - Error: {}", name, e),
    }
}

pub fn print_descriptive_status(name: &str, url: &str) {
    let status = get_descriptive_status(name, url);
    let timestamp = Utc::now().to_rfc3339();
    println!("[{}] {}", timestamp, status);
}
