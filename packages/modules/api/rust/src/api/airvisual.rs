use serde::{Deserialize, Serialize};
use reqwest;

const BASE_URL: &str = "http://api.airvisual.com/v2";

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

pub async fn get_countries(api_key: &str) -> Result<CountriesResponse, anyhow::Error> {
    let url = format!("{}/countries", BASE_URL);
    let client = reqwest::Client::new();
    let response = client
        .get(&url)
        .query(&[("key", api_key)])
        .send()
        .await?
        .json::<CountriesResponse>()
        .await?;
    
    Ok(response)
}
