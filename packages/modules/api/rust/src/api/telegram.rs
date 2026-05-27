use serde::{Deserialize, Serialize};
use reqwest::Client;
use anyhow::Result;

#[derive(Serialize, Deserialize, Debug)]
pub struct TelegramResponse {
    pub ok: bool,
    pub result: serde_json::Value,
}

pub struct TelegramClient {
    client: Client,
    bot_token: String,
}

impl TelegramClient {
    pub fn new(bot_token: String) -> Self {
        Self { client: Client::new(), bot_token }
    }

    pub async fn send_message(&self, chat_id: &str, text: &str) -> Result<TelegramResponse> {
        let url = format!("https://api.telegram.org/bot{}/sendMessage", self.bot_token);
        let resp = self.client.post(&url)
            .json(&serde_json::json!({"chat_id": chat_id, "text": text}))
            .send()
            .await?
            .json::<TelegramResponse>()
            .await?;
        Ok(resp)
    }
}
