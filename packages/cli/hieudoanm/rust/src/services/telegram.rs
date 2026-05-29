use anyhow::{Context, Result};
use serde::{Deserialize, Serialize};

const TELEGRAM_API: &str = "https://api.telegram.org/bot";

#[derive(Debug, Serialize)]
pub struct SendMessageParams {
    pub chat_id: String,
    pub text: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub parse_mode: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub disable_web_page_preview: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct TelegramResponse {
    pub ok: bool,
    pub description: Option<String>,
}

pub fn send_message(token: &str, chat_id: &str, text: &str) -> Result<TelegramResponse> {
    let url = format!("{}{}/sendMessage", TELEGRAM_API, token);
    let params = SendMessageParams {
        chat_id: chat_id.to_string(),
        text: text.to_string(),
        parse_mode: Some("HTML".into()),
        disable_web_page_preview: Some(true),
    };

    let client = reqwest::blocking::Client::new();
    let resp = client
        .post(&url)
        .json(&params)
        .send()
        .context("telegram API request failed")?;

    let result: TelegramResponse = resp.json().context("failed to parse telegram response")?;
    Ok(result)
}

pub fn set_webhook(token: &str, webhook_url: &str) -> Result<TelegramResponse> {
    let url = format!("{}{}/setWebhook?url={}", TELEGRAM_API, token, urlencoding(webhook_url));

    let client = reqwest::blocking::Client::new();
    let resp = client
        .get(&url)
        .send()
        .context("telegram webhook request failed")?;

    let result: TelegramResponse = resp.json().context("failed to parse telegram response")?;
    Ok(result)
}

pub fn delete_webhook(token: &str) -> Result<TelegramResponse> {
    let url = format!("{}{}/deleteWebhook", TELEGRAM_API, token);

    let client = reqwest::blocking::Client::new();
    let resp = client
        .get(&url)
        .send()
        .context("telegram delete webhook request failed")?;

    let result: TelegramResponse = resp.json().context("failed to parse telegram response")?;
    Ok(result)
}

pub fn get_webhook_info(token: &str) -> Result<serde_json::Value> {
    let url = format!("{}{}/getWebhookInfo", TELEGRAM_API, token);

    let client = reqwest::blocking::Client::new();
    let resp = client
        .get(&url)
        .send()
        .context("telegram webhook info request failed")?;

    let result: serde_json::Value = resp.json().context("failed to parse telegram response")?;
    Ok(result)
}

fn urlencoding(s: &str) -> String {
    url::form_urlencoded::byte_serialize(s.as_bytes()).collect()
}
