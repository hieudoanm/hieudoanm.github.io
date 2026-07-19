use reqwest;
use serde::Deserialize;
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

    pub async fn get_player(
        &self,
        player: &str,
    ) -> Result<HashMap<String, serde_json::Value>, anyhow::Error> {
        let url = format!("{}/player/{}", self.base_url, player);
        let resp = self.client.get(&url).send().await?;

        if !resp.status().is_success() {
            return Err(anyhow::anyhow!("chess.com API error: {}", resp.status()));
        }

        let result = resp.json::<HashMap<String, serde_json::Value>>().await?;
        Ok(result)
    }

    pub async fn get_stats(
        &self,
        player: &str,
    ) -> Result<HashMap<String, serde_json::Value>, anyhow::Error> {
        let url = format!("{}/player/{}/stats", self.base_url, player);
        let resp = self.client.get(&url).send().await?;

        if !resp.status().is_success() {
            return Err(anyhow::anyhow!("chess.com API error: {}", resp.status()));
        }

        let result = resp.json::<HashMap<String, serde_json::Value>>().await?;
        Ok(result)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use wiremock::matchers::{method, path};
    use wiremock::{Mock, MockServer, ResponseTemplate};

    #[tokio::test]
    async fn test_get_players() {
        let mock_server = MockServer::start().await;

        Mock::given(method("GET"))
            .and(path("/titled/GM"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "players": ["player1", "player2"]
            })))
            .mount(&mock_server)
            .await;

        let client = ChessClient {
            base_url: mock_server.uri(),
            client: reqwest::Client::new(),
        };
        let result = client.get_players("GM").await.unwrap();
        assert_eq!(result.len(), 2);
        assert_eq!(result[0], "player1");
    }

    #[tokio::test]
    async fn test_get_player() {
        let mock_server = MockServer::start().await;

        Mock::given(method("GET"))
            .and(path("/player/magnus"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "username": "magnus",
                "title": "GM"
            })))
            .mount(&mock_server)
            .await;

        let client = ChessClient {
            base_url: mock_server.uri(),
            client: reqwest::Client::new(),
        };
        let result = client.get_player("magnus").await.unwrap();
        assert_eq!(result["username"], "magnus");
    }

    #[tokio::test]
    async fn test_get_stats() {
        let mock_server = MockServer::start().await;

        Mock::given(method("GET"))
            .and(path("/player/magnus/stats"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "chess_daily": {"last": {"rating": 2842}}
            })))
            .mount(&mock_server)
            .await;

        let client = ChessClient {
            base_url: mock_server.uri(),
            client: reqwest::Client::new(),
        };
        let result = client.get_stats("magnus").await.unwrap();
        assert_eq!(result["chess_daily"]["last"]["rating"], 2842);
    }

    #[tokio::test]
    async fn test_error_status() {
        let mock_server = MockServer::start().await;

        Mock::given(method("GET"))
            .and(path("/titled/unknown"))
            .respond_with(ResponseTemplate::new(404))
            .mount(&mock_server)
            .await;

        let client = ChessClient {
            base_url: mock_server.uri(),
            client: reqwest::Client::new(),
        };
        let result = client.get_players("unknown").await;
        assert!(result.is_err());
    }
}
