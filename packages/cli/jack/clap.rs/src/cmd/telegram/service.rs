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
    let url = format!(
        "{}{}/setWebhook?url={}",
        TELEGRAM_API,
        token,
        urlencoding(webhook_url)
    );

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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_urlencoding_plain() {
        assert_eq!(urlencoding("hello"), "hello");
    }

    #[test]
    fn test_urlencoding_spaces() {
        assert_eq!(urlencoding("hello world"), "hello+world");
    }

    #[test]
    fn test_urlencoding_special_chars() {
        assert_eq!(urlencoding("a&b=c"), "a%26b%3Dc");
    }

    #[test]
    fn test_urlencoding_url() {
        assert_eq!(
            urlencoding("https://example.com/webhook?test=1"),
            "https%3A%2F%2Fexample.com%2Fwebhook%3Ftest%3D1"
        );
    }

    #[test]
    fn test_urlencoding_empty() {
        assert_eq!(urlencoding(""), "");
    }

    #[test]
    fn test_urlencoding_symbols() {
        assert_eq!(urlencoding("$100 & more"), "%24100+%26+more");
    }

    #[test]
    fn test_send_message_params_serialization() {
        let params = SendMessageParams {
            chat_id: "123456".to_string(),
            text: "Hello".to_string(),
            parse_mode: Some("HTML".into()),
            disable_web_page_preview: Some(true),
        };
        let json = serde_json::to_string(&params).unwrap();
        assert!(json.contains("\"chat_id\":\"123456\""));
        assert!(json.contains("\"text\":\"Hello\""));
        assert!(json.contains("\"parse_mode\":\"HTML\""));
    }

    #[test]
    fn test_send_message_params_omit_optional() {
        let params = SendMessageParams {
            chat_id: "789".to_string(),
            text: "Hi".to_string(),
            parse_mode: None,
            disable_web_page_preview: None,
        };
        let json = serde_json::to_string(&params).unwrap();
        assert!(json.contains("\"chat_id\":\"789\""));
        assert!(!json.contains("parse_mode"));
        assert!(!json.contains("disable_web_page_preview"));
    }

    #[test]
    fn test_telegram_response_ok() {
        let json = r#"{"ok":true,"description":"success"}"#;
        let resp: TelegramResponse = serde_json::from_str(json).unwrap();
        assert!(resp.ok);
        assert_eq!(resp.description.as_deref(), Some("success"));
    }

    #[test]
    fn test_telegram_response_false_no_description() {
        let json = r#"{"ok":false}"#;
        let resp: TelegramResponse = serde_json::from_str(json).unwrap();
        assert!(!resp.ok);
        assert!(resp.description.is_none());
    }
}
