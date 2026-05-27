use serde::{Deserialize, Serialize};
use reqwest::Client;
use anyhow::Result;

#[derive(Serialize, Deserialize, Debug)]
pub struct LatestResponse {
    pub base: String,
    pub rates: std::collections::HashMap<String, f64>,
}

pub struct FixerClient {
    client: Client,
    api_key: String,
}

impl FixerClient {
    pub fn new(api_key: String) -> Self {
        Self { client: Client::new(), api_key }
    }

    pub async fn latest(&self, base: &str, symbols: &[&str]) -> Result<LatestResponse> {
        let url = format!("http://data.fixer.io/api/latest?access_key={}&base={}&symbols={}", 
            self.api_key, base, symbols.join(","));
        let resp = self.client.get(&url).send().await?.json::<LatestResponse>().await?;
        Ok(resp)
    }
}
