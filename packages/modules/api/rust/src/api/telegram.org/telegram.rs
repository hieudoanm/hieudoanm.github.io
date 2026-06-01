use anyhow::Result;
use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct TelegramResponse {
    pub ok: bool,
    pub result: serde_json::Value,
}

pub struct TelegramClient {
    client: Client,
    bot_token: String,
    pub base_url: String,
}

impl TelegramClient {
    pub fn new(bot_token: String, base_url: Option<String>) -> Self {
        Self {
            client: Client::new(),
            bot_token,
            base_url: base_url.unwrap_or_else(|| "https://api.telegram.org".to_string()),
        }
    }

    pub async fn send_message(&self, chat_id: &str, text: &str) -> Result<TelegramResponse> {
        let url = format!("{}/bot{}/sendMessage", self.base_url, self.bot_token);
        let resp = self
            .client
            .post(&url)
            .json(&serde_json::json!({"chat_id": chat_id, "text": text}))
            .send()
            .await?
            .json::<TelegramResponse>()
            .await?;
        Ok(resp)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use wiremock::matchers::{method, path};
    use wiremock::{Mock, MockServer, ResponseTemplate};

    #[tokio::test]
    async fn test_send_message() {
        let mock_server = MockServer::start().await;

        Mock::given(method("POST"))
            .and(path("/botTEST_TOKEN/sendMessage"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "ok": true,
                "result": {"message_id": 1}
            })))
            .mount(&mock_server)
            .await;

        let client = TelegramClient::new("TEST_TOKEN".to_string(), Some(mock_server.uri()));
        let result = client.send_message("12345", "Hello").await.unwrap();
        assert!(result.ok);
    }
}
