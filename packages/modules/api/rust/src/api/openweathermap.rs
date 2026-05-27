use serde::{Deserialize, Serialize};
use reqwest::Client;
use anyhow::Result;

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
}

impl OpenWeatherClient {
    pub fn new(api_key: String) -> Self {
        Self { client: Client::new(), api_key }
    }

    pub async fn get_weather(&self, city: &str) -> Result<WeatherResponse> {
        let url = format!("https://api.openweathermap.org/data/2.5/weather?q={}&appid={}", city, self.api_key);
        let resp = self.client.get(&url).send().await?.json::<WeatherResponse>().await?;
        Ok(resp)
    }
}
