use serde::{Deserialize, Serialize};
use reqwest::Client;
use anyhow::Result;

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
    client: Client,
    api_key: String,
}

impl NewsAPIClient {
    pub fn new(api_key: String) -> Self {
        Self { client: Client::new(), api_key }
    }

    pub async fn top_headlines(&self, country: &str) -> Result<NewsResponse> {
        let url = format!("https://newsapi.org/v2/top-headlines?country={}&apiKey={}", country, self.api_key);
        let resp = self.client.get(&url).send().await?.json::<NewsResponse>().await?;
        Ok(resp)
    }
}
