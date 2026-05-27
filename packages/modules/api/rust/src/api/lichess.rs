use serde::{Deserialize, Serialize};
use reqwest::Client;
use anyhow::Result;

#[derive(Serialize, Deserialize, Debug)]
pub struct Game {
    pub id: String,
    pub status: String,
}

pub struct LichessClient {
    client: Client,
    token: String,
}

impl LichessClient {
    pub fn new(token: String) -> Self {
        Self { client: Client::new(), token }
    }

    pub async fn get_my_profile(&self) -> Result<serde_json::Value> {
        let resp = self.client.get("https://lichess.org/api/account")
            .header("Authorization", format!("Bearer {}", self.token))
            .send()
            .await?
            .json::<serde_json::Value>()
            .await?;
        Ok(resp)
    }
}
