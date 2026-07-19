use reqwest::Client;
use serde::{Deserialize, Serialize};

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
    pub base_url: String,
    pub client: Client,
}

impl CoinRankingClient {
    pub fn new() -> Self {
        Self {
            base_url: "https://api.coinranking.com".to_string(),
            client: Client::new(),
        }
    }

    pub async fn get_coins(
        &self,
        tag: Option<&str>,
    ) -> Result<CoinRankingResponse, reqwest::Error> {
        let mut url = format!("{}/v2/coins", self.base_url);
        if let Some(t) = tag {
            url = format!("{}?tags={}", url, t);
        }

        let resp = self.client.get(url).send().await?.error_for_status()?;
        let result = resp.json::<CoinRankingResponse>().await?;
        Ok(result)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use wiremock::matchers::{method, path};
    use wiremock::{Mock, MockServer, ResponseTemplate};

    #[tokio::test]
    async fn test_get_coins_without_tag() {
        let mock_server = MockServer::start().await;

        Mock::given(method("GET"))
            .and(path("/v2/coins"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "status": "success",
                "data": {
                    "stats": {
                        "total": 1,
                        "totalCoins": 1,
                        "totalMarkets": 0,
                        "totalExchanges": 0,
                        "totalMarketCap": "1000000",
                        "total24hVolume": "50000"
                    },
                    "coins": [
                        {
                            "uuid": "123",
                            "symbol": "BTC",
                            "name": "Bitcoin",
                            "iconUrl": "https://example.com/btc.png",
                            "marketCap": "1000000",
                            "price": "50000",
                            "listedAt": 1600000000,
                            "tier": 1,
                            "change": "2.5",
                            "rank": 1,
                            "sparkline": ["50000", "50100"],
                            "lowVolume": false,
                            "coinrankingUrl": "https://example.com/btc",
                            "24hVolume": "1000",
                            "btcPrice": 1.0
                        }
                    ]
                }
            })))
            .mount(&mock_server)
            .await;

        let client = CoinRankingClient {
            base_url: mock_server.uri(),
            client: Client::new(),
        };
        let result = client.get_coins(None).await.unwrap();
        assert_eq!(result.status, "success");
        assert_eq!(result.data.coins.len(), 1);
        assert_eq!(result.data.coins[0].name, "Bitcoin");
    }

    #[tokio::test]
    async fn test_get_coins_with_tag() {
        let mock_server = MockServer::start().await;

        Mock::given(method("GET"))
            .and(path("/v2/coins"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "status": "success",
                "data": {
                    "stats": {
                        "total": 1,
                        "totalCoins": 1,
                        "totalMarkets": 0,
                        "totalExchanges": 0,
                        "totalMarketCap": "500000",
                        "total24hVolume": "25000"
                    },
                    "coins": [
                        {
                            "uuid": "456",
                            "symbol": "DEFI",
                            "name": "DeFi Coin",
                            "iconUrl": "https://example.com/defi.png",
                            "marketCap": "500000",
                            "price": "10",
                            "listedAt": 1600000000,
                            "tier": 1,
                            "change": "1.0",
                            "rank": 2,
                            "sparkline": ["10", "10.5"],
                            "lowVolume": false,
                            "coinrankingUrl": "https://example.com/defi",
                            "24hVolume": "500",
                            "btcPrice": 0.0001
                        }
                    ]
                }
            })))
            .mount(&mock_server)
            .await;

        let client = CoinRankingClient {
            base_url: mock_server.uri(),
            client: Client::new(),
        };
        let result = client.get_coins(Some("defi")).await.unwrap();
        assert_eq!(result.status, "success");
        assert_eq!(result.data.coins.len(), 1);
        assert_eq!(result.data.coins[0].name, "DeFi Coin");
    }
}
