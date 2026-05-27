use serde::{Deserialize, Serialize};
use reqwest::Client;
use anyhow::Result;

#[derive(Serialize, Deserialize, Debug)]
pub struct LatestResponse {
    pub base: String,
    pub rates: std::collections::HashMap<String, f64>,
}

pub struct FrankfurterClient {
    client: Client,
}

impl FrankfurterClient {
    pub fn new() -> Self {
        Self { client: Client::new() }
    }

    pub async fn latest(&self, base: &str, to: &[&str]) -> Result<LatestResponse> {
        let url = format!("https://api.frankfurter.app/latest?from={}&to={}", base, to.join(","));
        let resp = self.client.get(&url).send().await?.json::<LatestResponse>().await?;
        Ok(resp)
    }
}
