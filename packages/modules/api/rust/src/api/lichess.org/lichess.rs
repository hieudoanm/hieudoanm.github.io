use anyhow::Result;
use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Game {
    pub id: String,
    pub status: String,
}

pub struct LichessClient {
    client: Client,
    token: String,
    pub base_url: String,
}

impl LichessClient {
    pub fn new(token: String, base_url: Option<String>) -> Self {
        Self {
            client: Client::new(),
            token,
            base_url: base_url.unwrap_or_else(|| "https://lichess.org".to_string()),
        }
    }

    pub async fn get_my_profile(&self) -> Result<serde_json::Value> {
        let resp = self
            .client
            .get(format!("{}/api/account", self.base_url))
            .header("Authorization", format!("Bearer {}", self.token))
            .send()
            .await?
            .json::<serde_json::Value>()
            .await?;
        Ok(resp)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use wiremock::matchers::{header, method, path};
    use wiremock::{Mock, MockServer, ResponseTemplate};

    #[tokio::test]
    async fn test_get_my_profile() {
        let mock_server = MockServer::start().await;

        Mock::given(method("GET"))
            .and(path("/api/account"))
            .and(header("Authorization", "Bearer test_token"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "id": "test_user",
                "username": "test_user",
                "perfs": {}
            })))
            .mount(&mock_server)
            .await;

        let client = LichessClient::new("test_token".to_string(), Some(mock_server.uri()));
        let result = client.get_my_profile().await.unwrap();
        assert_eq!(result["id"], "test_user");
        assert_eq!(result["username"], "test_user");
    }
}
