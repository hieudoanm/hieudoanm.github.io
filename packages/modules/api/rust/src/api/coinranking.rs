use serde::{Deserialize, Serialize};
use reqwest::Client;

#[derive(Debug, Serialize, Deserialize)]
pub struct CoinRankingStats {
    pub total: i32,
    #[serde(rename = "totalCoins")]
    pub total_coins: i32,
    #[serde(rename = "totalMarkets")]
    pub total_markets: i32,
    #[serde(rename = "totalExchanges")]
    pub total_exchanges: i32,
    #[serde(rename = "totalMarketCap")]
    pub total_market_cap: String,
    #[serde(rename = "total24hVolume")]
    pub total_24h_volume: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Coin {
    pub uuid: String,
    pub symbol: String,
    pub name: String,
    pub color: Option<String>,
    #[serde(rename = "iconUrl")]
    pub icon_url: String,
    #[serde(rename = "marketCap")]
    pub market_cap: String,
    pub price: String,
    #[serde(rename = "listedAt")]
    pub listed_at: i32,
    pub tier: i32,
    pub change: String,
    pub rank: i32,
    pub sparkline: Vec<String>,
    #[serde(rename = "lowVolume")]
    pub low_volume: bool,
    #[serde(rename = "coinrankingUrl")]
    pub coinranking_url: String,
    #[serde(rename = "24hVolume")]
    pub volume_24h: String,
    #[serde(rename = "btcPrice")]
    pub btc_price: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CoinRankingData {
    pub stats: CoinRankingStats,
    pub coins: Vec<Coin>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CoinRankingResponse {
    pub status: String,
    pub data: CoinRankingData,
}

pub struct CoinRankingClient {
    base_url: String,
    client: Client,
}

impl CoinRankingClient {
    pub fn new() -> Self {
        Self {
            base_url: "https://api.coinranking.com".to_string(),
            client: Client::new(),
        }
    }

    pub async fn get_coins(&self, tag: Option<&str>) -> Result<CoinRankingResponse, reqwest::Error> {
        let mut url = format!("{}/v2/coins", self.base_url);
        if let Some(t) = tag {
            url = format!("{}?tags={}", url, t);
        }

        let resp = self.client.get(url).send().await?.error_for_status()?;
        let result = resp.json::<CoinRankingResponse>().await?;
        Ok(result)
    }
}
