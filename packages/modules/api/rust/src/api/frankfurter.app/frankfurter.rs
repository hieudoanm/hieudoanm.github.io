use anyhow::Result;
use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct LatestResponse {
    pub base: String,
    pub rates: std::collections::HashMap<String, f64>,
}

pub struct FrankfurterClient {
    client: Client,
    pub base_url: String,
}

impl FrankfurterClient {
    pub fn new(base_url: Option<String>) -> Self {
        Self {
            client: Client::new(),
            base_url: base_url.unwrap_or_else(|| "https://api.frankfurter.app".to_string()),
        }
    }

    pub async fn latest(&self, base: &str, to: &[&str]) -> Result<LatestResponse> {
        let url = format!("{}/latest?from={}&to={}", self.base_url, base, to.join(","));
        let resp = self
            .client
            .get(&url)
            .send()
            .await?
            .json::<LatestResponse>()
            .await?;
        Ok(resp)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use wiremock::matchers::{method, path, query_param};
    use wiremock::{Mock, MockServer, ResponseTemplate};

    #[tokio::test]
    async fn test_latest_success() {
        let mock_server = MockServer::start().await;

        Mock::given(method("GET"))
            .and(path("/latest"))
            .and(query_param("from", "USD"))
            .and(query_param("to", "EUR,GBP"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "base": "USD",
                "rates": {
                    "EUR": 0.85,
                    "GBP": 0.73
                }
            })))
            .mount(&mock_server)
            .await;

        let client = FrankfurterClient::new(Some(mock_server.uri()));
        let result = client.latest("USD", &["EUR", "GBP"]).await.unwrap();
        assert_eq!(result.base, "USD");
        assert!((result.rates["EUR"] - 0.85).abs() < f64::EPSILON);
        assert!((result.rates["GBP"] - 0.73).abs() < f64::EPSILON);
    }
}
