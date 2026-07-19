use anyhow::Result;
use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct Article {
    pub title: String,
    pub author: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct NewsResponse {
    pub articles: Vec<Article>,
}

pub struct NewsAPIClient {
    pub client: Client,
    pub api_key: String,
    pub base_url: String,
}

impl NewsAPIClient {
    pub fn new(api_key: String, base_url: Option<String>) -> Self {
        Self {
            client: Client::new(),
            api_key,
            base_url: base_url.unwrap_or_else(|| "https://newsapi.org".to_string()),
        }
    }

    pub async fn top_headlines(&self, country: &str) -> Result<NewsResponse> {
        let url = format!(
            "{}/v2/top-headlines?country={}&apiKey={}",
            self.base_url, country, self.api_key
        );
        let resp = self
            .client
            .get(&url)
            .send()
            .await?
            .json::<NewsResponse>()
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
    async fn test_top_headlines() {
        let mock_server = MockServer::start().await;

        Mock::given(method("GET"))
            .and(path("/v2/top-headlines"))
            .and(query_param("country", "us"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "articles": [
                    {"title": "Test Article", "author": "Test Author"}
                ]
            })))
            .mount(&mock_server)
            .await;

        let client = NewsAPIClient::new("test_api_key".to_string(), Some(mock_server.uri()));
        let result = client.top_headlines("us").await.unwrap();
        assert_eq!(result.articles.len(), 1);
        assert_eq!(result.articles[0].title, "Test Article");
        assert_eq!(result.articles[0].author, Some("Test Author".to_string()));
    }
}
