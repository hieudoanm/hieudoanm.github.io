use anyhow::{Context, Result};
use std::time::Duration;

pub struct ShopifyResult {
    pub is_shopify: bool,
    pub is_plus: bool,
    pub signals: Vec<String>,
}

pub fn check_shopify(url: &str) -> Result<ShopifyResult> {
    let client = reqwest::blocking::Client::builder()
        .timeout(Duration::from_secs(10))
        .build()
        .context("failed to build HTTP client")?;

    let resp = client
        .get(url)
        .header("User-Agent", "shopify-check/1.0")
        .send()
        .context("request failed")?;

    let mut result = ShopifyResult {
        is_shopify: false,
        is_plus: false,
        signals: Vec::new(),
    };

    // Header-based signals
    for (key, value) in resp.headers().iter() {
        let lk = key.as_str().to_lowercase();

        if lk.starts_with("x-shopify") {
            result.is_shopify = true;
            result.signals.push(format!("Header: {}", key.as_str()));

            if lk == "x-shopify-stage" || lk == "x-shopify-shop-api-call-limit" {
                result.is_plus = true;
            }
        }

        if let Ok(v) = value.to_str() {
            if v.to_lowercase().contains("shopify") {
                result.is_shopify = true;
                result.signals.push(format!("Header value: {}", key.as_str()));
            }
        }
    }

    // HTML sniffing (partial read)
    let body = resp.text().context("failed to read response body")?;
    let html = body.to_lowercase();

    if html.contains("cdn.shopify.com") {
        result.is_shopify = true;
        result.signals.push("HTML: cdn.shopify.com".into());
    }

    if html.contains("shopify-section") {
        result.is_shopify = true;
        result.signals.push("HTML: shopify-section".into());
    }

    if html.contains("shopify-plus") {
        result.is_plus = true;
        result.signals.push("HTML: shopify-plus".into());
    }

    Ok(result)
}
