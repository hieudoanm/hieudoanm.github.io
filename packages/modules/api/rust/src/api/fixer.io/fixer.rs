use anyhow::Result;
use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct LatestResponse {
    pub base: String,
    pub rates: std::collections::HashMap<String, f64>,
}

pub struct FixerClient {
    client: Client,
    api_key: String,
    pub base_url: String,
}

impl FixerClient {
    pub fn new(api_key: String, base_url: Option<String>) -> Self {
        Self {
            client: Client::new(),
            api_key,
            base_url: base_url.unwrap_or_else(|| "http://data.fixer.io".to_string()),
        }
    }

    pub async fn latest(&self, base: &str, symbols: &[&str]) -> Result<LatestResponse> {
        let url = format!(
            "{}/api/latest?access_key={}&base={}&symbols={}",
            self.base_url,
            self.api_key,
            base,
            symbols.join(",")
        );
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
            .and(path("/api/latest"))
            .and(query_param("access_key", "test-key"))
            .and(query_param("base", "USD"))
            .and(query_param("symbols", "EUR,GBP"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "base": "USD",
                "rates": {
                    "EUR": 0.85,
                    "GBP": 0.73
                }
            })))
            .mount(&mock_server)
            .await;

        let client = FixerClient::new("test-key".to_string(), Some(mock_server.uri()));
        let result = client.latest("USD", &["EUR", "GBP"]).await.unwrap();
        assert_eq!(result.base, "USD");
        assert!((result.rates["EUR"] - 0.85).abs() < f64::EPSILON);
        assert!((result.rates["GBP"] - 0.73).abs() < f64::EPSILON);
    }
}
