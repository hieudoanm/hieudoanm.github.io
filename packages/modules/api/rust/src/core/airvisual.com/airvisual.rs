use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct AirQuality {
    pub status: String,
    pub data: AirQualityData,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AirQualityData {
    pub city: String,
    pub state: String,
    pub country: String,
    pub location: Location,
    pub current: Current,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Location {
    #[serde(rename = "type")]
    pub location_type: String,
    pub coordinates: Vec<f64>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Current {
    pub pollution: Pollution,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Pollution {
    pub aqius: i32,
    pub mainus: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CountriesResponse {
    pub status: String,
    pub data: Vec<CountryData>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CountryData {
    pub country: String,
}

pub struct AirVisualClient {
    pub api_key: String,
    pub base_url: String,
    pub client: Client,
}

impl AirVisualClient {
    pub fn new(api_key: String, base_url: Option<String>) -> Self {
        Self {
            api_key,
            base_url: base_url.unwrap_or_else(|| "http://api.airvisual.com/v2".to_string()),
            client: Client::new(),
        }
    }

    pub async fn get_countries(&self) -> Result<CountriesResponse, anyhow::Error> {
        let url = format!("{}/countries", self.base_url);
        let response = self
            .client
            .get(&url)
            .query(&[("key", &self.api_key)])
            .send()
            .await?
            .json::<CountriesResponse>()
            .await?;

        Ok(response)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use wiremock::matchers::{method, path, query_param};
    use wiremock::{Mock, MockServer, ResponseTemplate};

    #[tokio::test]
    async fn test_get_countries() {
        let mock_server = MockServer::start().await;

        Mock::given(method("GET"))
            .and(path("/countries"))
            .and(query_param("key", "test-key"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "status": "success",
                "data": [{"country": "Vietnam"}]
            })))
            .mount(&mock_server)
            .await;

        let client = AirVisualClient::new("test-key".to_string(), Some(mock_server.uri()));
        let result = client.get_countries().await.unwrap();
        assert_eq!(result.status, "success");
        assert_eq!(result.data.len(), 1);
        assert_eq!(result.data[0].country, "Vietnam");
    }
}
