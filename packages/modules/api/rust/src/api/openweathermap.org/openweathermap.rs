use anyhow::Result;
use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct WeatherResponse {
    pub main: Main,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Main {
    pub temp: f64,
}

pub struct OpenWeatherClient {
    client: Client,
    api_key: String,
    pub base_url: String,
}

impl OpenWeatherClient {
    pub fn new(api_key: String, base_url: Option<String>) -> Self {
        Self {
            client: Client::new(),
            api_key,
            base_url: base_url.unwrap_or_else(|| "https://api.openweathermap.org".to_string()),
        }
    }

    pub async fn get_weather(&self, city: &str) -> Result<WeatherResponse> {
        let url = format!(
            "{}/data/2.5/weather?q={}&appid={}",
            self.base_url, city, self.api_key
        );
        let resp = self
            .client
            .get(&url)
            .send()
            .await?
            .json::<WeatherResponse>()
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
    async fn test_get_weather() {
        let mock_server = MockServer::start().await;

        Mock::given(method("GET"))
            .and(path("/data/2.5/weather"))
            .and(query_param("q", "London"))
            .respond_with(ResponseTemplate::new(200).set_body_json(serde_json::json!({
                "main": {"temp": 15.5}
            })))
            .mount(&mock_server)
            .await;

        let client = OpenWeatherClient::new("test_key".to_string(), Some(mock_server.uri()));
        let result = client.get_weather("London").await.unwrap();
        assert_eq!(result.main.temp, 15.5);
    }
}
