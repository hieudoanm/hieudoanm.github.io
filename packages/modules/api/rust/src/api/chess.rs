use serde::{Deserialize, Serialize};
use reqwest;
use std::collections::HashMap;

pub struct ChessClient {
    pub base_url: String,
    pub client: reqwest::Client,
}

impl ChessClient {
    pub fn new() -> Self {
        Self {
            base_url: "https://api.chess.com/pub".to_string(),
            client: reqwest::Client::new(),
        }
    }

    pub async fn get_players(&self, title: &str) -> Result<Vec<String>, anyhow::Error> {
        let url = format!("{}/titled/{}", self.base_url, title);
        let resp = self.client.get(&url).send().await?;
        
        if !resp.status().is_success() {
            return Err(anyhow::anyhow!("chess.com API error: {}", resp.status()));
        }

        #[derive(Deserialize)]
        struct PlayersResponse {
            players: Vec<String>,
        }

        let result = resp.json::<PlayersResponse>().await?;
        Ok(result.players)
    }

    pub async fn get_player(&self, player: &str) -> Result<HashMap<String, serde_json::Value>, anyhow::Error> {
        let url = format!("{}/player/{}", self.base_url, player);
        let resp = self.client.get(&url).send().await?;
        
        if !resp.status().is_success() {
            return Err(anyhow::anyhow!("chess.com API error: {}", resp.status()));
        }

        let result = resp.json::<HashMap<String, serde_json::Value>>().await?;
        Ok(result)
    }

    pub async fn get_stats(&self, player: &str) -> Result<HashMap<String, serde_json::Value>, anyhow::Error> {
        let url = format!("{}/player/{}/stats", self.base_url, player);
        let resp = self.client.get(&url).send().await?;
        
        if !resp.status().is_success() {
            return Err(anyhow::anyhow!("chess.com API error: {}", resp.status()));
        }

        let result = resp.json::<HashMap<String, serde_json::Value>>().await?;
        Ok(result)
    }
}
